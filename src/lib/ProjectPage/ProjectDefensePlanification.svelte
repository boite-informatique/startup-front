<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import Avatar from "../components/Avatar.svelte";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.planification")}
</div>

<!-- defense authorization -->
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.defense planification")} :
    </div>
    {#if data.DefensePlanification}
        <div class="flex flex-col gap-2">
            <div>
                - {$_("projects.jury president")} : {data.DefensePlanification
                    .jury_president}
            </div>
            <div>
                - {$_("projects.date")} : {new Date(
                    data.DefensePlanification.date
                ).toLocaleString("en-UK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: "UTC",
                })}
            </div>
            <div>
                - {$_("projects.establishment")} : {data.DefensePlanification
                    .establishement_id}
            </div>
            <div>
                - {$_("projects.mode")} : {data.DefensePlanification.mode}
            </div>
            <div>
                - {$_("projects.nature")} : {data.DefensePlanification.nature}
            </div>
        </div>
    {:else}
        {$_("projects.no defense planification for this project")}
    {/if}
</div>
