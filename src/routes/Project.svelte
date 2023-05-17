<script>
    import { getProjectByID } from "src/api/project";
    import { _ } from "svelte-i18n";

    export let projectID;
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
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.product")} :
                </div>
                <div>
                    {res.data.product_name}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.brand")} :
                </div>
                <div>
                    {res.data.brand_name}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.type")} :
                </div>
                <div>
                    {res.data.type}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.resume")} :
                </div>
                <div>
                    {res.data.resume}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-72 font-bold">
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
            <div class="flex flex-row">
                <div class="w-72 font-bold">
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
                    {/each}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-72 font-bold">
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
                    {/each}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-72 font-bold">
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
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.validation")} :
                </div>
                <div>
                    {$_(
                        "projects.click here to see the project validation state"
                    )}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.project progess")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        Focus me to see content
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
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.invited users")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        Focus me to see content
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
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.project history")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        Focus me to see content
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
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.defense authorization")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        Focus me to see content
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
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.defense documents")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        Focus me to see content
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
            <div class="flex flex-row">
                <div class="w-72 font-bold">
                    {$_("projects.defense planification")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div
                        class="collapse-title text-xl font-medium bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 rounded-t-xl"
                    >
                        Focus me to see content
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
