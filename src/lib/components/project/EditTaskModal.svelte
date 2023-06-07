<script lang="ts">
    import { _ } from "svelte-i18n";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";
    import { markTaskFinished } from "src/api/project/tasks";

    export let editTaskModalState = false;
    export let editTaskModalData: any = {
        title: "",
        dsecription: "",
        deadline: "",
    };

    let finishedDescription = "";

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
        let response = await markTaskFinished(
            editTaskModalData.id,
            finishedDescription,
            [ressource]
        );

        switch (response.status) {
            case 200:
                indicateSuccess(
                    dispatch,
                    $_("projects.tasks.task marked as finished")
                );
                break;

            case 400:
                indicateError(dispatch, $_("project.invalid data"));
                break;
            default:
                indicateError(dispatch);
                break;
        }
    };
</script>

<input
    type="checkbox"
    id="my-modal-413"
    class="modal-toggle"
    bind:checked={editTaskModalState}
/>
<div class="modal z-[99999]">
    <div class="modal-box relative">
        <label
            for="my-modal-413"
            class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
        >
        <h3 class="mb-3 text-lg font-bold capitalize">
            {$_("projects.tasks.mark the task")}
            "{editTaskModalData?.title}"
            {$_("projects.tasks.as finished")}
        </h3>

        <form class="flex flex-col justify-start space-y-4">
            <div>
                <label class="label" for="title"
                    ><span class="label-text">Title</span></label
                >
                <input
                    bind:value={editTaskModalData.title}
                    type="text"
                    placeholder="Title"
                    name="title"
                    class="input-bordered input w-full max-w-xs"
                />
            </div>
            <div>
                <label class="label" for="description"
                    ><span class="label-text">Description</span></label
                >
                <textarea
                    bind:value={editTaskModalData.description}
                    class="textarea-bordered textarea w-full max-w-xs"
                    placeholder="Description"
                    name="description"
                />
            </div>
            <div>
                <label class="label" for="deadline"
                    ><span class="label-text">Deadline</span></label
                >
                <input
                    bind:value={editTaskModalData.deadline}
                    type="datetime-local"
                    min="2023"
                    placeholder="Deadline"
                    class="input-bordered input w-full max-w-xs"
                    name="deadline"
                />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label" for="file">
                    <span class="label-text">Pick documents to upload</span>
                </label>
                <UploadComponent
                    bind:handleFormSubmit={fileUpload}
                    type="multipleDocuments"
                    required={false}
                />
            </div>
            <button class="btn">Submit</button>
        </form>
    </div>
</div>
