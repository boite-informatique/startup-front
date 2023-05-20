<script lang="ts">
    import { currentUserInfo } from "src/stores/currentUserInfo";
    import { register } from "../api/project";
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";

    const dispatch = createEventDispatcher();

    let product: string = "";
    let brand: string = "";
    let type: "startup" | "patent";
    let resume: string = "";
    let memberEmail: string = "";
    let membersEmails: string[] = [];
    let supervisorEmail: string = "";
    let supervisorsEmails: string[] = [];

    let indicateUserAlreadyAdded = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_("projects.indicator.user already added"),
            indicatorVisible: true,
        });
    };

    let handleAddingProject = async (e) => {
        let indicateDataIsMissing = () => {
            dispatch("showIndicator", {
                indicatorType: "btn-warning",
                indicatorContent: $_("projects.indicator.data is missing"),
                indicatorVisible: true,
            });
        };
        let indicateSuccess = () => {
            dispatch("showIndicator", {
                indicatorType: "btn-success",
                indicatorContent: $_(
                    "projects.indicator.project added successfully"
                ),
                indicatorVisible: true,
            });
        };
        let indicateErrorOccurred = () => {
            dispatch("showIndicator", {
                indicatorType: "btn-error",
                indicatorContent: $_(
                    "projects.indicator.an error occured, please try again"
                ),
                indicatorVisible: true,
            });
        };

        let dataIsMissing = !(
            product &&
            brand &&
            type &&
            resume &&
            membersEmails.length > 0 &&
            supervisorsEmails.length > 0
        );

        if (dataIsMissing) {
            e.preventDefault();
            indicateDataIsMissing();
            return;
        }

        let response = await register({
            resume,
            brand_name: brand,
            product_name: product,
            type,
            members: membersEmails,
            supervisors: supervisorsEmails,
        });

        if (response.status >= 200 && response.status < 300) {
            indicateSuccess();
        } else {
            indicateErrorOccurred();
        }

        product = "";
        brand = "";
        type = undefined;
        resume = "";
        memberEmail = "";
        membersEmails = [];
        supervisorEmail = "";
        supervisorsEmails = [];
    };

    let userIsStudent = $currentUserInfo?.type == "student";
    const membersLimit = userIsStudent ? 5 : 6;
</script>

<label
    for="my-modal-97"
    class="flex w-full max-w-xs cursor-pointer select-none flex-row items-center justify-between rounded-lg bg-black bg-opacity-5 py-3 pl-4 text-sm font-semibold capitalize outline outline-1 outline-accent active:outline-4"
>
    <div>{$_("projects.add a project")}</div>
    <div class="scale-150 pr-3">+</div>
</label>

