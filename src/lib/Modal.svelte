<script>
  import UploadData from "$lib/Upload_Data.svelte";
  import UploadPicture from "$lib/Upload_Picture.svelte";
  import SendInvitations from "$lib/Send_Invitations.svelte";
  import {
    insert_data,
    upload_picture,
    update_pic,
    gen_file_name,
    delete_everything,
  } from "$lib/db_queries.js";
  import { transform_array } from "$lib/data_processing.js";

  export let modal;
  export let modal_title;
  export let picture_of = "";
  export let found = false;

  let data;
  let loading = false;
  let picture;
  let valid = false;
  let message = "";
  let done = false;

  function closeModal() {
    modal = false;
    message = "";
  }

  const onDataUpload = function (x) {
    data = x;
  };

  function handle_picture_message(event) {
    picture = event.detail.object;
  }

  function handle_invitation_message(event) {
    if (event.detail.valid === true) {
      valid = true;
    }
  }

  async function confirm() {
    // DATA
    if (modal_title === "Upload Data" && data) {
      loading = true;
      try{
        data = transform_array(data);
        await delete_everything();
        await insert_data(data);
        loading = false;
        modal = false;
        location.reload();
      }
      catch(ex){
        message=ex
        loading = false;
      }  
      //
      // PICTURES
    } else if (modal_title === "Upload Picture") {
      loading = true;
      if (picture) {
        if (found == true) {
          await update_pic(picture_of, picture);
        } else if (found == false) {
          const file_name = gen_file_name(picture_of);
          await upload_picture(file_name, picture);
        }

        modal = false;
        location.reload();
      } else {
        message = "Please select a file.";
        loading = false;
      }
      //
      // INVITATIONS
    } else if (modal_title === "Send Invitations") {
      if (valid == true) {
        loading = true;

        const response = await fetch("/invite", {
          method: "post",
          body: "",
        });
        if (response.ok) {
          loading = false;
        } else {
          message = await response.text();
        }

        modal = false;
        location.reload();

        valid = false;
      } else if (valid == false) {
        message = "Please enter the correct command.";
      }
    }
  }
</script>

<div class="modal " style={modal ? "display: block;" : "display: none;"}>
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
      <!-- DATA -->
      {#if modal_title === "Upload Data"}
        <UploadData message={message}, onDataUpload={onDataUpload} />
        <!-- PICTURES -->
      {:else if modal_title === "Upload Picture"}
        <UploadPicture {message} on:message={handle_picture_message} />
        <!-- INVITATIONS -->
      {:else if modal_title === "Send Invitations"}
        <SendInvitations {message} on:message={handle_invitation_message} />
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
    width: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
