<script>
	import { createEventDispatcher } from "svelte";
	export let value;
	export let number_entries;
	export let flt;
	export let flt_radio;

	const dispatch = createEventDispatcher();

	function send_event(i) {
		dispatch("message", {
			text: i,
		});
	}

	let is_active = "";
	let checked = false;

	let cat_list = [
		"Alle",
		"Marketing und Kommunikation",
		"Concepting",
		"Programmierung",
		"Projektmanagement",
		"Dataexpert",
		"Design",
		"Software Development",
		"Business Development",
		"Maker",
	];

	function handle_check(){
		if (checked){
			alert("yes")
		}
	}

	function handle_drip() {
		if (is_active === "") {
			is_active = "is-active";
		} else {
			is_active = "";
		}
	}
</script>

<nav class="level container mt-4">
	<div class="px-2 level-left">
		<div class="level-item">
			<p class="title is-size-4-desktop is-size-5-mobile">
				Kompetenzdatenbank
			</p>
		</div>
	</div>
	<!-- Left side -->

	<div class="px-2 level-right">
		<div class="level-item">
			<div class="dropdown {is_active}" on:click={handle_drip}>
				<div class="dropdown-trigger">
					<button
						class="button"
						aria-haspopup="true"
						aria-controls="dropdown-menu"
					>
						<span>Kategorien</span>
						<span class="icon is-small">
							<i class="fas fa-angle-down" aria-hidden="true" />
						</span>
					</button>
				</div>
				<div class="dropdown-menu" id="dropdown-menu" role="menu">
					<div class="dropdown-content">
						{#each cat_list as cat, i}
							<a
								href="#"
								class="dropdown-item"
								on:click={() => send_event(i)}
							>
								{cat}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="level-item">
			<div class="field has-addons">
				<p class="control">
					<input
						class="input py-0"
						type="search"
						placeholder="Suche"
						bind:value
						on:input={flt}
					/>
				</p>
			</div>
		</div>
		<div class="level-item ml-2">
			<p class="subtitle is-5 is-hidden-mobile">
				<strong>{number_entries}</strong> Einträge
			</p>
		</div>
		<div class="px-2 level-item">
			<label class="checkbox">
				<input type="checkbox" bind:checked={checked} on:input={handle_check}/>
				Zeige Mentor*innen
			</label>
		</div>
	</div>
</nav>

<style>
	.title {
		font-family: "Roboto" "serif";
	}
</style>
