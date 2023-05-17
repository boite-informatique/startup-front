<script lang="ts">
    import api from "src/services/api";
    import { uploadConfig, type UploadTypes } from "./uploadTypes";
    export let type: UploadTypes = "image";
    export let required: boolean = true;
    let files = null;

    function handleFileInput(event) {
        files = event.target.files;
        console.log("fileinput", files);
    }

    export async function handleFormSubmit() {
        if (!required && !files) {
            return uploadConfig[type].multiple ? [] : null;
        }

        if (required && !files) {
            throw new Error("You must select a file");
        }

        const formData = new FormData();
        if (uploadConfig[type].multiple == true) {
            for (const file of files) formData.append("files", file);
        } else {
            formData.append("file", files[0]);
        }
        try {
            const response = await api.post(
                uploadConfig[type].endpoint,
                formData
            );
            console.log("file upload", response);
            if (response.status >= 400) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            throw new Error(
                "There is a problem with uploading your file, please choose another file."
            );
        }
    }
</script>

<input
    on:change={handleFileInput}
    type="file"
    accept={uploadConfig[type].accept}
    required
    multiple={uploadConfig[type].multiple}
    class="file-input-bordered file-input w-full max-w-xs"
/>
