<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";

    export let data: PopulatedProject;
</script>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.defense authorization")} :
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse w-7/12">
        <div
            class="collapse-title rounded-t-xl bg-black bg-opacity-5 text-xl font-medium dark:bg-white dark:bg-opacity-5"
        >
            {$_("projects.click here to see the defense authorization")}
        </div>
        <div
            class="collapse-content rounded-b-xl bg-black bg-opacity-10 pt-2 dark:bg-white dark:bg-opacity-10"
        >
            {#if data.DefenseAuthorization}
                <div class="flex flex-col gap-2">
                    <div>
                        - {$_("projects.supervisor")} : {data
                            .DefenseAuthorization.supervisor_id}
                    </div>
                    <div class="flex flex-row gap-1">
                        <div>
                            - {$_("projects.defense authorization file")} :
                        </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            on:click={() => {
                                window.location.href = `${data.DefenseAuthorization.uploadedFile}`;
                            }}
                            class="cursor-pointer underline opacity-75 hover:opacity-100"
                        >
                            {$_("projects.click here")}
                        </div>
                    </div>
                </div>
            {:else}
                {$_("projects.no defense authorization for this project")}
            {/if}
        </div>
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.defense documents")} :
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse w-7/12">
        <div
            class="collapse-title rounded-t-xl bg-black bg-opacity-5 text-xl font-medium dark:bg-white dark:bg-opacity-5"
        >
            {$_("projects.click here to see the defense documents")}
        </div>
        <div
            class="collapse-content rounded-b-xl bg-black bg-opacity-10 pt-2 dark:bg-white dark:bg-opacity-10"
        >
            <p class="-mb-1 mt-1">
                {#if data.DefenseDocument}
                    <a
                        href={`http://localhost:3001/upload/${data.DefenseDocument.bmc}`}
                        >BMC</a
                    >
                    <a
                        href={`http://localhost:3001/upload/${data.DefenseDocument.memoire}`}
                        >Memoire</a
                    >
                    <a
                        href={`http://localhost:3001/upload/${data.DefenseDocument.label}`}
                        >Label</a
                    >
                {:else}
                    There is no defense document
                {/if}
            </p>
        </div>
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.defense planification")} :
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse w-7/12">
        <div
            class="collapse-title rounded-t-xl bg-black bg-opacity-5 text-xl font-medium dark:bg-white dark:bg-opacity-5"
        >
            {$_("projects.click here to see the defense planification")}
        </div>
        <div
            class="collapse-content rounded-b-xl bg-black bg-opacity-10 pt-2 dark:bg-white dark:bg-opacity-10"
        >
            {#if data.DefensePlanification}
                <div class="flex flex-col gap-2">
                    <div>
                        - {$_("projects.jury president")} : {data
                            .DefensePlanification.jury_president}
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
                        - {$_("projects.establishment")} : {data
                            .DefensePlanification.establishement_id}
                    </div>
                    <div>
                        - {$_("projects.mode")} : {data.DefensePlanification
                            .mode}
                    </div>
                    <div>
                        - {$_("projects.nature")} : {data.DefensePlanification
                            .nature}
                    </div>
                </div>
            {:else}
                {$_("projects.no defense planification for this project")}
            {/if}
        </div>
    </div>
</div>
