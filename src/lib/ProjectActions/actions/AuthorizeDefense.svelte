<script lang="ts">
    import { AuthorizeProjectDefense } from "src/api/project/defense";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import { createEventDispatcher } from "svelte";

    export let projectId = 0;
    let fileUpload; // file upload function
    const dispatch = createEventDispatcher();

    const handleFormSubmit = async () => {
        let document: string;
        try {
            const file = await fileUpload();
            document = file;
        } catch (error) {
            indicateError(dispatch, error.message);
            return;
        }

        try {
            let response = await AuthorizeProjectDefense(projectId, document);
            console.log(response);
            switch (response.status) {
                case 201:
                    indicateSuccess(
                        dispatch,
                        "Project defense authorization successfully created"
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
            <div class="form-control w-full max-w-xs">
                <label class="label" for="file">
                    <span class="label-text">Pick documents to upload</span>
                </label>
                <UploadComponent
                    bind:handleFormSubmit={fileUpload}
                    type="pdf"
                    required={true}
                />
            </div>
            <button class="btn" on:click|preventDefault={handleFormSubmit}
                >Submit</button
            >
        </form>
    </div>
</div>
