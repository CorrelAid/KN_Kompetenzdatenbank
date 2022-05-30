<script>
    import { signOut } from '$lib/auth';
    import Modal from "$lib/Modal.svelte";

    export let logout_visible = false;
    export let admin;

    console.log(logout_visible)
    

    let modal_pkg = {
        modal: false,
        modal_title: "",
    };

    // async function signOut() {
    //     try {
    //         let { error } = await supabase.auth.signOut();
    //         location.reload();
    //         if (error) throw error;
    //     } catch (error) {
    //         console.log(error.message);
    //     } finally {
    //     }
    // }

    async function handle_signOut(){
        await signOut();
        location.reload();
    }

    async function upload_data() {
        modal_pkg = {
            modal: true,
            modal_title: "Upload Data",
        };
    }

    async function upload_pictures() {
        modal_pkg = {
            modal: true,
            modal_title: "Upload Pictures",
        };
    }

    async function send_invitations() {
        modal_pkg = {
            modal: true,
            modal_title: "Send Invitations",
        };
    }
</script>

<footer class="has-background-light py-4 level m-0">
    <div class="level-left pl-3">
        <div class="level-item">
            <!-- session.authenticates returns string -->
            {#if logout_visible.includes("true")} 
                <button class="button block" on:click={handle_signOut}>
                    Sign Out
                </button>
            {/if}
        </div>
    </div>
    <div class="level-item">
        <h2>Impressum</h2>
    </div>
    {#if admin == true && logout_visible.includes("true")}
        <div class="level-right pr-3">
            <div class="level-item">
                <h2 class="is-size-6">
                    <strong>Administration Functions:</strong>
                </h2>
            </div>
            <div class="level-item">
                <button class="button block" on:click={upload_data}>
                    Upload data
                </button>
            </div>
            <div class="level-item">
                <button class="button block" on:click={upload_pictures}>
                    Upload Pictures
                </button>
            </div>
            <div class="level-item">
                <button class="button block" on:click={send_invitations}>
                    Send invitations
                </button>
            </div>
        </div>
    {/if}
</footer>
<Modal {...modal_pkg}/>

<style>
    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
    }
</style>
