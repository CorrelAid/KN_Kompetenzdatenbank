import { supabase } from "$lib/supabaseClient";
import { get_custom_elements_slots } from "svelte/internal";
import { get } from "svelte/store";

async function get_emails() {

    const { data, error } = await supabase
        .from('main')
        .select("email")
    return data

}

async function invite(x) {
    const { data: user, error } = await supabase.auth
        .api
        .inviteUserByEmail(x)

    return {user, error}
}

async function get_users(){
    const { data: user, error } = await supabase.auth.api.listUsers()

    return user
}


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {

    const emails = await get_emails()

    const users = await get_users()

    let not_reg = []
    let check = false;

    for (let i = 0; i < emails.length; i++) {
        check = false;
        for (let y = 0; y < users.length; y++) {
            if (emails[i].email === users[y].email) {
                check = true;
            }
        }
        if (check === false){
            not_reg.push(emails[i].email)
        }
    }

    for (let i = 0; i < not_reg.length; i++) {
        try{
            const { error, user } = await invite(not_reg[i])
        }
       catch{
           console.log(not_reg[i], error)
       }
        // if (error) {
        //     return {
        //         status: error.status,
        //         body:  `${not_reg[i]} failed because: ${error.status}`
        //     }
        }
    }

    return {
        status: 200,
        body: 'success',
  
      }


}


