<script lang="ts">
    import { fetchRoles } from "../api/admin-role";
    import { _ } from "svelte-i18n";

    export let modifyRolesModalState = false;
    export let selectedRoles: {
        name: string;
        id: number;
    }[] = [];

    let allRoles = fetchRoles();
</script>

<input
    type="checkbox"
    id="my-modal-12"
    class="modal-toggle"
    bind:checked={modifyRolesModalState}
/>
<div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box flex flex-col gap-8">
        <div>
            <h3 class="text-xl font-bold capitalize">
                {$_("admin.users.modify the user's roles")}
            </h3>
            <p class="capitalize opacity-75">
                {$_(
                    "admin.users.check the roles that you want this user to have"
                )}
            </p>
        </div>
        <div class="flex flex-col gap-1">
            {#await allRoles}
                <button class="btn loading">{$_("admin.users.loading")}</button>
            {:then res}
                {#if res.status >= 200 && res.status < 300}
                    {#each res.data as role}
                        <div
                            class="flex flex-row items-start justify-start gap-2 md:items-center {selectedRoles.find(
                                (obj) => {
                                    return obj.id == role.id;
                                }
                            )
                                ? 'opacity-100'
                                : 'opacity-50'}"
                        >
                            <input
                                on:click={() => {
                                    selectedRoles.find((obj) => {
                                        return obj.id == role.id;
                                    })
                                        ? (selectedRoles = selectedRoles.filter(
                                              (obj) => obj.id !== role.id
                                          ))
                                        : (selectedRoles = [
                                              ...selectedRoles,
                                              role,
                                          ]);
                                }}
                                checked={selectedRoles.find((obj) => {
                                    return obj.id == role.id;
                                })
                                    ? true
                                    : false}
                                type="checkbox"
                                class="checkbox ml-[3px] border-0 outline-none focus:border-0 focus:outline-none active:border-0 active:outline-none"
                            />
                            <div class="text-lg font-semibold capitalize">
                                {role.name}
                            </div>
                        </div>
                    {:else}
                        <p
                            class=" text-center text-lg capitalize font-semibold"
                        >
                            {$_("admin.users.no roles available")}
                        </p>
                    {/each}
                {:else}
                    <p class=" text-center text-lg capitalize font-semibold">
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
            <label for="my-modal-12" class="modal-action btn"
                >{$_("admin.users.close")}</label
            >
        </div>
    </div>
</div>
