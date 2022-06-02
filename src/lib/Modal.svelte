<script>
  import UploadData from "$lib/Upload_Data.svelte";
  import UploadPicture from "$lib/Upload_Picture.svelte";
  import Impressum from "$lib/Impressum.svelte";
  import { insert_data, upload_picture, update_pic } from "$lib/db_queries.js";
  import { transform_array } from "$lib/data_processing.js";

  export let modal;
  export let modal_title;
  export let picture_of = "";
  export let found = false;


  let data;
  let loading = false;
  let picture;

    // $: console.log(picture_of)
    // $: console.log(found)

  function closeModal() {
    modal = false;
  }

  const onDataUpload = function (x) {
    data = x;
  };

  function handleMessage(event) {
		picture = event.detail.object;
	}


  async function confirm() {
    
    if (modal_title === "Upload Data" && data) {
      loading = true;
      data = transform_array(data);
      await insert_data(data);
      loading = false;
      modal = false;
      location.reload();
    }
    if (modal_title === "Upload Picture" && picture) {
      loading = true;
      if (found == true){
        console.log("found")
       await update_pic(picture_of, picture)
      }else if(found == false){
        console.log("not found")
        await upload_picture(picture_of, picture)
      }
      
      loading = false;
      modal = false;
      // location.reload();
    }
  }


</script>

<div class="modal" style={modal ? "display: block;" : "display: none;"}>
  <div
    id="modal-background"
    class="modal-background"
    style={modal ? "display: block;" : "display: none;"}
  />
  <div id="modal-card" class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{modal_title}</p>
    </header>
    <section class="modal-card-body has-text-centered">
      {#if modal_title === "Upload Data"}
        <UploadData {onDataUpload}/>
      {/if}
      {#if modal_title === "Upload Picture"}
        <UploadPicture on:message={handleMessage}/>
      {/if}
      {#if modal_title === "Impressum"}
          <Impressum/>
      {/if}
    </section>
    <footer class="modal-card-foot">
      {#if modal_title != "Impressum"}
      <button class="button is-success" on:click={confirm}
        >{loading ? "Loading..." : "Confirm"}</button
      >
      {/if}
      <button class="button" on:click={closeModal}>Close</button>
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
