<script>
    import { _ } from "svelte-i18n";

    export let RolePermissionsModalState = false;
    export let rolePermissions = [];
</script>

<input
    type="checkbox"
    id="my-modal-4"
    class="modal-toggle"
    bind:checked={RolePermissionsModalState}
/>
<div class="modal">
    <div class="modal-box relative">
        <label
            for="my-modal-4"
            class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
        >
        {#if rolePermissions}
            <h3 class="mb-5 text-lg font-bold capitalize">
                {$_("admin.roles.the permissions associated to the role")} :
            </h3>
            {#each rolePermissions as permission}
                <div class="text-lg font-medium capitalize">
                    - {permission.name}
                </div>
            {/each}
        {:else}
            <h3 class="text-lg font-bold capitalize">
                {$_("admin.roles.no permissions associated to the role")} :
            </h3>
        {/if}
    </div>
</div>
