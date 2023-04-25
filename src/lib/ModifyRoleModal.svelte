<script lang="ts">
    import { _ } from "svelte-i18n";
    import { modifyOneRole } from "../api/admin-role";
    import { createEventDispatcher } from "svelte";
    import ModifyUserRolesModal from "./ModifyUserRolesModal.svelte";

    const dispatch = createEventDispatcher();

    export let ModifyRoleModalState = false;
    export let name: string = "";
    export let permissions: number[] = [];
    export let users: number[] = [];
    export let ModifyRoleModalData: {
        _count?: {
            users: number;
            permissions: number;
        };
        name?: string;
        users?: number[];
        permissions?: number[];
    } = {
        _count: {
            users: 0,
            permissions: 0,
        },
        name: "",
        users: [],
        permissions: [],
    };

    let modifyRolesModalState;

    let handleSave = async () => {
        let ModifyRolePayload: {
            name?: string;
            users?: number[];
            permissions?: number[];
        } = {};

        let userInformationsNotModified = !(
            (ModifyRoleModalData.name
                ? ModifyRoleModalData.name != name
                : false) ||
            (ModifyRoleModalData.users
                ? ModifyRoleModalData.users != users
                : false) ||
            (ModifyRoleModalData.permissions
                ? ModifyRoleModalData.permissions != permissions
                : false)
        );

        if (userInformationsNotModified) {
            indicateUserInformationsNotModified();
            return;
        }

        if (ModifyRoleModalData.name != name) {
            ModifyRolePayload.name = name;
        }
        if (ModifyRoleModalData.users != users) {
            ModifyRolePayload.users = users;
        }
        if (ModifyRoleModalData.permissions != permissions) {
            ModifyRolePayload.permissions = permissions.map((obj) => obj);
        }

        // let response = await modifyOneRole(
        //     // here put data.
        // );

        // if (response.status >= 200 && response.status < 300) {
        //     indicateSuccess();
        // } else if (response.status >= 400 && response.status < 500) {
        //     indicate4xx();
        // } else if (response.status >= 500 && response.status < 600) {
        //     indicateInternalServerError();
        // } else {
        //     indicateErrorOccurred();
        // }
    };

    let indicateUserInformationsNotModified = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-warning",
            indicatorContent: $_(
                "admin.indicator.no modifications were performed"
            ),
            indicatorVisible: true,
        });
    };
    let indicateInternalServerError = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_(
                "login.indicator.an internal server error occurred, please try again"
            ),
            indicatorVisible: true,
        });
    };
    let indicateErrorOccurred = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-warning",
            indicatorContent: $_(
                "login.indicator.an error occured, please try again"
            ),
            indicatorVisible: true,
        });
    };
    let indicate4xx = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_("admin.indicator.4xx error, please try again"),
            indicatorVisible: true,
        });
    };
    let indicateSuccess = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-info",
            indicatorContent: $_(
                "admin.indicator.Your changes have been saved successfully"
            ),
            indicatorVisible: true,
        });
    };
</script>

<input
    type="checkbox"
    id="my-modal-2"
    class="modal-toggle"
    bind:checked={ModifyRoleModalState}
/>
<div class="modal">
    <div
        class="modal-box flex w-11/12 max-w-5xl flex-col gap-5 border border-gray-400 text-gray-200"
    >
        <h3 class="mb-2 text-xl font-bold capitalize">
            {$_("admin.roles.modify the role's informations")}!
        </h3>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("admin.roles.role name")}
            </div>
            <input
                bind:value={name}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("admin.roles.users")} :
            </div>

            <div class="flex flex-row gap-1 md:gap-2">
                <button
                    class="btn-active no-animation btn cursor-auto capitalize text-gray-300"
                    >{ModifyRoleModalData._count?.users}
                    {$_("admin.roles.users")}</button
                >
                <button
                    class="btn-ghost btn-active btn flex flex-row items-center justify-between gap-3 text-white opacity-80 hover:opacity-100"
                    on:click={() => {
                        modifyRolesModalState = true;
                    }}
                >
                    <div class="mt-[1px]">
                        {$_("admin.roles.modify users")}
                    </div>
                    <svg
                        class="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("admin.roles.permissions")} :
            </div>

            <div class="flex flex-row gap-1 md:gap-2">
                <button
                    class="btn-active no-animation btn cursor-auto capitalize text-gray-300"
                    >{ModifyRoleModalData._count?.permissions}
                    {$_("admin.roles.permissions")}</button
                >
                <button
                    class="btn-ghost btn-active btn flex flex-row items-center justify-between gap-3 text-white opacity-80 hover:opacity-100"
                    on:click={() => {
                        modifyRolesModalState = true;
                    }}
                >
                    <div class="mt-[1px]">
                        {$_("admin.roles.modify permissions")}
                    </div>
                    <svg
                        class="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <div
            class="mt-3 flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
        >
            {#if (ModifyRoleModalData.name ? ModifyRoleModalData.name != name : false) || (ModifyRoleModalData.users ? ModifyRoleModalData.users != users : false) || (ModifyRoleModalData.permissions ? ModifyRoleModalData.permissions != permissions : false)}
                <button
                    class="no-animation btn -mb-10 -ml-3 cursor-default border-0 bg-transparent text-base capitalize text-gray-200 hover:border-0 hover:bg-transparent"
                    >{$_("admin.users.modified informations")}: {ModifyRoleModalData.name
                        ? ModifyRoleModalData.name != name
                            ? `${$_("admin.roles.role name")}`
                            : ""
                        : ""}{ModifyRoleModalData.users
                        ? ModifyRoleModalData.users != users
                            ? `${
                                  ModifyRoleModalData.name != name ? ", " : ""
                              }${$_("admin.roles.users")}`
                            : ""
                        : ""}{ModifyRoleModalData.permissions
                        ? ModifyRoleModalData.permissions != permissions
                            ? `${
                                  ModifyRoleModalData.users != users ? ", " : ""
                              }${$_("admin.roles.permissions")}.`
                            : "."
                        : ""}
                </button>
            {:else}
                <button
                    class="no-animation btn -mb-10 -ml-3 cursor-default border-0 bg-transparent text-base capitalize text-gray-200 opacity-75 hover:border-0 hover:bg-transparent"
                    >{$_("admin.users.no modified informations")}.
                </button>
            {/if}
            <div
                class="flex flex-row items-center justify-start gap-1 md:gap-2"
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="my-modal-2" class="modal-action btn"
                    >{$_("admin.users.filter.cancel")}</label
                >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label
                    for="my-modal-2"
                    class="modal-action btn"
                    on:click={handleSave}
                    >{$_("admin.users.save & close")}</label
                >
            </div>
        </div>
    </div>
</div>

<!-- <ModifyUserRolesModal bind:modifyRolesModalState bind:selectedRoles={roles} /> -->
