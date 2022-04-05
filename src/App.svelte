<script>
	import Entry from "./Entry.svelte";
	import Header from "./Header.svelte";
	import Search from "./Search.svelte";

	import data from "./data/data.json";

	let search = "";

	console.log(data);

	$: visibleEntries = search
		? data.filter((row) => {
				var pattern = RegExp(search, "gi");
				return (
					row.Vorname.match(pattern) ||
					row.Nachname.match(pattern) ||
					row.Skills.find((element) => {
						if (element.includes(search)) {
							return true;
						}
					})
				);
		  })
		: data;
</script>

<Header />

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
				Bild={row.Bild}
				Vorname={row.Vorname}
				Nachname={row.Nachname}
				Skills={row.Skills}
			/>
		{/each}
	</tbody>
</table>

<style>
</style>
