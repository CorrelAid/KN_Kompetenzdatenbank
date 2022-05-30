import { supabase } from "$lib/supabaseClient";


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const data = await request.json(); // or .json(), or .text(), etc
    const email = data["email"]

    
  
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