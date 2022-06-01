<script>
    import { createEventDispatcher } from 'svelte';


    let message;
    let file_name;
    let uploader;

    let maxFileSize = 52428800;

    const dispatch = createEventDispatcher();

    const send_file = function (x) {
		dispatch('message', {
			object: x
		});
	}

    // Code modified from https://github.com/anderslatif/svelte-csv-upload/blob/master/src/UploadCSV.svelte

    function uploadFile(event) {
        message = null;
        file_name = uploader.files[0].name;
        event.preventDefault();
        const file = uploader.files[0];
        const fileExtensionArray = file.type.split("/");
        const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];
        if (file.size > maxFileSize) {
            message = "Above the max file size threshold.";
            return;
        }
        if (fileExtension.includes("png") && file.size < maxFileSize) {
            send_file(file)
        } else {
            message = "Not an allowed file type.";
            return
        }
    }

    
</script>

<div class="file has-name is-boxed">
    <label class="file-label" id="file_cont">
        <input
            class="file-input"
            type="file"
            name="resume"
            bind:this={uploader}
            on:change={uploadFile}
        />
        <span class="file-cta">
            <span class="file-icon">
                <i class="fas fa-upload" />
            </span>
            <span class="file-label"> Choose a file… </span>
        </span>
        <span class="file-name">
            {#if file_name}
                {file_name}
            {/if}
        </span>
    </label>
</div>
<p class="has-text-danger mt-4">
    {#if message}
        {message}
    {/if}
</p>

<style>
    #file_cont {
        margin: auto;
    }
</style>
