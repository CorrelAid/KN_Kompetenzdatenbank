<script>
	export let value;
	export let number_entries;
	export let flt;
	export let flt_radio;
</script>

<nav class="level container">
	<div class="px-2 level-left">
		<div class="level-item">
			<p class="title is-size-4-desktop is-size-5-mobile mt-3">
				Kompetenzdatenbank
			</p>
		</div>
	</div>
	<!-- Left side -->
	
	<div class="px-2 level-right">
		<div class="level-item">
			<p class="subtitle is-5 is-hidden-mobile">
				<strong>{number_entries}</strong> Einträge
			</p>
		</div>
		<div class="level-item">
			<div class="field has-addons">
				<p class="control">
					<input class="input py-0" type="search" placeholder="Suche" bind:value on:input={flt} />
				</p>
			</div>
		</div>
		<!-- <div class="px-2 level-item">
			<div class="control">
				<label class="radio">
				  <input type="radio" name="answer" on:input={flt_radio("Teilnehmer")}>
				  Teilnehmer*innen
				</label>
				<label class="radio">
				  <input type="radio" name="answer" on:input={flt_radio("Mentor")}>
				  Mentor*innen
				</label>
			  </div>
			</div> -->
	</div>
	
		
	
</nav>
<style>
.title{
    font-family: 'Roboto' "serif";
  }
</style>