<script>
    export let modal;
    export let modal_title;

    function closeModal() {
        modal = false;
    }
</script>



<div class="modal" style={modal ? 'display: block;' : 'display: none;'}>
    <div id="modal-background" class="modal-background" style={modal ? 'display: block;' : 'display: none;'}></div>
    <div id="modal-card" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{modal_title}</p>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Confirm</button>
        <button class="button" on:click={closeModal}>Cancel</button>
      </footer>
    </div>
  </div>



<style>
    #modal-background {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: black;
        opacity: 65%;
    }

    #modal-card {
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>