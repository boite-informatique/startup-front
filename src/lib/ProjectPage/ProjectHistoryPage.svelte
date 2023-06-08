<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import ImageModal from "../components/ImageModal.svelte";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project's edit history")}
</div>

<div>
    {#if data.history.length > 0}
        <div class="flex flex-col gap-5">
            {#each data.history as ProjectState, i}
                <div class="flex flex-col gap-2">
                    <div>
                        <div class="inline-block w-[160px] font-bold">
                            {$_("projects.modified field")} :
                        </div>
                        {ProjectState.field}
                    </div>
                    <div>
                        <div class="inline-block w-[160px] font-bold">
                            {$_("projects.changed at")} :
                        </div>
                        {new Date(ProjectState.changed_at).toLocaleString(
                            "en-UK",
                            {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                timeZone: "UTC",
                            }
                        )}
                    </div>
                    <div class="flex items-center">
                        <div class="inline-block w-[160px] font-bold">
                            {$_("projects.old value")} :
                        </div>
                        {#if ProjectState.field === "logo"}
                            <span
                                ><ImageModal
                                    src={ProjectState.old_value}
                                /></span
                            >
                        {:else}
                            {ProjectState.old_value}
                        {/if}
                    </div>
                </div>
                {#if i !== data.history.length - 1}
                    <div class="divider my-2 w-11/12" />
                {/if}
            {/each}
            <div class="mb-8" />
        </div>
    {:else}
        {$_("projects.no history for this project")}
    {/if}
</div>
