<script>
    import { _ } from "svelte-i18n";

    export let projectMembersModalState = false;
    export let projectMembersModalData = [];
</script>

<input
    type="checkbox"
    id="my-modal-5"
    class="modal-toggle"
    bind:checked={projectMembersModalState}
/>
<div class="modal">
    <div class="modal-box relative">
        <label
            for="my-modal-5"
            class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
        >

        {#if projectMembersModalData.length > 0}
            <h3 class="text-lg font-bold capitalize">
                {$_("projects.informations about the project members")}
            </h3>
            <div class="flex flex-col py-4">
                {#each projectMembersModalData as member}
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
                {$_("projects.no members for this project")}
            </h3>
        {/if}
    </div>
</div>
