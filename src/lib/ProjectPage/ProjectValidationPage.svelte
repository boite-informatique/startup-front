<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";

    export let data: PopulatedProject;
</script>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="w-[330px] font-bold">
        {$_("projects.validation")} :
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse w-7/12">
        <div
            class="collapse-title rounded-t-xl bg-black bg-opacity-5 text-xl font-medium dark:bg-white dark:bg-opacity-5"
        >
            {$_("projects.click here to see the project validation state")}
        </div>
        <div
            class="collapse-content rounded-b-xl bg-black bg-opacity-10 pt-2 dark:bg-white dark:bg-opacity-10"
        >
            <div class="flex flex-col gap-5">
                <p>
                    - {$_("projects.decision")} : {$_(
                        `projects.${data?.validation[0]?.decision}`
                    )}
                </p>
                {#if data.validation[0]?.reservation}
                    <p>
                        - {$_("projects.reservation")} : {$_(
                            `projects.${data.validation[0]?.reservation}`
                        )}
                    </p>
                {/if}
                <p>
                    - {$_("projects.decision date")} : {new Date(
                        data.validation[0]?.created_at
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
                    - {$_("projects.note")} : {data.validation[0]?.note}
                </p>
                <div class="flex flex-col items-center gap-5 md:flex-row">
                    <div>
                        - {$_("projects.validator")} :
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
                                {data.validation[0]?.validator.first_name}
                                {data.validation[0]?.validator.last_name}
                            </div>
                            <div class="text-sm font-medium opacity-90">
                                {data.validation[0]?.validator.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
