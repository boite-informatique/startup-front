<script lang="ts">
    let title: string = "";
    let description: string = "";
    let deadline: Date;

    console.log(new Date("2023-05-16T16:30"));
    $: console.log(deadline);
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
                    placeholder="Deadline"
                    class="input-bordered input w-full max-w-xs"
                    name="deadline"
                />
            </div>
            <button disabled class="btn-disabled btn mt-4"
                >TODO : FILE UPLOAD</button
            >
        </form>
    </div>
</div>
