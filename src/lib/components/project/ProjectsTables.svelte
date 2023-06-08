<script>
    import { createEventDispatcher } from "svelte";
    import { getProjects } from "src/api/project/project";
    import { _ } from "svelte-i18n";
    import ProjectResumeModal from "./ProjectResumeModal.svelte";
    import ProjectValidationModal from "./ProjectValidationModal.svelte";
    import ProjectMembersModal from "./ProjectMembersModal.svelte";
    import ProjectSupervisorsModal from "./ProjectSupervisorsModal.svelte";
    import { navigate } from "svelte-navigator";

    const dispatch = createEventDispatcher();

    let projectResumeModalState = false;
    let projectResumeModalData = "";
    let projectValidationModalState = false;
    let projectValidationModalData = {};
    let projectMembersModalState = false;
    let projectSupervisorsModalState = false;
    let projectMembersModalData = [];
    let projectSupervisorsModalData = [];
    export let projects = [];
</script>

<div class="h-[400px] w-full overflow-x-auto rounded-lg scrollbar-hide">
    <table class="table w-full">
        <!-- head -->
        <thead>
            <tr class="sticky top-0 z-10 bg-opacity-100 backdrop-blur-md">
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("projects.product")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("projects.brand")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("projects.type")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("projects.resume")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("projects.owner")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("projects.created at")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("projects.validation")}</th
                >
            </tr>
        </thead>
        <tbody>
            {#if projects.length > 0}
                {#each projects as project}
                    <tr>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td
                            class="cursor-pointer select-none bg-gray-200 font-semibold text-gray-800 transition-all hover:bg-gray-800 hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40"
                            on:click={() => navigate(`/projects/${project.id}`)}
                            >{project.product_name}</td
                        >
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >{project.brand_name}</td
                        >
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >{project.type}</td
                        >
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td
                            on:click={() => {
                                projectResumeModalState = true;
                                projectResumeModalData = project.resume;
                            }}
                            class="cursor-pointer select-none bg-gray-200 font-semibold text-gray-800 transition-all hover:bg-gray-800 hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40"
                            >{project.resume.split(" ").slice(0, 2).join(" ")}
                            <br />
                            {project.resume.split(" ").slice(2, 3).join(" ")} ...<span
                                class="underline opacity-60"
                                >{$_("projects.show more")}</span
                            ></td
                        >
                        <td
                            class="flex-col items-start justify-start bg-gray-200 text-base font-semibold capitalize text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                        >
                            <div class="-mb-1">
                                {project.owner.first_name}
                                {project.owner.last_name}
                            </div>
                            <div
                                class="-mt-1 font-normal opacity-90"
                                style="text-transform: none;"
                            >
                                {project.owner.email}
                            </div>
                        </td>
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                        >
                            {new Date(project.created_at).toLocaleString(
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
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                        >
                            {#if project.validation.length > 0}
                                {$_(
                                    "projects." + project.validation[0].decision
                                )}
                            {:else}
                                {$_("projects.none")}
                            {/if}
                        </td>
                    </tr>
                {/each}
            {:else}
                <p
                    class="text-center text-lg font-semibold capitalize text-gray-800 dark:text-gray-200"
                >
                    {$_("projects.no projects available")}
                </p>
            {/if}
        </tbody>
    </table>
</div>

<ProjectResumeModal {projectResumeModalData} bind:projectResumeModalState />
<ProjectMembersModal {projectMembersModalData} bind:projectMembersModalState />
<ProjectSupervisorsModal
    {projectSupervisorsModalData}
    bind:projectSupervisorsModalState
/>
<ProjectValidationModal
    {projectValidationModalData}
    bind:projectValidationModalState
/>
