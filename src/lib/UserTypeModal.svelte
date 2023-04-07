<script>
    import { _ } from "svelte-i18n";

    export let UserTypeModalState = false;
    export let UserTypeModalData = {};
    export let UserType;
</script>

<input
    type="checkbox"
    id="my-modal-4"
    class="modal-toggle"
    bind:checked={UserTypeModalState}
/>
<div class="modal">
    <div class="modal-box relative border border-gray-500 text-gray-200">
        <label
            for="my-modal-4"
            class="btn-sm btn-circle btn absolute right-2 top-2 border border-gray-500 text-gray-200"
            >✕</label
        >
        {#if Object.keys(UserTypeModalData).length > 0}
            <h3 class="text-lg font-bold capitalize">
                {$_("admin.users.informations about the")}{$_(
                    `admin.users.${`${UserType}`.toLowerCase()}`
                )} :
            </h3>
            <div class="flex flex-col py-4">
                {#each Object.entries(UserTypeModalData) as [key, value]}
                    {#if value && key !== "id" && key !== "user_id"}
                        <div class="text-lg font-medium capitalize">
                            - {key} : {value}
                        </div>
                    {/if}
                {/each}
            </div>
        {:else}
            <h3 class="text-lg font-bold capitalize">
                {$_("admin.users.no informations about the")}{$_(
                    `admin.users.${`${UserType}`.toLowerCase()}`
                )}.
            </h3>
        {/if}
    </div>
</div>
