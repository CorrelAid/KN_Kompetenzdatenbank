<script>
  import Modal from "$lib/Modal.svelte";
  import { download_picture } from "$lib/db_queries.js";
  import { session } from "$app/stores";

  export let vorname;
  export let nachname;
  export let email;
  export let job;
  export let programming;
  export let datascience;
  export let webdev;
  export let math;
  export let other;
  export let found;
  export let picture_of;
  

  let src = "/img/placeholder.png";

  let modal_pkg = {
    modal: false,
    modal_title: "",
  };

  function upload_pictures() {
    modal_pkg = {
      modal: true,
      modal_title: "Upload Picture",
      picture_of: picture_of,
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

<tr>
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

      <p class="pt-2 has-text-weight-bold is-size-5-desktop">
        {vorname}
        {nachname}
      </p>
      <p class="pb-1 has-text-weight-medium">{job}</p>
    </div>
  </td>
  <td>
    <div class="icon_cont">
      <div class="is-flex-direction-row">
        {#each JSON.parse(programming) as language}
          <span class="icon m-2 is-medium">
            <img
              src="/img/{language}.svg"
              alt={language}
              style="height: 100%;"
            />
          </span>
        {/each}
      </div>
      <!-- <div id="email-cont" class="is-hidden-desktop">
        <p class="has-text-weight-bold pt-5" id="mail_p">
          Kontakt:
        </p>
        <p  id="mail_p">
          {email}
        </p>
      </div> -->
    </div>
  </td>
  <td>
    <div class="is-flex-direction-row has-text-centered">
      {#each JSON.parse(datascience) as item}
        <span class="tag m-1">
          {item}
        </span>
      {/each}
      {#each JSON.parse(webdev) as item}
        <span class="tag m-1">
          {item}
        </span>
      {/each}
      {#each JSON.parse(math) as item}
        <span class="tag m-1">
          {item}
        </span>
      {/each}
      {#if other}
        <span class="tag">Sonstiges: {other}</span>
      {/if}
    </div>
  </td>
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

  /* #mail_p {
    font-size: 1.3vh;
    word-wrap: break-word;
  } */
</style>
