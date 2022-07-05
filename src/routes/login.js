import { supabase } from "$lib/supabaseClient";
import { check_email, check_admin } from "$lib/db_queries.js";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const data = await request.json(); // or .json(), or .text(), etc
  const email = data["email"]

  const check_mail = await check_email(email);
  const check_admn = await check_admin(email)

  

  if (check_mail === true || check_admn === true) {
    const { user, session, error } = await supabase.auth.signIn({
      email
    })

    if (error) {
      return {
        status: error.status,
        body: error.message
      }
    }

    return {
      status: 200,
      body: 'success',

    }
  }
  else {
    return {
      status: 403,
      body: "Du bist keine Teilnehmer:in dieses Hackathons oder die eingebene E-Mail ist ungültig"
    }
  }


}