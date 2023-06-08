<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";

    export let data: PopulatedProject;

    const unregisteredInvitedJuryMembers =
        data.DefensePlanification?.DefenseInvitees.filter(
            (x) => x.type == "member"
        );
    const unregisteredInvitedJuryInvitees =
        data.DefensePlanification?.DefenseInvitees.filter(
            (x) => x.type == "invite"
        );

    const areThereDefenseInvitees =
        data.DefensePlanification?.jury_invities.length > 0 ||
        unregisteredInvitedJuryInvitees?.length > 0;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.defense plan")}
</div>

{#if data.DefensePlanification}
    <!-- defense authorization -->
    <div class="flex flex-col gap-2 md:flex-row">
        {#if data.DefensePlanification}
            <div class="flex flex-col gap-2">
                <div>
                    <div class="inline-block w-[100px] font-bold">
                        {$_("projects.date")} :
                    </div>
                    {new Date(data.DefensePlanification.date).toLocaleString(
                        "en-UK",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "UTC",
                        }
                    )}
                </div>
                <div>
                    <div class="inline-block w-[100px] font-bold">
                        {$_("projects.location")} :
                    </div>
                    {data.DefensePlanification.location}
                </div>
                <div>
                    <div class="inline-block w-[100px] font-bold">
                        {$_("projects.mode")} :
                    </div>
                    {data.DefensePlanification.mode}
                </div>
                <div>
                    <div class="inline-block w-[100px] font-bold">
                        {$_("projects.nature")} :
                    </div>
                    {data.DefensePlanification.nature}
                </div>
            </div>
        {:else}
            {$_("projects.no defense planification for this project")}
        {/if}
    </div>

    <!-- Jury -->
    <div class="font-bold sm:w-[430px]">
        {$_("projects.defense planification jury")} :
    </div>

    <!-- Jury president -->
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[200px]">
                {$_("projects.jury president")} :
            </div>

            {#if data.DefensePlanification.president}
                <UserInfoAvatarName
                    user={data.DefensePlanification.president}
                />
            {:else}
                <div class="lowercase">
                    {data.DefensePlanification.DefenseInvitees.find(
                        (invitee) => invitee.type == "president"
                    ).email} ({$_("projects.invited")})
                </div>
            {/if}
        </div>
    </div>

    <!-- Jury members -->
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[200px]">
                {$_("projects.jury members")} :
            </div>

            <div class="flex flex-col gap-7">
                {#if data.DefensePlanification.jury_members.length > 0}
                    {#each data.DefensePlanification.jury_members as member}
                        <UserInfoAvatarName user={member} />
                    {/each}
                {/if}

                {#if unregisteredInvitedJuryMembers.length > 0}
                    {#each unregisteredInvitedJuryMembers as memberInvite}
                        <div class="lowercase">
                            {memberInvite.email} ({$_("projects.invited")})
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </div>

    <!-- Jury invitees -->
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[200px]">
                {$_("projects.jury invitees")} :
            </div>
            <div class="flex flex-col gap-7">
                {#if areThereDefenseInvitees}
                    {#if data.DefensePlanification.jury_invities.length > 0}
                        {#each data.DefensePlanification.jury_invities as member}
                            <UserInfoAvatarName user={member} />
                        {/each}
                    {/if}

                    {#if unregisteredInvitedJuryInvitees.length > 0}
                        {#each unregisteredInvitedJuryInvitees as memberInvite}
                            <div class="lowercase">
                                {memberInvite.email} ({$_("projects.invited")})
                            </div>
                        {/each}
                    {/if}
                {:else}
                    <div>
                        {$_("projects.no jury invitees for this project")}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{:else}
    <div>
        {$_("projects.no defense planification")}
    </div>
{/if}
