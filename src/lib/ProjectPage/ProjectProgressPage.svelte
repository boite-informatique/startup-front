<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import Avatar from "../components/Avatar.svelte";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.progress")}
</div>

{#if data.ProjectProgress.length > 0}
    {#each data.ProjectProgress as progress, i}
        <div class="flex flex-col gap-5">
            <div class="flex flex-row items-center gap-5">
                <div>
                    <div class="inline-block w-[210px] font-bold">
                        {$_("projects.percentage")} :
                    </div>
                </div>
                <div
                    class="radial-progress text-primary"
                    style="--value:{progress.percentage}; --size : 3.5rem"
                >
                    {progress.percentage}
                </div>
            </div>
            <div>
                <div class="inline-block w-[240px] font-bold">
                    {$_("projects.note")} :
                </div>
                {data.ProjectProgress[0].note}
            </div>
            <div>
                <div class="inline-block w-[240px] font-bold">
                    {$_("projects.progress update date")} :
                </div>
                {new Date(progress.created_at).toLocaleString("en-UK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: "UTC",
                })}
            </div>
            <div class="flex flex-col items-center gap-5 md:flex-row">
                <div>
                    <div class="inline-block w-[220px] font-bold">
                        {$_("projects.updated by")} :
                    </div>
                </div>
                <UserInfoAvatarName user={progress.user} />
            </div>
        </div>

        {#if i !== data.ProjectProgress.length - 1}
            <div class="divider my-2 w-11/12" />
        {/if}
    {/each}
    <div class="mb-8" />
{:else}
    {$_("projects.no progress for this project")}
{/if}
