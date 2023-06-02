<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import Avatar from "../components/Avatar.svelte";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.progress")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.project progess")} :
    </div>

    {#if data.ProjectProgress[0]}
        <div class="flex flex-col gap-5">
            <div class="flex flex-row items-center gap-5">
                <div>
                    <span class="font-bold">{$_("projects.percentage")} :</span>
                </div>
                <div
                    class="radial-progress text-primary"
                    style="--value:{data.ProjectProgress[0]
                        .percentage}; --size : 3.5rem"
                >
                    {data.ProjectProgress[0].percentage}%
                </div>
            </div>
            <p>
                <span class="font-bold">{$_("projects.note")} : </span>{data
                    .ProjectProgress[0].note}
            </p>
            <p>
                <span class="font-bold"
                    >{$_("projects.progress update date")} :
                </span>{new Date(
                    data.ProjectProgress[0].created_at
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
                    <span class="font-bold"
                        >{$_("projects.updated by")} :
                    </span>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <Avatar
                                src={data.ProjectProgress[0].user.avatar}
                                altText={data.ProjectProgress[0].user
                                    .first_name}
                            />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">
                            {data.ProjectProgress[0].user.first_name}
                            {data.ProjectProgress[0].user.last_name}
                        </div>
                        <div class="text-sm font-medium opacity-90">
                            {data.ProjectProgress[0].user.email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        {$_("projects.no progress for this project")}
    {/if}
</div>
