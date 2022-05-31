<script>
    import UploadData from "$lib/Upload_Data.svelte";
    import {insert_data} from "$lib/db_queries.js";
    import {transform_array} from "$lib/data_processing.js";

    export let modal;
    export let modal_title;
   
    let data;
    let done;
    let loading = false;

    function closeModal() {
        modal = false;
    }

    const onDataUpload = function (x) {
      console.log(x)
      data = x
    }


    async function confirm() {
      loading = true;
      if (modal_title = "Upload Data"){
        data = transform_array(data);
        console.log(data)
        await insert_data(data);
        loading = false;
        modal = false;
      }

    }
</script>



<div class="modal" style={modal ? 'display: block;' : 'display: none;'}>
    <div id="modal-background" class="modal-background" style={modal ? 'display: block;' : 'display: none;'}></div>
    <div id="modal-card" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{modal_title}</p>
      </header>
      <section class="modal-card-body has-text-centered">
        {#if modal_title === "Upload Data"}
          <UploadData {onDataUpload}/>
        {/if}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" on:click={confirm}>{loading? "Loading..." : "Confirm"}</button>
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