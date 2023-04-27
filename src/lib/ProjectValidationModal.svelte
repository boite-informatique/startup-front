<script>
    import { _ } from "svelte-i18n";

    export let projectValidationModalState = false;
    export let projectValidationModalData = {};
</script>

<input
    type="checkbox"
    id="my-modal-5"
    class="modal-toggle"
    bind:checked={projectValidationModalState}
/>
<div class="modal">
    <div class="modal-box relative border border-gray-500 text-gray-200">
        <label
            for="my-modal-5"
            class="btn-sm btn-circle btn absolute right-2 top-2 border border-gray-500 text-gray-200"
            >✕</label
        >
        <h3 class="mb-3 text-lg font-bold capitalize">
            {$_("projects.the project validation state")}
        </h3>
        <div class="">
            {projectValidationModalData}
        </div>
    </div>
</div>
