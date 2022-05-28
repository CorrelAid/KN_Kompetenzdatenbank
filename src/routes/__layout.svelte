<script>
import Bulma from 'bulma'
import Header from "$lib/Header.svelte";
import Footer from '../lib/Footer.svelte';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
	<script src="https://kit.fontawesome.com/a3e38f6c6f.js" crossorigin="anonymous"></script>
</svelte:head>
<Header />
<slot />
<Footer />