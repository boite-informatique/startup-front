<script lang="ts">
    import { fetchUsers } from "src/api/admin-user";
    import { _ } from "svelte-i18n";

    export let modifyUsersModalState = false;
    export let selectedUsers: any[] = [];

    let allUsers = fetchUsers();
</script>

<input
    type="checkbox"
    id="my-modal-12"
    class="modal-toggle"
    bind:checked={modifyUsersModalState}
/>
<div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box flex flex-col gap-8">
        <div>
            <h3 class="text-xl font-bold capitalize">
                {$_("admin.roles.modify the role's users")}
            </h3>
            <p class="capitalize opacity-75">
                {$_(
                    "admin.roles.Please select the users that you want to assign to the selected role"
                )}
            </p>
        </div>
        <div class="flex flex-col gap-3">
            {#await allUsers}
                <button class="btn loading">{$_("admin.users.loading")}</button>
            {:then res}
                {#if res.status >= 200 && res.status < 300}
                    {#each res.data as user}
                        <div
                            class="flex flex-row items-start justify-start gap-4 md:items-center {selectedUsers.find(
                                (obj) => {
                                    return obj.id == user.id;
                                }
                            )
                                ? 'opacity-100'
                                : 'opacity-50'}"
                        >
                            <input
                                on:click={() => {
                                    selectedUsers.find((obj) => {
                                        return obj.id == user.id;
                                    })
                                        ? (selectedUsers = selectedUsers.filter(
                                              (obj) => obj.id !== user.id
                                          ))
                                        : (selectedUsers = [
                                              ...selectedUsers,
                                              user,
                                          ]);
                                }}
                                checked={selectedUsers.find((obj) => {
                                    return obj.id == user.id;
                                })
                                    ? true
                                    : false}
                                type="checkbox"
                                class="checkbox ml-[3px] border-0 outline-none focus:border-0 focus:outline-none active:border-0 active:outline-none"
                            />
                            <div
                                class="text-base font-semibold capitalize flex-col justify-start items-start"
                            >
                                <div class="-mb-1">
                                    {user.first_name}
                                    {user.last_name} ({user.type})
                                </div>
                                <div
                                    class="font-normal opacity-90 -mt-1"
                                    style="text-transform: none;"
                                >
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    {:else}
                        <p class="text-center text-lg capitalize font-semibold">
                            {$_("admin.roles.no users available")}
                        </p>
                    {/each}
                {:else}
                    <p class="text-center text-lg capitalize font-semibold">
                        {$_("admin.roles.no users available")}
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
            <label for="my-modal-12" class="modal-action btn"
                >{$_("admin.users.close")}</label
            >
        </div>
    </div>
</div>
