<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";
    import type { ProjectValidationDecision } from "src/api/project/types/validation-types";

    export let data: PopulatedProject;

    let statusColor;

    function getDecisionColor(decision: ProjectValidationDecision): string {
        if (decision == "unfavorable") {
            return "text-red-600";
        } else if (decision == "accepted_with_reservation") {
            return "text-yellow-600";
        } else {
            return "text-green-600";
        }
    }
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project's validations")}
</div>

<div>
    {#if data.validation.length > 0}
        <div class="flex flex-col gap-5">
            {#each data.validation as validation, i}
                <div class="flex flex-col items-center gap-5 md:flex-row">
                    <div>
                        <div class="inline-block min-w-[140px] font-bold">
                            {$_("projects.validator")} :
                        </div>
                    </div>
                    <div>
                        <UserInfoAvatarName user={validation.validator} />
                    </div>
                </div>
                <div>
                    <div class="inline-block w-[160px] font-bold">
                        {$_("projects.decision")} :
                    </div>
                    <span class={getDecisionColor(validation.decision)}>
                        {$_(`projects.${validation.decision}`)}
                    </span>
                </div>
                {#if validation?.reservation}
                    <div>
                        <div class="inline-block w-[160px] font-bold">
                            {$_("projects.reservation")} :
                        </div>
                        {$_(`projects.${validation.reservation}`)}
                    </div>
                {/if}
                <div>
                    <div class="inline-block w-[160px] font-bold">
                        {$_("projects.note")} :
                    </div>
                    {validation.note}
                </div>
                <div>
                    <div class="inline-block w-[160px] font-bold">
                        {$_("projects.decision date")} :
                    </div>
                    {new Date(validation?.created_at).toLocaleString("en-UK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "UTC",
                    })}
                </div>
                {#if i !== data.validation.length - 1}
                    <div class="divider my-2 w-11/12" />
                {/if}
            {/each}
            <div class="mb-8" />
        </div>
    {:else}
        {$_("projects.no validations")}
    {/if}
</div>
