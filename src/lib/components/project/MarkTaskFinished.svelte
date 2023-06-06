<script lang="ts">
    import { _ } from "svelte-i18n";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";

    export let taskFinishedModalState = false;
    export let taskFinishedModalData: any;

    let finishedDescription;

    const dispatch = createEventDispatcher();

    let fileUpload; // upload function binded from UploadComponent

    let handleMarkAsFinished = async (e) => {
        let ressource: string = null;
        try {
            const files = await fileUpload();
            ressource = files || undefined;
        } catch (error) {
            e.preventDefault();
            indicateError(dispatch, error.message);
            return;
        }
        // let response = await updateProject(project.id, {
        //     resume,
        //     brand_name: brand,
        //     product_name: product,
        //     type,
        //     ressource,
        // });

        // switch (response.status) {
        //     case 200:
        //         indicateSuccess(dispatch, $_("project.updated successfully"));
        //         break;

        //     case 400:
        //         indicateError(dispatch, $_("project.invalid data"));
        //         break;
        //     default:
        //         indicateError(dispatch);
        //         break;
        // }
    };
</script>

<input
    type="checkbox"
    id="my-modal-431"
    class="modal-toggle"
    bind:checked={taskFinishedModalState}
/>
<div class="modal">
    <div class="modal-box relative">
        <label
            for="my-modal-431"
            class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
        >
        <h3 class="mb-3 text-lg font-bold capitalize">
            {$_("projects.tasks.mark the task")}
            "{taskFinishedModalData.title}"
            {$_("projects.tasks.as finished")}
        </h3>
        <form class="flex flex-col justify-start space-y-4">
            <div>
                <label class="label" for="description"
                    ><span class="label-text">description</span></label
                >
                <textarea
                    bind:value={finishedDescription}
                    class="textarea-bordered textarea w-full max-w-xs"
                    placeholder="Description"
                    name="description"
                />
            </div>

            <div class="form-control w-full max-w-xs">
                <label class="label" for="file">
                    <span class="label-text">Resources</span>
                </label>
                <UploadComponent
                    bind:handleFormSubmit={fileUpload}
                    type="image"
                    required={false}
                />
            </div>
            <button class="btn" on:click|preventDefault={handleMarkAsFinished}
                >Submit</button
            >
        </form>
    </div>
</div>
