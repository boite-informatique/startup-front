<script>
    import { _ } from "svelte-i18n";

    export let modalState = false;
    export let rolesData = [];
</script>

<input
    type="checkbox"
    id="my-modal-3"
    class="modal-toggle"
    bind:checked={modalState}
/>
<div class="modal">
    <div class="modal-box relative">
        <label
            for="my-modal-3"
            class="btn-sm btn-circle btn absolute right-2 top-2 z-[9999]"
            >✕</label
        >
        {#if rolesData.length > 0}
            <h3 class="text-lg font-bold capitalize">
                {$_("admin.users.this user has the following roles")} ({rolesData.length})
                :
            </h3>
            <p class="flex flex-col py-4">
                {#each rolesData as role}
                    <div class="text-lg font-medium capitalize">
                        - {role.name}
                    </div>
                {/each}
            </p>
        {:else}
            <h3 class="text-lg font-bold capitalize">
                {$_("admin.users.this user has no roles")} ({rolesData.length})
            </h3>
        {/if}
    </div>
</div>
