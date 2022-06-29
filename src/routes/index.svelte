<script context="module">
  import { get_pictures, get_data } from "$lib/db_queries.js";

  let data;
  let pictures;

  export async function load({ session }) {
    data = await get_data();
    pictures = await get_pictures();

    if (session.authenticated == true) {
      return {
        props: {
          data: data,
          pictures: pictures,
        },
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

  export let data;
  export let pictures = [];

  let search = "";

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
    return `${x}_${y}_${z}`;
  }
</script>

<Search bind:value={search} bind:number_entries={visibleEntries.length} />

<div class="tableFixHead">
  <table class="table is-fullwidth ">
    <thead>
      <tr>
        <!-- Pic and name col -->
        <th class="" id="pic_col">
        </th>
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
          picture_of={picture_of_gen(row.vorname, row.nachname, row.id)}
          found={pic_search(picture_of_gen(row.vorname, row.nachname, row.id))}
        />
      {/each}
    </tbody>
  </table>
</div>

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
</style>
