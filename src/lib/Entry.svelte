<script>
  export let vorname;
  export let nachname;
  export let email;
  export let job;
  export let programming;
  export let datascience;
  export let webdev;
  export let math;
  export let other;
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
    {vorname}
  </td>
  <td>
    {nachname}
  </td>
  <td>
    {email}
  </td>
  <td>
    {job}
  </td>
  <td>
    {programming}
  </td>
  <td>
    {datascience}
  </td>
  <td>
    {webdev}
  </td>
  <td>
    {math}
  </td>
  <td>
    {other}
  </td>
  <td>
    <!-- {#each Skills as skill}
      <span class="tag">
        {skill}
      </span>
    {/each} -->
  </td>
</tr>
