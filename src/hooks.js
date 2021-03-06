//authentication code was taken or inspired by https://github.com/supabase/supabase/discussions/5218
import { auth, getCookie, blankCookies } from '$lib/auth';
import * as cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { check_admin } from '$lib/db_queries.js';

const ExpiryMargin = 1000;

// exchange the refresh token for an access token
async function refreshAccessToken(cookies) {
	const { data, error } = await auth.api.refreshAccessToken(cookies.refresh_token);
	if (error) {
		cookies.access_token = null;
		cookies.refresh_token = null;
		cookies.expires_at = null;
		throw error;
	}

	auth.setAuth(data.access_token); //needed so that server calls are authenticated

	cookies.access_token = data.access_token;
	cookies.refresh_token = data.refresh_token;
	cookies.expires_at = data.expires_at;

	return [
		getCookie('refresh_token', data.refresh_token, { maxAge: data.expires_in }),
		getCookie('access_token', data.access_token, { maxAge: data.expires_in }),
		getCookie('expires_at', data.expires_at, { maxAge: data.expires_in }),
	];
}

export const handle = async ({ event, resolve }) => {
	let cookies = cookie.parse(event.request.headers.get('cookie') || '');
	let setCookies = [];

	if (cookies.access_token || cookies.refresh_token) {
		if (cookies.expires_at < Math.floor(Date.now() / 1000) + ExpiryMargin) {
			console.log('Access token expired. Refreshing...');
			try {
				setCookies = await refreshAccessToken(cookies);
			} catch (err) {
				console.log(err);
				setCookies = blankCookies();
			}
		}
		const jwtPayload = cookies.access_token ? jwt.decode(cookies.access_token) : false;
		event.locals.authenticated = !!jwtPayload;
		event.locals.user = { email: jwtPayload?.email };

		const check = await check_admin(jwtPayload?.email);
		
		event.locals.admin = check;
	}

	let response = await resolve(event);

	if (setCookies?.length > 0) {
		setCookies.forEach((cookie) => response.headers.append('set-cookie', cookie));
	}

	return response;
};

export async function getSession(request) {

	const { user, authenticated, admin } = request.locals;

	return {
		user,
		authenticated,
		admin
	};
}