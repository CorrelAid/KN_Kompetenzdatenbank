<script>
    import { signOut } from "$lib/auth";
    import Modal from "$lib/Modal.svelte";
    import { session } from "$app/stores";
    
    let modal_pkg = {
        modal: false,
        modal_title: "",
    };

    async function handle_signOut() {
        await signOut();
        location.reload();
    }

    function upload_data() {
        modal_pkg = {
            modal: true,
            modal_title: "Upload Data",
        };
    }

    function send_invitations() {
        modal_pkg = {
            modal: true,
            modal_title: "Send Invitations",
        };
    }

</script>

<footer class="has-background-light columns is-mobile is-vcentered m-0">
    {#if $session.authenticated == true}
        <div class="column">
            <button class="button block" on:click={handle_signOut}>
                Sign Out
            </button>
        </div>
    {/if}
    {#if $session.admin == true && $session.authenticated == true}
        <div class="column ">
            <!-- session.authenticated returns string -->
            <button class="button block is-primary m-0 mx-2" on:click={upload_data}>
                Upload data
            </button>

            <button class="button block is-primary m-0 mx-2" on:click={send_invitations}>
                Send invitations
            </button>
        </div>
    {/if}
    <div class="column has-text-centered">
            <h2>Impressum</h2>
    </div>
</footer>
<Modal {...modal_pkg} />

<style>
    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
    }

</style>
