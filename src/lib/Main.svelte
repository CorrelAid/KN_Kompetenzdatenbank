<script>
	import Entry from "$lib/Entry.svelte";
	import Search from "$lib/Search.svelte";
	
	export let data;


	let search = "";

	let visibleEntries = [];

	$: visibleEntries = search
		? data.filter((row) => {
				var pattern = RegExp(search, "gi");
				return (
					row.vorname.match(pattern) || row.nachname.match(pattern) ||  row.programming.match(pattern) || row.datascience.match(pattern) || row.webdev.match(pattern) || row.math.match(pattern) || row.other.match(pattern)
					// row.Skills.find((element) => {
					// 	if (element.includes(search)) {
					// 		return true;
					// 	}
					// })
				);
		  })
		: data;
</script>

<Search number_entries={data.length} bind:value={search} />

<table class="table is-fullwidth ">
	<thead class="has-background-primary">
		<tr>
			<th>
				<span class="icon"> <i class="fa-solid fa-user" /></span>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">Name</h3>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">Nachname</h3>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">E-Mail</h3>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">Job</h3>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">Programming</h3>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">Data Science</h3>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">Web Development</h3>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">Mathematik</h3>
			</th>
			<th>
				<h3 class="has-text-weight-semibold">Andere Skills</h3>
			</th>
		</tr>
	</thead>
	<tbody>
		{#each visibleEntries as row}
				<Entry
					id={row.id}
					vorname={row.vorname}
					nachname={row.nachname}
					email={row.email}
					job={row.job}
					programming={row.programming}
					datascience={row.datascience}
					webdev={row.webdev}
					math={row.math}
					other={row.other}
				/>
			{/each}
	</tbody>
</table>

<style>
</style>
