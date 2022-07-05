<script context="module">

  export async function load({ session }) {
    if (session.authenticated == true) {
      return {
        props: {
          admin: session.admin
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
  import { onMount } from "svelte";
  import {get_data, get_pictures} from "$lib/db_queries.js"

  export let admin;

  let data = [];
  let pictures;
  
  let cat = 0;
  

  $: loaded = false;

  onMount(async () => {
    try {
      data = await get_data(admin);
      pictures = await get_pictures();
    } catch (ex) {
      message = "error: " + ex;
    } finally {
      loaded = true;
    }
  });


  let search = "";
  let message;

  function flt() {
    // Declare variables
    var tbody, tr, name, nameval, skill, i, index;

    tbody = document.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      name = tr[i].getElementsByClassName("name")[0];
      nameval = (name.textContent || name.innerText).toLowerCase();


      skill = tr[i].getElementsByClassName("skill");
      skill = Array.prototype.slice.call(skill);
      skill = skill.map((obj) => {
        return obj.textContent || obj.innerText;
      });

      let found = false;

      for (index = 0; index < skill.length; index++) {
        if (skill[index].toLowerCase().includes(search.toLowerCase())) {
          found = true;
        }
      }

      if (nameval.indexOf(search.toLowerCase()) > -1 || found === true) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function flt_ment(check) {
    var tbody, tr, attendance, attval, i;
    tbody = document.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");
   
    
    const search = "Mentor*in"

    for (i = 0; i < tr.length; i++) {
      attendance = tr[i].getElementsByClassName("attendance")[0];
      attval = (attendance.textContent || attendance.innerText);

     
      if (attval.includes(search) || check == true) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function flt_orga(check) {
    var tbody, tr, attendance, attval, i;
    tbody = document.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");
   
    
    const search = "Veranstalter*in"

    for (i = 0; i < tr.length; i++) {
      attendance = tr[i].getElementsByClassName("attendance")[0];
      attval = (attendance.textContent || attendance.innerText);

     
      if (attval.includes(search) || check == true) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }



  const pic_search = function (x) {
    for (var i = 0; i < pictures.length; i++) {
      if (pictures[i].name.includes(x)) {
        return true;
      }
    }
    return false;
  };

  function handle_drip(event){
		cat = event.detail.text
  }

</script>

{#if loaded === false}
  <div class="loader-wrapper mt-5">
    <div class="loader is-loading" />
  </div>
{:else if loaded === true}
  <Search number_entries={data.length} {flt_ment} {flt_orga} {flt} bind:value={search} on:message={handle_drip}/>
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
          <th class="is-hidden-mobile" id="attendance_col">
            <h3
              class="has-text-weight-semibold has-text-centered p-2"
            >
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
          <th class="is-hidden-mobile has-text-centered" id="email_col">
            <h3 class="has-text-weight-semibold  p-2">Kontakt</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each data as row (row.id)}
          <Entry
            f_name={row.f_name}
            l_name={row.l_name}
            email={row.email}
            job={row.job}
            attendance={row.attendance}
            skills={JSON.parse(row.skills)}
            found={pic_search(row.id.toString())}
            id={row.id}
            confirmed={row.confirmed}
            cat={cat}
          />
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  table {
    margin-bottom: 70vh;
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
  #attendance_col {
    width: 25%;
  }

  #skill_col {
    width: 35%;
  }

  #email_col {
    width: 25%;
  }

  @media only screen and (max-width: 768px) {
    #pic_col {
      width: 20%;
    }

    #skill_col {
      width: 80%;
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
