<script context="module">
  export async function load({ session }) {
    if (typeof session.authenticated == "undefined") {
      return {
        status: 302,
        redirect: "/auth_page",
      };
    }
    return {
      props: {
        user: session.user,
      },
    };
  }
</script>

<script>
  import Main from "$lib/Main.svelte";
  import Footer from "../lib/Footer.svelte";

  let data = [];
</script>

<Main {data} />

