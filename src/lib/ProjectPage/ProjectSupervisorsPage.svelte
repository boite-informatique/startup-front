<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import Avatar from "../components/Avatar.svelte";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";

    export let data: PopulatedProject;

    const invitedSupervisors = data.ProjectInvitees.filter(
        (invitee) => invitee.type == "supervisor"
    );

    const invitedCoSupervisor = data.ProjectInvitees.filter(
        (invitee) => invitee.type == "co_supervisor"
    );
    const isThereCoSupervisor =
        data.co_supervisor || invitedCoSupervisor.length > 0;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project supervisors")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.supervisors")} :
    </div>
    <div class="flex flex-col gap-7">
        {#if data.supervisors.length > 0}
            {#each data.supervisors as member}
                <UserInfoAvatarName user={member} />
            {/each}
        {/if}

        {#if invitedSupervisors.length > 0}
            {#each invitedSupervisors as memberInvite}
                <div class="lowercase">
                    {memberInvite.email} ({$_("projects.invited")})
                </div>
            {/each}
        {/if}
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.co-supervisor")} :
    </div>
    <div class="flex flex-col gap-7">
        {#if isThereCoSupervisor}
            {#if data.co_supervisor}
                <UserInfoAvatarName user={data.co_supervisor} />
            {:else if invitedCoSupervisor.length > 0}
                <div class="lowercase">
                    {invitedCoSupervisor[0].email} ({$_("projects.invited")})
                </div>
            {/if}
        {:else}
            <div class="lowercase opacity-75 first-letter:capitalize">
                {$_(
                    "projects.there is no co-supervisor for this project currently"
                )}
            </div>
        {/if}
    </div>
</div>
