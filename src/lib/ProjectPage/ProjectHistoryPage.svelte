<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import ImageModal from "../components/ImageModal.svelte";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.project's edit history")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.project history")} :
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    {#if data.history.length > 0}
        <div class="flex flex-col gap-5">
            {#each data.history as ProjectState}
                <div class="flex flex-col gap-2">
                    <div>
                        <span class="font-bold"
                            >{$_("projects.modified field")} :
                        </span>
                        {ProjectState.field}
                    </div>
                    <div>
                        <span class="font-bold"
                            >{$_("projects.changed at")} :
                        </span>
                        {new Date(ProjectState.changed_at).toLocaleString(
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
                    <div class="flex items-center">
                        <span class="font-bold"
                            >{$_("projects.old value")} :
                        </span>
                        {#if ProjectState.field === "logo"}
                            <span class="ml-4"
                                ><ImageModal
                                    src={ProjectState.old_value}
                                /></span
                            >
                        {:else}
                            {ProjectState.old_value}
                        {/if}
                    </div>
                    <div class="flex items-center">
                        <span class="font-bold"
                            >{$_("projects.new value")} :
                        </span>
                        {#if ProjectState.field === "logo"}
                            <span class="ml-4"
                                ><ImageModal
                                    src={ProjectState.new_value}
                                /></span
                            >
                        {:else}
                            {ProjectState.new_value}
                        {/if}
                    </div>
                    <div class="divider" />
                </div>
            {:else}
                {$_("projects.no history for this project")}
            {/each}
        </div>
    {:else}
        {$_("projects.no history for this project")}
    {/if}
</div>
