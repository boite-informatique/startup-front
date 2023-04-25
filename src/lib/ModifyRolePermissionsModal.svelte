<script lang="ts">
    import { getAllPermissions } from "../api/admin-role";
    import { _ } from "svelte-i18n";

    export let modifyPermissionsModalState = false;
    export let selectedPermissions: any[] = [];

    let allPermissions = getAllPermissions();
</script>

<input
    type="checkbox"
    id="my-modal-13"
    class="modal-toggle"
    bind:checked={modifyPermissionsModalState}
/>
<div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box flex flex-col gap-8 text-gray-200">
        <div>
            <h3 class="text-xl font-bold capitalize">
                {$_("admin.roles.modify the role's permissions")}
            </h3>
            <p class="capitalize opacity-75">
                {$_(
                    "admin.roles.Please select the permissions that you want to assign to the selected role"
                )}
            </p>
        </div>
        <div class="flex flex-col gap-1">
            {#await allPermissions}
                <button class="btn loading">{$_("admin.users.loading")}</button>
            {:then res}
                {#if res.status >= 200 && res.status < 300}
                    {#each res.data as permission}
                        <div
                            class="flex flex-row items-start justify-start gap-2 text-gray-100 md:items-center {selectedPermissions.find(
                                (obj) => {
                                    return obj.id == permission.id;
                                }
                            )
                                ? 'opacity-100'
                                : 'opacity-50'}"
                        >
                            <input
                                on:click={() => {
                                    selectedPermissions.find((obj) => {
                                        return obj.id == permission.id;
                                    })
                                        ? (selectedPermissions =
                                              selectedPermissions.filter(
                                                  (obj) =>
                                                      obj.id !== permission.id
                                              ))
                                        : (selectedPermissions = [
                                              ...selectedPermissions,
                                              permission,
                                          ]);
                                }}
                                checked={selectedPermissions.find((obj) => {
                                    return obj.id == permission.id;
                                })
                                    ? true
                                    : false}
                                type="checkbox"
                                class="checkbox ml-[3px] border-0 outline-none focus:border-0 focus:outline-none active:border-0 active:outline-none"
                            />
                            <div class="text-lg font-semibold capitalize">
                                {permission.name}
                            </div>
                        </div>
                    {:else}
                        <p
                            class="text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("admin.users.no roles available")}
                        </p>
                    {/each}
                {:else}
                    <p
                        class="text-gray-200 text-center text-lg capitalize font-semibold"
                    >
                        {$_("admin.users.no roles available")}
                    </p>
                {/if}
            {:catch error}
                <p
                    class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
                >
                    {error.message}
                </p>
            {/await}
        </div>
        <div class="flex flex-row items-center justify-end">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <label for="my-modal-13" class="modal-action btn"
                >{$_("admin.users.close")}</label
            >
        </div>
    </div>
</div>
