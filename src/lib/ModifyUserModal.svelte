<script lang="ts">
    import { _ } from "svelte-i18n";
    import { modifyOneUser } from "../api/admin-user";

    export let ModifyUserModalState = false;
    export let email = "";
    export let activated;
    export let ModifyUserModalData: {
        email: string;
        activated: boolean;
        password: string;
        id?: number;
    } = {
        email: "",
        activated: true,
        password: "",
    };

    let password = "";
    let showPassword = false;
    let inputType = "password";

    let handleCancel = () => {
        password = "";
    };

    let handleSave = async () => {
        let ModifyUserPayload: {
            email?: string;
            password?: string;
            roles?: number[];
            activated?: boolean;
        } = {};

        if (ModifyUserModalData.email != email) {
            ModifyUserPayload.email = email;
        }
        if (ModifyUserModalData.activated != activated) {
            ModifyUserPayload.activated = activated;
        }
        if (password.length > 0) {
            ModifyUserPayload.password = password;
        }

        let res = await modifyOneUser(
            ModifyUserModalData.id,
            ModifyUserPayload
        );
        // console.log(ModifyUserModalData);
        // console.log(res);

        password = "";
    };
</script>

<input
    type="checkbox"
    id="my-modal-2"
    class="modal-toggle"
    bind:checked={ModifyUserModalState}
/>
<div class="modal">
    <div
        class="modal-box flex w-11/12 max-w-5xl flex-col gap-5 border border-gray-400 text-gray-200"
    >
        <h3 class="mb-2 text-xl font-bold capitalize">
            {$_("admin.users.modify the user's informations")}!
        </h3>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">email :</div>
            <input
                bind:value={email}
                type="email"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("admin.users.password")} :
            </div>
            {#if showPassword}
                <div class="relative w-full max-w-xs">
                    <input
                        type="text"
                        bind:value={password}
                        placeholder={$_("admin.users.filter.Type here")}
                        class="input-bordered input w-full max-w-xs select-none pr-10"
                    />
                    <svg
                        on:click={() => {
                            showPassword = false;
                            inputType = "password";
                        }}
                        class="absolute right-3 top-3 h-6 w-6 cursor-pointer"
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
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                    </svg>
                </div>
            {:else}
                <div class="relative w-full max-w-xs">
                    <input
                        type="password"
                        bind:value={password}
                        placeholder={$_("admin.users.filter.Type here")}
                        class="input-bordered input w-full max-w-xs select-none pr-10"
                    />

                    <svg
                        on:click={() => {
                            showPassword = true;
                            inputType = "text";
                        }}
                        class="absolute right-3 top-3 h-6 w-6 cursor-pointer"
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
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div>
            {/if}
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("admin.users.activated")} :
            </div>
            <input
                type="checkbox"
                bind:checked={activated}
                class="checkbox ml-[3px] border-0 outline-none focus:border-0 focus:outline-none active:border-0 active:outline-none"
            />
        </div>
        <div
            class="mt-3 flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
        >
            {#if (ModifyUserModalData.email ? ModifyUserModalData.email != email : false) || (ModifyUserModalData.activated ? ModifyUserModalData.activated != activated : false) || password.length > 0}
                <button
                    class="no-animation btn -mb-10 -ml-3 cursor-default border-0 bg-transparent text-base capitalize text-gray-200 hover:border-0 hover:bg-transparent"
                    >{$_("admin.users.modified informations")}: {ModifyUserModalData.email
                        ? ModifyUserModalData.email != email
                            ? "email"
                            : ""
                        : ""}{ModifyUserModalData.password
                        ? password.length > 0
                            ? `${
                                  ModifyUserModalData.email != email ? ", " : ""
                              }${$_("admin.users.password")}`
                            : ""
                        : ""}{ModifyUserModalData.activated
                        ? ModifyUserModalData.activated != activated
                            ? `${password.length > 0 ? ", " : ""}${$_(
                                  "admin.users.activated"
                              )}.`
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
                <label
                    for="my-modal-2"
                    class="modal-action btn"
                    on:click={handleCancel}
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
