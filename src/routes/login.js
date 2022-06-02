import { supabase } from "$lib/supabaseClient";
import { check_email } from "$lib/db_queries.js";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const data = await request.json(); // or .json(), or .text(), etc
    const email = data["email"]

    const check = await check_email(email)

    if (check === true) {
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
    else{
      return{
        status: 403,
        body: "You are not a participant of this hackathon or entered an invalid e-mail."
      }
    }
  
    
  }