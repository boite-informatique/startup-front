<script lang="ts">
    import { saveDefenseDocuments } from "src/api/project/defense";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import UploadDefenseDocuments from "src/lib/upload/UploadDefenseDocuments.svelte";
    import { createEventDispatcher } from "svelte";

    export let projectId = 28;
    let fileUpload; // file upload function
    const dispatch = createEventDispatcher();

    const handleFormSubmit = async () => {
        let document;
        try {
            const files = await fileUpload();
            document = files;
            console.log(document);
        } catch (error) {
            indicateError(dispatch, error.message);
            return;
        }

        try {
            let response = await saveDefenseDocuments(projectId, document);
            console.log(response);
            switch (response.status) {
                case 201:
                    indicateSuccess(
                        dispatch,
                        "Project defense documents successfully uploaded"
                    );
                    break;
                default:
                    indicateError(dispatch);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };
</script>

<div class="flex items-center justify-center">
    <div class="rounded-lg py-8">
        <h2 class="mb-4 text-center text-2xl font-bold">
            Authorize Project Defense
        </h2>
        <form class="flex flex-col justify-start space-y-4">
            <UploadDefenseDocuments bind:handleFormSubmit={fileUpload} />
            <button class="btn" on:click|preventDefault={handleFormSubmit}
                >Submit</button
            >
        </form>
    </div>
</div>
