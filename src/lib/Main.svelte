<script>
	import { supabase } from "$lib/supabaseClient";
	import Entry from "$lib/Entry.svelte";

	import Search from "$lib/Search.svelte";

	let search = "";

	async function getData() {

		let { data, error, status } = await supabase.from("main").select();

		if (data) {
			const df = data;
			return df;
		}

		if (error && status !== 406) throw error;

	}

	let promise = getData();

	// $: visibleEntries = search
	// 	? df.filter((row) => {
	// 			var pattern = RegExp(search, "gi");
	// 			return (
	// 				row.vorname.match(pattern) ||
	// 				row.nachname.match(pattern)
	// 				// row.Skills.find((element) => {
	// 				// 	if (element.includes(search)) {
	// 				// 		return true;
	// 				// 	}
	// 				// })
	// 			);
	// 	  })
	// 	: df;
</script>

{#await promise}
	<p>Loading Database...</p>
{:then df}
	<!-- <Search number_entries={df.length} bind:value={search} /> -->

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
			{#each df as row}
				<Entry
					id={row.id}
					Vorname={row.vorname}
					Nachname={row.nachname}
				/>
			{/each}
		</tbody>
	</table>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
</style>
