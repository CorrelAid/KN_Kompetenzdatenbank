<script>
	import Entry from "$lib/Entry.svelte";
	import Search from "$lib/Search.svelte";
	
	export let data = [];

	let search = "";

	let visibleEntries = [];

	$: visibleEntries = search
		? data.filter((row) => {
				var pattern = RegExp(search, "gi");
				return (
					row.vorname.match(pattern) || row.nachname.match(pattern)
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

<table class="table is-fullwidth is-narrow container">
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
				<h3 class="has-text-weight-semibold">Skills</h3>
			</th>
		</tr>
	</thead>
	<tbody>
		{#each visibleEntries as row}
				<Entry
					id={row.id}
					Vorname={row.vorname}
					Nachname={row.nachname}
				/>
			{/each}
	</tbody>
</table>

<style>
</style>
