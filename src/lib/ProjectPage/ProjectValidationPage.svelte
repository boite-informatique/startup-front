<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project's validations")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.project history")} :
    </div>
    {#if data.validation.length > 0}
        <div class="flex flex-col gap-5">
            {#each data.validation as validation}
                <div class="flex flex-col items-center gap-5 md:flex-row">
                    <div>
                        <span class="font-bold"
                            >{$_("projects.validator")} :
                        </span>
                    </div>
                    <UserInfoAvatarName user={validation.validator} />
                </div>
                <p>
                    <span class="font-bold"
                        >{$_("projects.decision")} :
                    </span>{$_(`projects.${data?.validation[0]?.decision}`)}
                </p>
                {#if validation?.reservation}
                    <p>
                        <span class="font-bold"
                            >{$_("projects.reservation")} :
                        </span>{$_(`projects.${validation?.reservation}`)}
                    </p>
                {/if}
                <p>
                    <span class="font-bold">{$_("projects.note")} : </span>{data
                        .validation[0]?.note}
                </p>
                <p>
                    <span class="font-bold"
                        >{$_("projects.decision date")} :
                    </span>{new Date(validation?.created_at).toLocaleString(
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
                </p>
                <div class="divider" />
            {/each}
        </div>
    {/if}
</div>
