<script>
    import { createEventDispatcher } from "svelte";

    
    export let message = "";

    let text;

    const dispatch = createEventDispatcher();

    function handle_input(text) {
        // text is some kinf of object, not just the string the user enters
        if (text.target.value == "sudo send emails"){
        dispatch("message", {
            valid: true,
        });}
        
    }
</script>

<p class="">Are you sure you want to send emails to all participants?</p>
<p class="pt-2">After confirmation, all participants that are not already registered will be sent an email containing a log in link.</p>
<div class="field">
    <label class="label pt-2">Enter <code class="has-text-info">sudo send emails</code></label>
    <div class="control">
        <input
            class="input"
            type="text"
            placeholder="Enter command"
            bind:value={text} on:input={handle_input}
        />
    </div>
    <p class="help is-danger">{message}</p>
</div>
