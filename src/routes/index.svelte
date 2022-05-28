<script>
    import { user } from "$lib/sessionStore";
    import { supabase } from "$lib/supabaseClient";
    import Auth from "$lib/Auth.svelte";
    import Main from "$lib/Main.svelte";
    import Header from "$lib/Header.svelte";
    import Footer from "../lib/Footer.svelte";

    async function get_user(){
        user.set(supabase.auth.user());
    }

    const promise = get_user()
    

    supabase.auth.onAuthStateChange((event, session) => {
        if (event == "SIGNED_IN") {
            user.set(session.user);
        } else if (event == "SIGNED_OUT") {
            user.set(null);
        }
    });

</script>

<Header />
<div class="container" style="padding: 50px 0 100px 0;">
    {#await promise}
        <p>Loading Authentication Data...</p>
    {:then nothing} 
        {#if $user}
            <Main />
        {:else}
            <Auth />
    {/if}
    {/await}
    
</div>
<Footer logout_visible={$user}/>
