<script>
  import Modal from "$lib/Modal.svelte";
  import { download_picture } from "$lib/db_queries.js";
  import { session } from "$app/stores";

  export let f_name;
  export let l_name;
  export let email;
  export let job;
  export let attendance;
  export let skills;
  export let found;
  export let picture_of;
  export let id;

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
</script>

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
  </td>
  <!-- attendance col -->
  <td class="has-text-centered is-hidden-mobile">
    <p class="p-2 attendance">
      {attendance}
    </p>
  </td>
  <!-- skill col -->
  <td>
    <div class="icon_cont">
      <div class="is-flex-direction-row">
        {#each skills as skill}
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
