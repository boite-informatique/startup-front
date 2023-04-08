<script>
    import { createEventDispatcher } from "svelte";
    import { fetchUserRoles, fetchUsers } from "../api/admin-user";
    import { _ } from "svelte-i18n";
    import RolesModal from "./RolesModal.svelte";
    import UserTypeModal from "./UserTypeModal.svelte";
    import ModifyUserModal from "./ModifyUserModal.svelte";

    const dispatch = createEventDispatcher();

    let modalState = false;
    let UserTypeModalState = false;
    let ModifyUserModalState = false;
    let rolesData;
    let UserTypeModalData;
    let UserType;
    let ModifyUserModalData = {
        email: "",
        activated: true,
        password: "",
    };

    export let filter = {
        skip: 0,
        take: 10,
    };

    $: users = fetchUsers(filter);
</script>

<div class="h-[400px] w-full overflow-x-auto rounded-lg scrollbar-hide">
    <table class="table w-full">
        <!-- head -->
        <thead>
            <tr class="sticky top-0 z-10 bg-opacity-100 backdrop-blur-md">
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                />
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.user")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.type")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.roles")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.sex")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.birthday infos")}</th
                >
            </tr>
        </thead>
        <tbody>
            {#await users}
                <button class="btn loading">{$_("admin.users.loading")}</button>
            {:then res}
                {#if res.status >= 200 && res.status < 300}
                    <div class="hidden">
                        {res.data.length < 10
                            ? dispatch("stopPagination", true)
                            : dispatch("stopPagination", false)}
                        <!-- added this to indicate that pagination buttons should not show more indexes because we reached the end -->
                    </div>
                    {#each res.data as user}
                        <tr>
                            <td
                                class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >
                                {#if user.activated}
                                    <label>
                                        <input
                                            type="checkbox"
                                            class="checkbox-primary checkbox cursor-default focus:ring-0"
                                            checked={true}
                                            on:click={(e) => {
                                                e.preventDefault();
                                            }}
                                        />
                                    </label>
                                {:else}
                                    <input
                                        type="checkbox"
                                        class="checkbox cursor-default ring-1 ring-black"
                                        style="cursor: default;"
                                        disabled
                                        checked
                                    />
                                {/if}
                            </td>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <td
                                on:click={() => {
                                    ModifyUserModalState = true;
                                    ModifyUserModalData = user;
                                }}
                                title={$_(
                                    "admin.users.click to modify the user's informations"
                                )}
                                class="cursor-pointer bg-gray-200 text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800"
                            >
                                <div class="flex items-center space-x-3">
                                    <div class="avatar">
                                        <div
                                            class="mask mask-squircle h-12 w-12"
                                        >
                                            <img
                                                src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                                alt="Avatar of a user"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">
                                            {user.first_name}
                                            {user.middle_name}
                                            {user.last_name}
                                        </div>
                                        <div
                                            class="text-sm font-medium opacity-90"
                                        >
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <td
                                class="cursor-pointer bg-gray-200 font-bold text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800"
                                on:click={() => {
                                    UserTypeModalState = true;
                                    UserType = user.type;
                                    if (user.type === "Student") {
                                        UserTypeModalData = user.student
                                            ? user.student
                                            : {};
                                    } else if (user.type === "Teacher") {
                                        UserTypeModalData = user.teacher
                                            ? user.teacher
                                            : {};
                                    }
                                }}
                            >
                                {$_(
                                    `admin.users.${`${user.type}`.toLowerCase()}`
                                )}
                                <br />
                                <span class="text-sm font-medium opacity-50"
                                    >{$_("admin.users.click to see more")}</span
                                >
                            </td>
                            {#await fetchUserRoles(user.id)}
                                <td
                                    class="cursor-pointer bg-gray-200 font-bold text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800"
                                >
                                    {$_("admin.users.loading")}
                                    <br />
                                    <span class="text-sm font-medium opacity-50"
                                        >{$_(
                                            "admin.users.click to see more"
                                        )}</span
                                    >
                                </td>
                            {:then rolesRes}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <td
                                    class="cursor-pointer bg-gray-200 font-bold text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800"
                                    on:click={() => {
                                        modalState = true;
                                        rolesRes.status >= 200 &&
                                        rolesRes.status < 300
                                            ? (rolesData = rolesRes.data)
                                            : (rolesData = []);
                                    }}
                                >
                                    {rolesRes.status >= 200 &&
                                    rolesRes.status < 300
                                        ? rolesRes.data.length
                                        : 0}
                                    {$_("admin.users.roles")}
                                    <br />
                                    <span class="text-sm font-medium opacity-50"
                                        >{$_(
                                            "admin.users.click to see more"
                                        )}</span
                                    >
                                </td>
                            {:catch error}
                                <td
                                    class="cursor-pointer bg-gray-200 font-bold text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800"
                                >
                                    <p
                                        class="text-red-800 dark:text-red-200 capitalize font-semibold"
                                    >
                                        {error.message}
                                    </p>
                                    <br />
                                    <span class="text-sm font-medium opacity-50"
                                        >{$_(
                                            "admin.users.click to see more"
                                        )}</span
                                    >
                                </td>
                            {/await}
                            <td
                                class="bg-gray-200 capitalize text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                                >{$_(
                                    `admin.users.${`${user.sex}`.toLowerCase()}`
                                )}</td
                            >
                            <td
                                class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >
                                {user.date_of_birth.split("T")[0]}
                                <br />
                                <span class="text-sm font-medium opacity-90"
                                    >{user.location_of_birth}</span
                                >
                            </td>
                        </tr>
                    {:else}
                        <p
                            class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("admin.users.no users available")}
                        </p>
                    {/each}
                {:else}
                    <p
                        class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                    >
                        {$_("admin.users.no users available")}
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
<UserTypeModal {UserTypeModalData} {UserType} bind:UserTypeModalState />
<ModifyUserModal
    {ModifyUserModalData}
    email={ModifyUserModalData.email}
    activated={ModifyUserModalData.activated}
    bind:ModifyUserModalState
/>
