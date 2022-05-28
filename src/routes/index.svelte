<script>
    import { user } from "$lib/sessionStore";
    import { supabase } from "$lib/supabaseClient";
    import Auth from "$lib/Auth.svelte";
    import Main from "$lib/Main.svelte";

    user.set(supabase.auth.user());

    supabase.auth.onAuthStateChange((event, session) => {
        if (event == "SIGNED_IN") {
            user.set(session.user);
        } else if (event == 'SIGNED_OUT'){
            window.location.reload();
        }
    });

    async function signOut() {
        try {
            let { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            alert(error.message);
        } finally {
        }   
    }
</script>

<div class="container" style="padding: 50px 0 100px 0;">
    {#if $user}
        <div>
            <button class="button block" on:click={signOut}> Sign Out </button>
        </div>
        <Main />
    {:else}
        <Auth />
    {/if}
</div>
