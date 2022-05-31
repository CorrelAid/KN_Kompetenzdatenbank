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
  import {get_data} from "$lib/db_queries.js";
  import { onMount } from 'svelte';

  let data = [];

  onMount(async () => {
		data = await get_data();
	});

  $: console.log(data)
</script>

<Main {data} />

