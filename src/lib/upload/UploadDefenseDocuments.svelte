<script lang="ts">
    import api from "src/services/api";

    let files = {
        memoire: null,
        bmc: null,
        label: null,
    };

    function handleFileInput(event) {
        files[event.target.name] = event.target.files[0];
    }

    export async function handleFormSubmit() {
        for (const file in files) {
            if (files[file] == null) {
                throw new Error(`${file} must be uploaded`);
            }
        }

        const formData = new FormData();
        formData.append("memoire", files.memoire);
        formData.append("bmc", files.bmc);
        formData.append("label", files.label);

        try {
            const response = await api.post("upload/defensedoc", formData);
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

<div class="form-control w-full max-w-xs">
    <label class="label" for="file">
        <span class="label-text">Upload Dissertation</span>
    </label>
    <input
        on:change={handleFileInput}
        type="file"
        name="memoire"
        accept=".pdf"
        required
        class="file-input-bordered file-input w-full max-w-xs"
    />
</div>

<div class="form-control w-full max-w-xs">
    <label class="label" for="file">
        <span class="label-text">Upload BMC</span>
    </label>
    <input
        on:change={handleFileInput}
        type="file"
        name="bmc"
        accept=".pdf"
        required
        class="file-input-bordered file-input w-full max-w-xs"
    />
</div>

<div class="form-control w-full max-w-xs">
    <label class="label" for="file">
        <span class="label-text">Upload Label</span>
    </label>
    <input
        on:change={handleFileInput}
        type="file"
        name="label"
        accept=".pdf"
        required
        class="file-input-bordered file-input w-full max-w-xs"
    />
</div>
