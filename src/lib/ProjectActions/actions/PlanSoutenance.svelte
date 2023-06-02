<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { updateProject } from "src/api/project/project";
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { planSoutenance } from "src/api/project/planification";
    import type {
        DefenseMode,
        DefenseNature,
    } from "src/api/project/types/defense-planification-types";

    export let project: PopulatedProject;

    const dispatch = createEventDispatcher();

    let date: Date;
    let location: string = null;
    let mode: DefenseMode = "onsite";
    let nature: DefenseNature = "private";
    let jury_president: string = "";
    let jury_members: string[] = [];
    let jury_invities: string[] = [];

    let memberEmail = "";
    let inviteeEmail = "";
    let membersLimit = 6;

    let handleAddingProject = async (e) => {
        if (mode == "online") {
            location = null;
        }
        let response = await planSoutenance(project.id, {
            mode,
            nature,
            date,
            location,
            jury_president,
            jury_members,
            jury_invities,
        });

        switch (response.status) {
            case 200:
                indicateSuccess(dispatch, $_("project.updated successfully"));
                break;

            case 400:
                indicateError(dispatch, $_("project.invalid data"));
                break;
            default:
                indicateError(dispatch);
                break;
        }
    };
</script>

<div class="flex items-center justify-center">
    <div class="rounded-lg py-8">
        <h2 class="mb-4 text-center text-2xl font-bold">
            {$_("projects.plan soutenance")}
        </h2>
        <form class="flex flex-col justify-start space-y-4">
            <div>
                <label class="label" for="mode"
                    ><span class="label-text">{$_("projects.mode")}</span
                    ></label
                >
                <div class="w-full max-w-xs">
                    <button
                        class="btn {mode == 'onsite' ? 'btn-primary' : ''}"
                        on:click|preventDefault={() => {
                            mode = "onsite";
                        }}>{$_("projects.onsite")}</button
                    >
                    <button
                        class="btn {mode == 'online' ? 'btn-primary' : ''}"
                        on:click|preventDefault={() => {
                            mode = "online";
                        }}>{$_("projects.online")}</button
                    >
                </div>
            </div>

            {#if mode == "onsite"}
                <div>
                    <label class="label" for="title"
                        ><span class="label-text"
                            >{$_("projects.location")}</span
                        ></label
                    >
                    <input
                        bind:value={location}
                        type="text"
                        name="location"
                        class="input-bordered input w-full max-w-xs"
                    />
                </div>
            {/if}
            <div>
                <label class="label" for="title"
                    ><span class="label-text">{$_("projects.date")}</span
                    ></label
                >
                <input
                    bind:value={date}
                    type="datetime-local"
                    name="date"
                    class="input-bordered input w-full max-w-xs"
                />
            </div>

            <!-- Jury President -->
            <div>
                <label class="label" for="title"
                    ><span class="label-text"
                        >{$_("projects.jury president email")}</span
                    ></label
                >
                <input
                    bind:value={jury_president}
                    type="text"
                    name="jury_president"
                    class="input-bordered input w-full max-w-xs"
                />
            </div>
            <!-- Jury members -->
            <div>
                <label class="label" for="title"
                    ><span class="label-text"
                        >{$_("projects.jury members emails")}</span
                    ></label
                >
                <div class="flex flex-col gap-[6px]">
                    {#each jury_members as member}
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
                                class="btn-outline btn-error btn-square btn cursor-pointer"
                                on:click={() => {
                                    jury_members = jury_members.filter(
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
                            class={jury_members.length >= membersLimit
                                ? "cursor-not-allowed"
                                : ""}
                            style={jury_members.length >= membersLimit
                                ? "opacity: 0.25;"
                                : ""}
                        >
                            <button
                                class="btn-outline btn-success btn-square btn {jury_members.length >=
                                membersLimit
                                    ? 'btn-disabled'
                                    : ' cursor-pointer'}"
                                on:click|preventDefault={() => {
                                    if (jury_members.includes(memberEmail)) {
                                        indicateError(
                                            dispatch,
                                            $_("project.user already added")
                                        );
                                        return;
                                    }
                                    if (memberEmail.length != 0) {
                                        jury_members = [
                                            ...jury_members,
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
                        {#if jury_members.length != 0}
                            <button
                                class="no-animation btn-square btn cursor-default"
                            >
                                ({jury_members.length})
                            </button>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Jury Invitees -->
            <div>
                <label class="label" for="title"
                    ><span class="label-text"
                        >{$_("projects.jury invitees emails")}</span
                    ></label
                >
                <div class="flex flex-col gap-[6px]">
                    {#each jury_invities as member}
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
                                class="btn-outline btn-error btn-square btn cursor-pointer"
                                on:click={() => {
                                    jury_invities = jury_invities.filter(
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
                            bind:value={inviteeEmail}
                            id="email-address"
                            name="email"
                            type="email"
                            autocomplete="email"
                            placeholder={$_("login.Email address")}
                            class="input-bordered input w-full max-w-xs md:w-[320px]"
                        />
                        <div
                            class={jury_invities.length >= membersLimit
                                ? "cursor-not-allowed"
                                : ""}
                            style={jury_invities.length >= membersLimit
                                ? "opacity: 0.25;"
                                : ""}
                        >
                            <button
                                class="btn-outline btn-success btn-square btn {jury_invities.length >=
                                membersLimit
                                    ? 'btn-disabled'
                                    : ' cursor-pointer'}"
                                on:click|preventDefault={() => {
                                    if (jury_invities.includes(inviteeEmail)) {
                                        indicateError(
                                            dispatch,
                                            $_("project.user already added")
                                        );
                                        return;
                                    }
                                    if (inviteeEmail.length != 0) {
                                        jury_invities = [
                                            ...jury_invities,
                                            inviteeEmail,
                                        ];
                                        inviteeEmail = "";
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
                        {#if jury_invities.length != 0}
                            <button
                                class="no-animation btn-square btn cursor-default"
                            >
                                ({jury_invities.length})
                            </button>
                        {/if}
                    </div>
                </div>
            </div>

            <button class="btn" on:click|preventDefault={handleAddingProject}
                >Submit</button
            >
        </form>
    </div>
</div>
