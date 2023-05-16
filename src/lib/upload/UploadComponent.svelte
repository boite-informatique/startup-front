<script lang="ts">
    import api from "src/services/api";
    import type { UploadTypes } from "./uploadTypes";

    export let type: UploadTypes = "image";
    let files = null;

    function handleFileInput(event) {
        files = event.target.files;
    }

    export async function handleFormSubmit() {
        if (!files) throw Error("You must select A file");

        const formData = new FormData();
        if (type == "multipleDocuments") {
            formData.append("files", files);
        } else {
            formData.append("file", files);
        }
        try {
            let endpoint = "upload/image";
            if (type == "pdf") {
                endpoint = "upload/pdf";
            } else {
                endpoint = "upload/documents";
            }

            const response = await api.post(endpoint, formData);
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
    required
    multiple={type == "multipleDocuments"}
    accept="image"
    class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
/>
<button on:click={handleFormSubmit}>submit</button>
