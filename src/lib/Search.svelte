<script>
	export let value;
	export let number_entries;
</script>

<nav class="level container">
	<!-- Left side -->
	<div class="px-2 level-left">
		<div class="level-item">
			<p class="subtitle is-5 is-hidden-mobile">
				<strong>{number_entries}</strong> Entries
			</p>
		</div>
		<div class="level-item">
			<div class="field has-addons">
				<p class="control">
					<input class="input" type="search" placeholder="Suche" bind:value />
				</p>
			</div>
		</div>
	</div>
</nav>
