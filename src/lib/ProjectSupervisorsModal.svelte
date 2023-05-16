<script>
    import { _ } from "svelte-i18n";

    export let projectSupervisorsModalState = false;
    export let projectSupervisorsModalData = [];
</script>

<input
    type="checkbox"
    id="my-modal-54"
    class="modal-toggle"
    bind:checked={projectSupervisorsModalState}
/>
<div class="modal">
    <div class="modal-box relative border border-gray-500 text-gray-200">
        <label
            for="my-modal-54"
            class="btn-sm btn-circle btn absolute right-2 top-2 border border-gray-500 text-gray-200"
            >✕</label
        >

        {#if projectSupervisorsModalData.length > 0}
            <h3 class="text-lg font-bold capitalize">
                {$_("projects.informations about the project supervisors")}
            </h3>
            <div class="flex flex-col py-4">
                {#each projectSupervisorsModalData as member}
                    {#if member}
                        <div class="text-lg font-medium capitalize">
                            - {member.first_name +
                                " " +
                                member.last_name +
                                " (" +
                                member.email +
                                ")"}
                        </div>
                    {/if}
                {/each}
            </div>
        {:else}
            <h3 class="text-lg font-bold capitalize">
                {$_("projects.no Supervisors for this project")}
            </h3>
        {/if}
    </div>
</div>
