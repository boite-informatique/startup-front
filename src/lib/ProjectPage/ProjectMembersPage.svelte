<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import Avatar from "../components/Avatar.svelte";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project members")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.members")} :
    </div>
    <div class="flex flex-col gap-7">
        {#if data.members}
            {#each data.members as member}
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <Avatar
                                src={member.avatar}
                                altText={member.first_name}
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
        {:else}
            {$_("projects.there are no members for this project currently")}.
        {/if}
    </div>
</div>
