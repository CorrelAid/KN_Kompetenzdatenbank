<script>
  import { session } from "$app/stores";
</script>


<header class="level mt-5 mb-3 px-2">
  {#if $session.admin == true && $session.authenticated == true}
  <div class="level-item has-text-centered">
    <h1 class="title is-size-4-mobile is-size-3-desktop">Kompetenzdatenbank: Admin View</h1>
  </div>
  {:else}
  <div class="level-item has-text-centered">
    <h1 class="title is-size-4-mobile is-size-3-desktop">Kompetenzdatenbank</h1>
  </div>
  {/if}
</header>

<style>
</style>