<input type="checkbox" id="my-modal-97" class="modal-toggle" />
<div class="modal">
    <div class="modal-box flex w-11/12 max-w-5xl flex-col gap-5">
        <h3 class="mb-2 text-xl font-bold capitalize">
            {$_("projects.add a project")} !
        </h3>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.product")} :
            </div>
            <input
                bind:value={product}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.brand")} :
            </div>
            <input
                bind:value={brand}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs md:w-[320px]"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.type")} :
            </div>
            <div class="flex flex-row gap-1 md:gap-2">
                <button
                    class="btn {type == 'startup' ? 'btn-primary' : ''}"
                    on:click={() => {
                        type = "startup";
                    }}>{$_("projects.startup")}</button
                >
                <button
                    class="btn {type == 'patent' ? 'btn-primary' : ''}"
                    on:click={() => {
                        type = "patent";
                    }}>{$_("projects.patent")}</button
                >
            </div>
        </div>
        <div class="flex flex-col items-start justify-start gap-2 md:flex-row">
            <div
                class="translate-y-[10px] text-lg font-semibold capitalize md:w-40"
            >
                {$_("projects.resume")} :
            </div>
            <textarea
                bind:value={resume}
                class="textarea-bordered textarea w-full max-w-lg"
                placeholder="Résumé"
            />
        </div>
        <div class="flex flex-col items-start justify-start gap-2 md:flex-row">
            <div
                class="translate-y-[10px] text-lg font-semibold capitalize md:w-40"
            >
                {$_("projects.members")} :
            </div>
            <div class="flex flex-col gap-[6px]">
                {#each membersEmails as member}
                    <div class="gap2 flex flex-row gap-2">
                        <input
                            bind:value={member}
                            id="email-address"
                            name="email"
                            type="email"
                            autocomplete="email"
                            placeholder={$_("login.Email address")}
                            class="input-bordered input w-full max-w-xs md:w-[320px]"
                        />
                        <button
                            class="btn-outline btn-error btn-square btn {membersEmails.length >=
                            membersLimit
                                ? 'btn-disabled'
                                : ' cursor-pointer'}"
                            on:click={() => {
                                membersEmails = membersEmails.filter(
                                    (item) => item !== member
                                );
                            }}
                        >
                            <svg
                                fill="none"
                                class="h-8 w-8"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                            </svg>
                        </button>
                    </div>
                {/each}
                <div class="flex flex-row gap-2">
                    <input
                        bind:value={memberEmail}
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        placeholder={$_("login.Email address")}
                        class="input-bordered input w-full max-w-xs md:w-[320px]"
                    />
                    <div
                        class={membersEmails.length >= membersLimit
                            ? "cursor-not-allowed"
                            : ""}
                    >
                        <button
                            class="btn-outline btn-success btn-square btn {membersEmails.length >=
                            membersLimit
                                ? 'btn-disabled'
                                : ' cursor-pointer'}"
                            on:click={() => {
                                if (membersEmails.includes(memberEmail)) {
                                    indicateUserAlreadyAdded();
                                    return;
                                }
                                if (memberEmail.length != 0) {
                                    membersEmails = [
                                        ...membersEmails,
                                        memberEmail,
                                    ];
                                    memberEmail = "";
                                }
                            }}
                        >
                            <svg
                                fill="none"
                                class="h-8 w-8"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                            </svg>
                        </button>
                    </div>
                    {#if membersEmails.length != 0}
                        <button
                            class="no-animation btn-square btn cursor-default"
                        >
                            ({membersEmails.length})
                        </button>
                    {/if}
                </div>
            </div>
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.supervisors")} :
            </div>
            <input
                bind:value={supervisorEmail}
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                placeholder={$_("login.Email address")}
                class="input-bordered input w-full max-w-xs md:w-[320px]"
            />
            <div
                class={supervisorsEmails.length >= 3
                    ? "cursor-not-allowed"
                    : ""}
            >
                <button
                    class="btn-square btn {supervisorsEmails.length >= 3
                        ? 'btn-disabled'
                        : ' cursor-pointer'}"
                    on:click={() => {
                        if (supervisorEmail.length != 0) {
                            supervisorsEmails = [
                                ...supervisorsEmails,
                                supervisorEmail,
                            ];
                            supervisorEmail = "";
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 rotate-45 font-extrabold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        /></svg
                    >
                </button>
            </div>
            {#if supervisorsEmails.length != 0}
                <button class="no-animation btn-square btn cursor-default">
                    ({supervisorsEmails.length})
                </button>
            {/if}
        </div>
        <div
            class="mt-3 flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
        >
            <button
                class="btn -mb-6"
                on:click={() => {
                    product = "";
                    brand = "";
                    type = undefined;
                    resume = "";
                    memberEmail = "";
                    membersEmails = [];
                    supervisorEmail = "";
                    supervisorsEmails = [];
                }}>{$_("projects.clear the form")}</button
            >
            <div
                class="flex flex-row items-center justify-start gap-1 md:gap-2"
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label
                    for="my-modal-97"
                    class="modal-action btn"
                    on:click={() => {
                        product = "";
                        brand = "";
                        type = undefined;
                        resume = "";
                        memberEmail = "";
                        membersEmails = [];
                        supervisorEmail = "";
                        supervisorsEmails = [];
                    }}>{$_("admin.users.filter.cancel")}</label
                >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label
                    for="my-modal-97"
                    class="modal-action btn"
                    on:click={(e) => {
                        handleAddingProject(e);
                    }}>{$_("admin.users.save & close")}</label
                >
            </div>
        </div>
    </div>
</div>
