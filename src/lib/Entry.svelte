<script>
  export let Vorname;
  export let Nachname;
  // export let Skills;
  // export let Bild;
  export let id;
</script>

<tr>
  <td>
    <figure class="image image is-4by5">
      <!-- {#if Bild == ""}
        <img src="/img/placeholder.png" alt="picture placeholder" />
      {:else}
        <img src="img/{id}.jpeg" alt="picture of {Vorname} {Nachname}" />
      {/if} -->
    </figure>
  </td>
  <td>
    {Vorname}
  </td>
  <td>
    {Nachname}
  </td>
  <td>
    <!-- {#each Skills as skill}
      <span class="tag">
        {skill}
      </span>
    {/each} -->
  </td>
</tr>
