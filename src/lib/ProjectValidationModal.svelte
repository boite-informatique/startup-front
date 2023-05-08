<script>
    import { _ } from "svelte-i18n";

    export let projectValidationModalState = false;
    export let projectValidationModalData = {};
</script>

<input
    type="checkbox"
    id="my-modal-6"
    class="modal-toggle"
    bind:checked={projectValidationModalState}
/>
<div class="modal">
    <div class="modal-box relative border border-gray-500 text-gray-200">
        <label
            for="my-modal-6"
            class="btn-sm btn-circle btn absolute right-2 top-2 border border-gray-500 text-gray-200"
            >✕</label
        >

        {#if Object.keys(projectValidationModalData).length > 0}
            <h3 class="text-lg font-bold capitalize">
                {$_("projects.informations about the project validation state")}
            </h3>
            <div class="flex flex-col py-4">
                {#each Object.entries(projectValidationModalData) as [key, value]}
                    {#if value}
                        <div class="text-lg font-medium capitalize">
                            - {key} : {value}
                        </div>
                    {/if}
                {/each}
            </div>
        {:else}
            <h3 class="text-lg font-bold capitalize">
                {$_(
                    "projects.no informations about the project validation state"
                )}
            </h3>
        {/if}
    </div>
</div>
