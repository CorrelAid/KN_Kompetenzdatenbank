<script>
  import Bulma from "bulma";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import { session} from "$app/stores";
  import { auth, setAuthCookie, unsetAuthCookie } from "$lib/auth";

  session.subscribe((sessionData) => {console.log(sessionData) }); 

  auth.onAuthStateChange((event, _session) => {
    if (event !== "SIGNED_OUT") {
      (async () => {await setAuthCookie(_session)})();
      session.set({ user: _session.user, authenticated: !!_session.user });
    } else {
      session.set({ user: undefined, authenticated: false });
      (async () => {await unsetAuthCookie(_session)})();
    }
  });

  let admin = true;

</script>

<svelte:head>
  <meta name="robots" content="noindex" />
  <script
    src="https://kit.fontawesome.com/a3e38f6c6f.js"
    crossorigin="anonymous"></script>
</svelte:head>

<Header />
<div class="container">
  <slot />
</div>
<Footer logout_visible={$session.authenticated}, admin = {admin}/>


<style>
 
</style>