<script>
    import { _ } from "svelte-i18n";

    export let projectResumeModalState = false;
    export let projectResumeModalData = "";
</script>

<input
    type="checkbox"
    id="my-modal-432"
    class="modal-toggle"
    bind:checked={projectResumeModalState}
/>
<div class="modal">
    <div class="modal-box relative">
        <label
            for="my-modal-432"
            class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
        >
        <h3 class="mb-3 text-lg font-bold capitalize">
            {$_("projects.a summary of the project idea")}
        </h3>
        <div class="">
            {projectResumeModalData}
        </div>
    </div>
</div>
