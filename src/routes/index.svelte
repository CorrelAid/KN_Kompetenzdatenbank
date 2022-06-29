<script context="module">
  import { get_pictures, get_data } from "$lib/db_queries.js";

  export async function load({ session }) {
    if (session.authenticated == true) {
      return {
        props: {},
      };
    } else {
      return {
        status: 302,
        redirect: "/auth_page",
      };
    }
  }
</script>

<script>
  import Entry from "$lib/Entry.svelte";
  import Search from "$lib/Search.svelte";
  import { onMount } from "svelte";

  let data = [];
  let pictures;

  $: loaded = false;

  onMount(async () => {
    try {
      data = await get_data();
      pictures = await get_pictures();
    } catch (ex) {
      message = ex;
    } finally {
      loaded = true;
    }
  });

  let search = "";
  let message;

  let visibleEntries = [];


  $: visibleEntries = search
    ? data.filter((row) => {
        var pattern = RegExp(search, "gi");
        return (
          row.f_name.match(pattern) ||
          row.l_name.match(pattern) ||
          row.attendance.match(pattern)
          // row.programming.match(pattern) ||
          // row.datascience.match(pattern) ||
          // row.webdev.match(pattern) ||
          // row.math.match(pattern) ||
          // row.other.match(pattern)
          // row.skills.find((element) => {
          // 	if (element.includes(search)) {
          // 		return true;
          // 	}
          // })
        );
      })
    : data;

  const pic_search = function (x) {
    for (var i = 0; i < pictures.length; i++) {
      if (pictures[i].name.includes(x)) {
        return true;
      }
    }
    return false;
  };

  function picture_of_gen(x, y, z) {
    return `${z}`;
  }
</script>

{#if loaded === false}
  <div class="loader-wrapper">
    <div class="loader is-loading" />
  </div>
{:else if loaded === true}
  <Search number_entries={visibleEntries.length} bind:value={search} />
  {#if message}
    <p class="has-text-danger mt-4">{message}</p>
  {/if}

  <div class="tableFixHead">
    <table class="table is-fullwidth ">
      <thead>
        <tr>
          <!-- Pic and name col -->
          <th class="" id="pic_col" />
          <!-- attendance col -->
          <th id="attendance_col">
            <h3 class="has-text-weight-semibold has-text-centered p-2">
              Art der Teilnahme
            </h3>
          </th>
          <!-- skill col -->
          <th id="skill_col">
            <h3 class="has-text-weight-semibold  p-2 has-text-centered">
              Kompetenzen
            </h3>
          </th>
          <!-- email col -->
          <th class="is-hidden-mobile has-text-centered">
            <h3 class="has-text-weight-semibold  p-2">Kontakt</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each visibleEntries as row}
          <Entry
            f_name={row.f_name}
            l_name={row.l_name}
            email={row.email}
            job={row.job}
            attendance={row.attendance}
            skills={row.skills}
            picture_of={picture_of_gen(row.id)}
            found={pic_search(picture_of_gen(row.id))}
          />
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  table {
    margin-bottom: 50vh;
    border-collapse: collapse;
    width: 100%;
  }
  .tableFixHead {
    overflow-y: auto;
    height: 100vh;
  }
  .tableFixHead thead th {
    position: sticky;
    top: 0;
  }

  th {
    background: hsl(171, 100%, 41%);
    z-index: 1;
    padding: 0;
  }

  #pic_col {
    width: 15%;
  }
  #prog_col {
    width: 25%;
  }

  @media only screen and (min-width: 1024px) {
    #skill_col {
      width: 25%;
    }
  }

  /* Loader */
  .loader-wrapper {
    height: 100%;
    width: 100%;
    background: #fff;
    transition: opacity 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
  }

  .loader-wrapper .loader {
    height: 80px;
    width: 80px;
  }

  .is-loading {
    position: relative;
  }
</style>
