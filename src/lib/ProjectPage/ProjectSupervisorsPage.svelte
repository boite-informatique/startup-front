<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project supervisors")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.supervisors")} :
    </div>
    <div class="flex flex-col gap-7">
        {#if data.supervisors}
            {#each data.supervisors as supervisor}
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
        {:else}
            {$_(
                "projects.there are no supervisors for this project currently"
            )}.
        {/if}
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.co-supervisor")} :
    </div>
    <div class="flex flex-col gap-7">
        {#if data.co_supervisor}
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
                        {data.co_supervisor.first_name}
                        {data.co_supervisor.last_name}
                    </div>
                    <div class="text-sm font-medium opacity-90">
                        {data.co_supervisor.email}
                    </div>
                </div>
            </div>
        {:else}
            <div class="opacity-75">
                {$_(
                    "projects.there is no co-supervisor for this project currently"
                )}.
            </div>
        {/if}
    </div>
</div>
