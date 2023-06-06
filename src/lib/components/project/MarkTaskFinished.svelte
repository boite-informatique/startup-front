<script>
    // @ts-nocheck
    import { _ } from "svelte-i18n";

    export let taskFinishedModalState = false;
    export let taskFinishedModalData = "";
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
        <div class="">
            {taskFinishedModalData}
        </div>
    </div>
</div>
