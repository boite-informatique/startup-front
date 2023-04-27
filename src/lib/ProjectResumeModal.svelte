<script>
    import { _ } from "svelte-i18n";

    export let projectResumeModalState = false;
    export let projectResumeModalData = "";
</script>

<input
    type="checkbox"
    id="my-modal-4"
    class="modal-toggle"
    bind:checked={projectResumeModalState}
/>
<div class="modal">
    <div class="modal-box relative border border-gray-500 text-gray-200">
        <label
            for="my-modal-4"
            class="btn-sm btn-circle btn absolute right-2 top-2 border border-gray-500 text-gray-200"
            >✕</label
        >
        <h3 class="mb-3 text-lg font-bold capitalize">
            {$_("projects.a summary of the project idea")}
        </h3>
        <div class="">
            {projectResumeModalData}
        </div>
    </div>
</div>
