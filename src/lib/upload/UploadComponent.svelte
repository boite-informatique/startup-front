<script lang="ts">
    import api from "src/services/api";

    let file = null;

    function handleFileInput(event) {
        file = event.target.files[0];
    }

    export async function handleFormSubmit() {
        if (!file) throw Error("You must select A file");

        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await api.post("upload/image", formData);
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
    class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
/>
<button on:click={handleFormSubmit}>submit</button>
