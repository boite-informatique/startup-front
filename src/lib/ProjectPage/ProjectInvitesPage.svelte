<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";

    export let data: PopulatedProject;
</script>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="w-[330px] font-bold">
        {$_("projects.invited users")} :
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse w-7/12">
        <div
            class="collapse-title rounded-t-xl bg-black bg-opacity-5 text-xl font-medium dark:bg-white dark:bg-opacity-5"
        >
            {$_("projects.click here to see the invited users")}
        </div>
        <div
            class="collapse-content rounded-b-xl bg-black bg-opacity-10 pt-2 dark:bg-white dark:bg-opacity-10"
        >
            <div class="flex flex-col gap-2" style="text-transform: none;">
                {#each data.ProjectInvitees as invitee}
                    <div>
                        - {invitee.email} ( {invitee.type} )
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
