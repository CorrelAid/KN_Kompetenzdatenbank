<script>
  import Bulma from "bulma";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import { session } from "$app/stores";
  import { auth, setAuthCookie, unsetAuthCookie } from "$lib/auth";
  import { onMount } from "svelte";
  import { check_admin } from "$lib/db_queries";

  session.subscribe((sessionData) => {
    console.log(sessionData);
  });

  let check;

    auth.onAuthStateChange((event, _session) => {
      if (event !== "SIGNED_OUT") {
        

        (async () => {
          await setAuthCookie(_session);
          const check = await check_admin(_session.user)
          
          session.set({
          user: _session.user,
          authenticated: !!_session.user,
          admin: check
        });
        })();


      } else {
        session.set({ user: undefined, authenticated: false, admin: false });
        (async () => {
          await unsetAuthCookie(_session);
        })();
      }
    });

</script>

<svelte:head>
  <meta name="robots" content="noindex" />
  <title>Kompetenzdatenbank</title>
  <link rel="stylesheet" href="global.css" />
  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
  <script
    src="https://kit.fontawesome.com/a3e38f6c6f.js"
    crossorigin="anonymous"></script>
</svelte:head>

<Header />
<div class="container">
  <slot />
</div>
<Footer />

<style>
  .container{
    padding-bottom: 500px;
  }
</style>



