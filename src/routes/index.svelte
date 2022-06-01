<script context="module">
  import { get_pictures, get_data } from "$lib/db_queries.js";

  let data;
  let pictures;

  export async function load({ session }) {
    data = await get_data();
    pictures = await get_pictures();

    if (typeof session.authenticated == "undefined") {
      return {
        status: 302,
        redirect: "/auth_page",
      };
    }
    return {
      props: {
        user: session.user,
        data: data,
        pictures, pictures,
      },
    };
  }
</script>

<script>
  import Entry from "$lib/Entry.svelte";
  import Search from "$lib/Search.svelte";

  export let data;
  export  let pictures;

  

  let search = "";

  let visibleEntries = [];

  $: visibleEntries = search
    ? data.filter((row) => {
        var pattern = RegExp(search, "gi");
        return (
          row.vorname.match(pattern) ||
          row.nachname.match(pattern) ||
          row.programming.match(pattern) ||
          row.datascience.match(pattern) ||
          row.webdev.match(pattern) ||
          row.math.match(pattern) ||
          row.other.match(pattern)
          // row.Skills.find((element) => {
          // 	if (element.includes(search)) {
          // 		return true;
          // 	}
          // })
        );
      })
    : data;


 const pic_search = function(x) {
  for(var i=0; i<pictures.length; i++) {
	if(pictures[i].name == x) {
		return true
	}
}
 }

  function picture_of_gen(x, y, z) {
    return `${x}_${y}_${z}.png`;
  }
</script>

<Search number_entries={data.length} bind:value={search} />

<div class="tableFixHead">
  <table class="table is-fullwidth ">
    <thead>
      <tr>
        <th class="" id="pic_col">
          <!-- <span class="icon"> <i class="fa-solid fa-user" /></span> -->
        </th>
        <th id="prog_col">
          <h3 class="has-text-weight-semibold has-text-centered p-2">
            Programmierung
          </h3>
        </th>
        <th id="skill_col">
          <h3 class="has-text-weight-semibold  p-2 has-text-centered">
            Kompetenzen
          </h3>
        </th>
        <th class="is-hidden-mobile has-text-centered">
          <h3 class="has-text-weight-semibold  p-2">Kontakt</h3>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each visibleEntries as row}
        <Entry
          vorname={row.vorname}
          nachname={row.nachname}
          email={row.email}
          job={row.job}
          programming={row.programming}
          datascience={row.datascience}
          webdev={row.webdev}
          math={row.math}
          other={row.other}
          picture_of={picture_of_gen(row.vorname, row.nachname, row.id)}
          found={pic_search(picture_of_gen(row.vorname, row.nachname, row.id))}
        />
      {/each}
    </tbody>
  </table>
</div>

  
<style>
  table {
    margin-bottom: 25vh;
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
