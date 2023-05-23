<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";

    export let data: PopulatedProject;
</script>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.project progess")} :
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse w-7/12">
        <div
            class="collapse-title rounded-t-xl bg-black bg-opacity-5 text-xl font-medium dark:bg-white dark:bg-opacity-5"
        >
            {$_("projects.click here to see the project progress state")}
        </div>
        <div
            class="collapse-content rounded-b-xl bg-black bg-opacity-10 pt-2 dark:bg-white dark:bg-opacity-10"
        >
            <div class="flex flex-col gap-5">
                <div class="flex flex-row items-center gap-5">
                    <div>
                        - {$_("projects.percentage")} :
                    </div>
                    <div
                        class="radial-progress text-primary"
                        style="--value:{data.ProjectProgress[0]?.percentage};"
                    >
                        {data.ProjectProgress[0]?.percentage}%
                    </div>
                </div>
                <p>
                    - {$_("projects.note")} : {data.ProjectProgress[0]?.note}
                </p>
                <p>
                    - {$_("projects.progress update date")} : {new Date(
                        data.ProjectProgress[0]?.created_at
                    ).toLocaleString("en-UK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "UTC",
                    })}
                </p>
                <div class="flex flex-col items-center gap-5 md:flex-row">
                    <div>
                        - {$_("projects.updated by")} :
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
                                {data.ProjectProgress[0]?.user.first_name}
                                {data.ProjectProgress[0]?.user.last_name}
                            </div>
                            <div class="text-sm font-medium opacity-90">
                                {data.ProjectProgress[0]?.user.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
