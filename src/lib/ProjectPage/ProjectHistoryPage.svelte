<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project's edit history")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.project history")} :
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse w-7/12">
        <div
            class="collapse-title rounded-t-xl bg-black bg-opacity-5 text-xl font-medium dark:bg-white dark:bg-opacity-5"
        >
            {$_("projects.click here to see the project history")}
        </div>
        <div
            class="collapse-content rounded-b-xl bg-black bg-opacity-10 pt-2 dark:bg-white dark:bg-opacity-10"
        >
            {#if data.history}
                <div class="flex flex-col gap-5">
                    {#each data.history as ProjectState}
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
                                class="flex flex-col items-center gap-5 md:flex-row"
                            >
                                <div>
                                    - {$_("projects.modified by")} :
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
                                            {ProjectState.user?.first_name}
                                            {ProjectState.user?.last_name}
                                        </div>
                                        <div
                                            class="text-sm font-medium opacity-90"
                                        >
                                            {ProjectState.user?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {:else}
                        {$_("projects.no history for this project")}
                    {/each}
                </div>
            {:else}
                {$_("projects.no history for this project")}
            {/if}
        </div>
    </div>
</div>
