<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";

    export let data: PopulatedProject;
</script>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.members")} :
    </div>
    <div class="flex flex-col gap-7">
        {#each data.members as member}
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
