<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import Avatar from "../components/Avatar.svelte";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";

    export let data: PopulatedProject;

    const invitedMembers = data.ProjectInvitees.filter(
        (invitee) => invitee.type == "member"
    );
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project members")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="font-bold sm:w-[330px]">
            {$_("projects.members")} :
        </div>
        <div class="flex flex-col gap-7">
            {#if data.members.length > 0}
                {#each data.members as member}
                    <UserInfoAvatarName user={member} />
                {/each}
            {/if}

            {#if invitedMembers.length > 0}
                {#each invitedMembers as memberInvite}
                    <div class="lowercase">
                        {memberInvite.email} ({$_("projects.invited")})
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>
