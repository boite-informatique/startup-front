<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";
    import { onMount } from "svelte";
    import { userPermissions } from "src/stores/userPermissions";

    export let data: PopulatedProject;
    let statusColor;

    let userIsRs = $userPermissions.some((obj) => obj.name === "rs");

    onMount(() => {
        if (data.Delibration?.status == "refused") {
            statusColor = "text-red-600";
        } else if (data.Delibration?.status == "accepted_with_reservation") {
            statusColor = "text-yellow-600";
        } else {
            statusColor = "text-green-600";
        }
    });
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.soutenance-delibration")}
</div>

{#if data.Delibration}
    <!-- defense delibration -->
    <div class="flex flex-col gap-2 first-letter:capitalize md:flex-row">
        <div class="flex flex-col gap-4">
            <div class="flex flex-row gap-6">
                <div class="w-[260px] font-bold">{$_("projects.status")} :</div>
                <div class={"lowercase first-letter:capitalize " + statusColor}>
                    {data.Delibration.status}
                </div>

                {#if userIsRs}
                    <a
                        href={`http://localhost:3001/projects/${data.id}/delibration/defense-report`}
                        target="_blank"
                        class="btn-sm btn">PV</a
                    >
                {/if}
            </div>
            <div>
                <span class="font-bold">{$_("projects.evaluations")} : </span>
                <div class="mt-2 flex flex-col gap-4">
                    {#each data.Delibration.evaluations as evaluation}
                        <div class="flex flex-row items-center gap-6">
                            <div class="w-[260px]">
                                <UserInfoAvatarName
                                    user={data.members.find(
                                        (x) => x.id == evaluation.member_id
                                    )}
                                />
                            </div>
                            <div class="flex flex-col">
                                <div>
                                    <div
                                        class="inline-block font-bold first-letter:capitalize"
                                    >
                                        {$_("projects.note")} :
                                    </div>
                                    {evaluation.note}
                                </div>
                                <div class="lowercase">
                                    <div
                                        class="m-0 inline-block p-0 font-bold first-letter:capitalize"
                                    >
                                        {$_("projects.appreciation")} :
                                    </div>
                                    <div
                                        class="m-0 inline-block p-0 first-letter:capitalize"
                                    >
                                        {evaluation.appreciation}
                                    </div>
                                </div>
                            </div>
                            {#if userIsRs}
                                <a
                                    href={`http://localhost:3001/projects/${data.id}/delibration/diploma/${evaluation.member_id}`}
                                    target="_blank"
                                    class="btn-sm btn">Diploma</a
                                >
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{:else}
    {$_("projects.no defense delibration for this project")}
{/if}
