<script>
	import { createEventDispatcher } from "svelte";
	export let value;
	export let flt;
	export let flt_ment;
	export let flt_orga;
	export let drop_text = "Alles";

	const dispatch = createEventDispatcher();

	function send_event(i) {
		flt_ment(false);
		flt_orga(false);
		check1 = false;
		check2 = false;
		value = "";
		dispatch("message", {
			text: i,
		});
		drop_text = cat_list[i];
	}

	let is_active = "";
	let check1 = false;
	let check2 = false;

	let cat_list = [
		"Alles",
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

	function search(){
		flt_ment(false);
		flt_orga(false);
		check1 = false;
		check2 = false;
		flt()
	}

	function handle_check_ment() {
		if (check1 === false) {
			flt_orga(false);
			flt_ment(true);
			check2 = false;
		} else {
			flt_orga(false);
			flt_ment(false);
		}
	}

	function handle_check_orga() {
		if (check2 === false) {
			flt_ment(false);
			flt_orga(true);
			check1 = false;
		} else {
			flt_ment(false);
			flt_orga(false);
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
			<p class="title is-size-4-desktop is-size-5-mobile is-size-5-tablet">
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
						<span>{drop_text}</span>
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
						on:input={search}
					/>
				</p>
			</div>
		</div>
		<!-- <div class="level-item ml-2">
			<p class="subtitle is-5 is-hidden-mobile">
				<strong>{number_entries}</strong> Einträge
			</p>
		</div> -->
		<div class="px-2 level-item">
			<label class="checkbox">
				<input
					type="checkbox"
					bind:checked={check1}
					on:input={handle_check_ment}
				/>
				Zeige Mentor*innen
			</label>
		</div>
		<div class="px-2 level-item">
			<label class="checkbox">
				<input
					type="checkbox"
					bind:checked={check2}
					on:input={handle_check_orga}
				/>
				Zeige Veranstalter*innen
			</label>
		</div>
	</div>
</nav>

<style>
	.title {
		font-family: "Roboto" "serif";
	}
</style>
