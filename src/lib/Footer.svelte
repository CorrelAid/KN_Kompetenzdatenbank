<script>
 import { supabase } from "$lib/supabaseClient";

export let logout_visible = false;

async function signOut() {
        try {
            let { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.log(error.message);
        } finally {
        }
    }
</script>

<footer class="has-background-light py-4 level m-0">
    <div class="level-left pl-3">
        <div class="level-item">
            {#if logout_visible}
            <button class="button block" on:click={signOut}> Sign Out </button>
              {/if}
        </div>
    </div>  
  </footer>

  <style>
      footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
  </style>