<script lang="ts">
    import { CreateProjectTask } from "src/api/project/tasks";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import { createEventDispatcher } from "svelte";

    export let projectId: number = 0;
    let title: string = "";
    let description: string = "";
    let deadline: string;

    let fileUpload;
    const dispatch = createEventDispatcher();

    const handleFormSubmit = async () => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        if (now.getTime() > deadlineDate.getTime()) {
            indicateError(dispatch, "Deadline must be in the future");
            return;
        }
        let documents: string[] = [];
        try {
            const files = await fileUpload();
            documents = files || [];
            console.log(files);
        } catch (error) {
            indicateError(dispatch, error.message);
            return;
        }

        try {
            let response = await CreateProjectTask(projectId, {
                title,
                description,
                deadline: deadlineDate,
                resources: documents,
            });
            console.log(response);
            switch (response.status) {
                case 201:
                    indicateSuccess(dispatch, "Task added successfully");
                    break;
                case 400:
                    indicateError(dispatch, (response.data as any).message);
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
        <h2 class="mb-4 text-center text-2xl font-bold">Add Task</h2>
        <form class="flex flex-col justify-start space-y-4">
            <div>
                <label class="label" for="title"
                    ><span class="label-text">Title</span></label
                >
                <input
                    bind:value={title}
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
                    bind:value={description}
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
                    bind:value={deadline}
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
            <button class="btn" on:click|preventDefault={handleFormSubmit}
                >Submit</button
            >
        </form>
    </div>
</div>
