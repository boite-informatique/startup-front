<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fetchRoles } from "../api/admin-role";
    import { _ } from "svelte-i18n";
    import RolesModal from "./RolesModal.svelte";
    import ModifyRoleModal from "./ModifyRoleModal.svelte";
    import RolePermissionsModal from "./RolePermissionsModal.svelte";

    const dispatch = createEventDispatcher();

    let rolePermissions;
    let modalState = false;
    let RolePermissionsModalState = false;
    let ModifyRoleModalState = false;
    let rolesData;
    let ModifyRoleModalData: {
        name?: string;
        users?: number[];
        permissions?: number[];
    } = {
        name: "",
        users: [],
        permissions: [],
    };

    let roles = fetchRoles();
</script>

<div class="max-h-[480px] w-full overflow-x-auto rounded-lg scrollbar-hide">
    <table class="table w-full">
        <!-- head -->
        <thead>
            <tr class="sticky top-0 z-10 bg-opacity-100 backdrop-blur-md">
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.roles.role name")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.roles.users")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.roles.permissions")}</th
                >
            </tr>
        </thead>
        <tbody>
            {#await roles}
                <button class="btn loading">{$_("admin.users.loading")}</button>
            {:then res}
                {#if res.status >= 200 && res.status < 300}
                    {#each res.data as role}
                        <tr>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <td
                                on:click={() => {
                                    ModifyRoleModalState = true;
                                    ModifyRoleModalData = role;
                                }}
                                title={$_(
                                    "admin.roles.click to modify the role's informations"
                                )}
                                class="cursor-pointer bg-gray-200 text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800"
                            >
                                <div class="flex items-center font-bold">
                                    {role.name}
                                </div>
                                <div class="text-sm font-medium opacity-50">
                                    {$_(
                                        "admin.roles.click to modify the role's informations"
                                    )}
                                </div>
                            </td>
                            <td
                                class="bg-gray-200 font-bold text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            >
                                {role._count.users}
                                {$_("admin.roles.users")}
                            </td>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <td
                                on:click={() => {
                                    RolePermissionsModalState = true;
                                    rolePermissions = role.permissions;
                                }}
                                class="cursor-pointer bg-gray-200 font-bold text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800"
                            >
                                {role._count.permissions}
                                {$_("admin.roles.permissions")}
                                <div class="text-sm font-medium opacity-50">
                                    {$_("admin.users.click to see more")}
                                </div>
                            </td>
                        </tr>
                    {:else}
                        <p
                            class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("admin.roles.no roles available")}
                        </p>
                    {/each}
                {:else}
                    <p
                        class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                    >
                        {$_("admin.roles.no roles available")}
                    </p>
                {/if}
            {:catch error}
                <p
                    class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
                >
                    {error.message}
                </p>
            {/await}
        </tbody>
    </table>
</div>

<RolesModal {rolesData} bind:modalState />
<ModifyRoleModal
    on:showIndicator
    {ModifyRoleModalData}
    name={ModifyRoleModalData.name}
    users={ModifyRoleModalData.users}
    permissions={ModifyRoleModalData.permissions}
    bind:ModifyRoleModalState
/>

<RolePermissionsModal bind:RolePermissionsModalState {rolePermissions} />
