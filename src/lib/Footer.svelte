<script>
let visible = false;
</script>
<footer class="has-background-light py-4 level m-0">
    <div class="level-left pl-3">
        <div class="level-item">
            {#if visible}
            <p class="subtitle is-6">
                <strong>Logout</strong> 
              </p>
              {/if}
        </div>
    </div>  
    <div class="level-right pr-3">
        <div class="level-item">
            <p class="subtitle is-6">
                <strong>Administration</strong> 
              </p>
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