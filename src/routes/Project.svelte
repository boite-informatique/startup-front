<script>
    import { getProjectByID } from "src/api/project";
    import ProjectResumeModal from "src/lib/ProjectResumeModal.svelte";
    import { _ } from "svelte-i18n";

    export let projectID;

    let projectResumeModalState = false;
    let projectResumeModalData = "";

    let project = getProjectByID(projectID);
</script>

{#await project}
    <button class="btn loading">{$_("admin.users.loading")}</button>
{:then res}
    {#if res.status >= 200 && res.status < 300}
        <!-- main content goes here -->
        <div
            class="flex flex-col gap-5 capitalize text-xl text-gray-800 dark:text-gray-200"
        >
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.product")} :
                </div>
                <div>
                    {res.data.product_name}
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.brand")} :
                </div>
                <div>
                    {res.data.brand_name}
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.type")} :
                </div>
                <div>
                    {res.data.type}
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.resume")} :
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    on:click={() => {
                        projectResumeModalState = true;
                        projectResumeModalData = res.data.resume;
                    }}
                    class="cursor-pointer select-none"
                >
                    {res.data.resume.split(" ").slice(0, 8).join(" ")}
                    {res.data.resume.split(" ").slice(8, 9).join(" ")} ...<span
                        class="opacity-60 underline"
                        >{$_("projects.show more")}</span
                    >
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.owner")} :
                </div>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img
                                src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                alt="Avatar of a user"
                            />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">
                            {res.data.owner.first_name}
                            {res.data.owner.last_name}
                        </div>
                        <div class="text-sm font-medium opacity-90">
                            {res.data.owner.email}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.members")} :
                </div>
                <div class="flex flex-col md:flex-row gap-7">
                    {#each res.data.members as member}
                        <div class="flex items-center space-x-3">
                            <div class="avatar">
                                <div class="mask mask-squircle h-12 w-12">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                        alt="Avatar of a user"
                                    />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">
                                    {member.first_name}
                                    {member.last_name}
                                </div>
                                <div class="text-sm font-medium opacity-90">
                                    {member.email}
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="opacity-75">
                            {$_(
                                "projects.there are no members for this project currently"
                            )}.
                        </div>
                    {/each}
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.supervisors")} :
                </div>
                <div class="flex flex-col md:flex-row gap-7">
                    {#each res.data.supervisors as supervisor}
                        <div class="flex items-center space-x-3">
                            <div class="avatar">
                                <div class="mask mask-squircle h-12 w-12">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                        alt="Avatar of a user"
                                    />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">
                                    {supervisor.first_name}
                                    {supervisor.last_name}
                                </div>
                                <div class="text-sm font-medium opacity-90">
                                    {supervisor.email}
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="opacity-75">
                            {$_(
                                "projects.there are no supervisors for this project currently"
                            )}.
                        </div>
                    {/each}
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.created at")} :
                </div>
                <div>
                    {new Date(res.data.created_at).toLocaleString("en-UK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "UTC",
                    })}
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.validation")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse w-7/12">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        {$_(
                            "projects.click here to see the project validation state"
                        )}
                    </div>
                    <div
                        class="collapse-content bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-b-xl pt-2"
                    >
                        <div class="flex flex-col gap-5">
                            <p>
                                - {$_("projects.decision")} : {$_(
                                    `projects.${res.data.validation[0].decision}`
                                )}
                            </p>
                            {#if res.data.validation[0].reservation}
                                <p>
                                    - {$_("projects.reservation")} : {$_(
                                        `projects.${res.data.validation[0].reservation}`
                                    )}
                                </p>
                            {/if}
                            <p>
                                - {$_("projects.decision date")} : {new Date(
                                    res.data.validation[0].created_at
                                ).toLocaleString("en-UK", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    timeZone: "UTC",
                                })}
                            </p>
                            <p>
                                - {$_("projects.note")} : {res.data
                                    .validation[0].note}
                            </p>
                            <div
                                class="flex flex-col md:flex-row gap-5 items-center"
                            >
                                <div>
                                    - {$_("projects.validator")} :
                                </div>
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
                                            {res.data.validation[0].validator
                                                .first_name}
                                            {res.data.validation[0].validator
                                                .last_name}
                                        </div>
                                        <div
                                            class="text-sm font-medium opacity-90"
                                        >
                                            {res.data.validation[0].validator
                                                .email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.project progess")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse w-7/12">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        {$_(
                            "projects.click here to see the project progress state"
                        )}
                    </div>
                    <div
                        class="collapse-content bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-b-xl pt-2"
                    >
                        <div class="flex flex-col gap-5">
                            <div class="flex flex-row gap-5 items-center">
                                <div>
                                    - {$_("projects.percentage")} :
                                </div>
                                <div
                                    class="radial-progress text-primary"
                                    style="--value:{res.data.ProjectProgress[0]
                                        .percentage};"
                                >
                                    {res.data.ProjectProgress[0].percentage}%
                                </div>
                            </div>
                            <p>
                                - {$_("projects.note")} : {res.data
                                    .ProjectProgress[0].note}
                            </p>
                            <p>
                                - {$_("projects.progress update date")} : {new Date(
                                    res.data.ProjectProgress[0].created_at
                                ).toLocaleString("en-UK", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    timeZone: "UTC",
                                })}
                            </p>
                            <div
                                class="flex flex-col md:flex-row gap-5 items-center"
                            >
                                <div>
                                    - {$_("projects.updated by")} :
                                </div>
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
                                            {res.data.ProjectProgress[0].user
                                                .first_name}
                                            {res.data.ProjectProgress[0].user
                                                .last_name}
                                        </div>
                                        <div
                                            class="text-sm font-medium opacity-90"
                                        >
                                            {res.data.ProjectProgress[0].user
                                                .email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.invited users")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse w-7/12">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        {$_("projects.click here to see the invited users")}
                    </div>
                    <div
                        class="collapse-content bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-b-xl pt-2"
                    >
                        <div
                            class="flex flex-col gap-2"
                            style="text-transform: none;"
                        >
                            {#each res.data.ProjectInvitees as invitee}
                                <div>- {invitee.email} ( {invitee.type} )</div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.project history")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse w-7/12">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        {$_("projects.click here to see the project history")}
                    </div>
                    <div
                        class="collapse-content bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-b-xl pt-2"
                    >
                        <div class="flex flex-col gap-5">
                            {#each res.data.history as ProjectState}
                                <div class="flex flex-col gap-2">
                                    <div>
                                        - {$_("projects.modified field")} : {ProjectState.field}
                                    </div>
                                    <div>
                                        - {$_("projects.changed at")} : {new Date(
                                            ProjectState.changed_at
                                        ).toLocaleString("en-UK", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            timeZone: "UTC",
                                        })}
                                    </div>
                                    <div>
                                        - {$_("projects.old value")} : {ProjectState.old_value}
                                    </div>
                                    <div>
                                        - {$_("projects.new value")} : {ProjectState.new_value}
                                    </div>
                                    <div
                                        class="flex flex-col md:flex-row gap-5 items-center"
                                    >
                                        <div>
                                            - {$_("projects.modified by")} :
                                        </div>
                                        <div
                                            class="flex items-center space-x-3"
                                        >
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
                                                    {ProjectState.user
                                                        .first_name}
                                                    {ProjectState.user
                                                        .last_name}
                                                </div>
                                                <div
                                                    class="text-sm font-medium opacity-90"
                                                >
                                                    {ProjectState.user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {:else}
                                {$_("projects.no history for this project")}
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.defense authorization")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse w-7/12">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        {$_(
                            "projects.click here to see the defense authorization"
                        )}
                    </div>
                    <div
                        class="collapse-content bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-b-xl pt-2"
                    >
                        {#if res.data.DefenseAuthorization}
                            <div class="flex flex-col gap-2">
                                <div>
                                    - {$_("projects.supervisor")} : {res.data
                                        .DefenseAuthorization.supervisor_id}
                                </div>
                                <div class="flex flex-row gap-1">
                                    <div>
                                        - {$_(
                                            "projects.defense authorization file"
                                        )} :
                                    </div>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <div
                                        on:click={() => {
                                            window.location.href = `${res.data.DefenseAuthorization.uploadedFile}`;
                                        }}
                                        class="underline cursor-pointer opacity-75 hover:opacity-100"
                                    >
                                        {$_("projects.click here")}
                                    </div>
                                </div>
                            </div>
                        {:else}
                            {$_(
                                "projects.no defense authorization for this project"
                            )}
                        {/if}
                    </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.defense documents")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse w-7/12">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        {$_("projects.click here to see the defense documents")}
                    </div>
                    <div
                        class="collapse-content bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-b-xl pt-2"
                    >
                        <p class="-mb-1 mt-1">
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <div class="w-[330px] font-bold">
                    {$_("projects.defense planification")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse w-7/12">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        {$_(
                            "projects.click here to see the defense planification"
                        )}
                    </div>
                    <div
                        class="collapse-content bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-b-xl pt-2"
                    >
                        {#if res.data.DefensePlanification}
                            <div class="flex flex-col gap-2">
                                <div>
                                    - {$_("projects.jury president")} : {res
                                        .data.DefensePlanification
                                        .jury_president}
                                </div>
                                <div>
                                    - {$_("projects.date")} : {new Date(
                                        res.data.DefensePlanification.date
                                    ).toLocaleString("en-UK", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        timeZone: "UTC",
                                    })}
                                </div>
                                <div>
                                    - {$_("projects.establishment")} : {res.data
                                        .DefensePlanification.establishement_id}
                                </div>
                                <div>
                                    - {$_("projects.mode")} : {res.data
                                        .DefensePlanification.mode}
                                </div>
                                <div>
                                    - {$_("projects.nature")} : {res.data
                                        .DefensePlanification.nature}
                                </div>
                            </div>
                        {:else}
                            {$_(
                                "projects.no defense planification for this project"
                            )}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <p class="text-gray-200 text-center text-lg capitalize font-semibold">
            {$_("projects.project unavailable")}
        </p>
    {/if}
{:catch error}
    <p
        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
    >
        {error.message}
    </p>
{/await}

<ProjectResumeModal {projectResumeModalData} bind:projectResumeModalState />
