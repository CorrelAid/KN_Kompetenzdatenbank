<script>
  import Modal from "$lib/Modal.svelte";
  import {
    download_picture,
    confirm_user,
    disaffirm_user,
  } from "$lib/db_queries.js";
  import { session } from "$app/stores";

  export let f_name;
  export let l_name;
  export let email;
  export let job;
  export let attendance;
  export let skills = [];
  export let found;
  export let picture_of;
  export let id;
  export let confirmed;
  export let cat = 0;

  let src = "/img/placeholder.png";

  let modal_pkg = {
    modal: false,
    modal_title: "",
    found: null,
  };

  function upload_pictures() {
    modal_pkg = {
      modal: true,
      modal_title: "Upload Picture",
      picture_of: picture_of,
      found: found,
    };
  }

  async function download() {
    if (found) {
      try {
        const { data, error } = await download_picture(picture_of);
        if (error) throw error;
        src = URL.createObjectURL(data);
      } catch (error) {
        console.error("Error downloading image: ", error.message);
      }
    } else {
      src = "/img/placeholder.png";
    }
  }

  async function handle_confirm() {
    if (confirmed === false) {
      const { data1, error1 } = confirm_user(id);
      confirmed = true;
    } else if (confirmed === true) {
      const { data2, error2 } = disaffirm_user(id);
      confirmed = false;
    }
  }
  let visible = [];
  $: visible = Object.values(skills).flat(Infinity);

  $: {
    cat === 0
      ? (visible = Object.values(skills).flat(Infinity))
      : (visible = Object.values(skills[cat - 1]).flat(Infinity));
  }
</script>
{#if visible != ""}
<tr {id}>
  <!-- Pic and name col -->
  <td class="pic_td">
    <div id="pic_text_cont">
      <figure class="image is-3by4">
        <img {src} alt="placeholder" use:download />
        {#if $session.admin == true}
          <div class="overlay p-3">
            <button class="button is-info" on:click={upload_pictures}>
              <i
                class="fas fa-upload icon is-medium p-1"
                id="file_upload"
              /></button
            >
          </div>
        {/if}
      </figure>

      <p class="pt-2 has-text-weight-bold is-size-5-desktop name">
        {f_name}
        {l_name}
      </p>
      <p class="has-text-weight-medium">{job}</p>
    </div>
    <a
      class="icon-text has-text-link is-hidden-tablet p-2"
      href="mailto:{email}"
    >
      <span class="icon has-text-info">
        <i class="fas fa-envelope " />
      </span>
      <span>Kontakt</span>
    </a>
    <p class="pl-2 is-hidden-tablet attendance">
      {attendance}
    </p>
    {#if $session.admin == true}
      {#if confirmed == false}
        <button class="button is-success ml-2" on:click={handle_confirm}>
          <span class="icon is-small">
            <i class="fas fa-check" />
          </span>
          <span>Confirm</span>
        </button>
      {:else if confirmed == true}
        <button class="button is-danger ml-2" on:click={handle_confirm}>
          <span class="icon is-small">
            <i class="fas fa-ban" />
          </span>
          <span>Disaffirm</span>
        </button>
      {/if}
    {/if}
  </td>
  <!-- attendance col -->
  <td class="has-text-centered is-hidden-mobile">
    <p class="p-2 attendance">
      {attendance}
    </p>
  </td>
  <!-- skill col -->
    <td>
     
      <div class="icon_cont is-hidden-tablet">
        <div class="is-flex-direction-row">
          {#each visible as skill}
            {#if skill != ""}
              <span class="tag m-1 skill">
                {skill}
              </span>
              <br />
            {/if}
          {/each}
        </div>
      </div>
      <div class="icon_cont is-hidden-mobile">
        <div class="is-flex-direction-row">
          {#each visible as skill}
            {#if skill != ""}
              <span class="tag m-1 skill">
                {skill}
              </span>
            {/if}
          {/each}
        </div>
      </div>
      
    </td>
 
  <!-- email col -->
  <td class="is-hidden-mobile has-text-centered">
    <p class="p-2">
      <a href="mailto:{email}">{email}</a>
    </p>
  </td>
  <td />
</tr>
{/if}
<Modal {...modal_pkg} />

<style>
  /* The overlay effect - lays on top of the container and over the image */
  .overlay {
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.5); /* Black see-through */
    width: 100%;
    color: white;
    text-align: center;
  }

  #file_upload:hover {
    cursor: pointer;
  }

  td {
    padding-left: 0;
    padding-right: 0;
  }

  .icon_cont {
    margin-left: 2vh;
  }

  #pic_text_cont {
    margin-left: 1vh;
  }

  img {
    max-width: 100%;
    height: auto;
}


  .message-header-text {
    margin: auto;
  }

  .message {
    max-width: 20vh;
    margin: auto;
  } 

  /* #mail_p {
    font-size: 1.3vh;
    word-wrap: break-word;
  }
</style>
