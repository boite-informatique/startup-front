<script>
    import { createEventDispatcher } from "svelte";
    import { getProjects } from "../api/project";
    import { _ } from "svelte-i18n";
    import ProjectResumeModal from "./ProjectResumeModal.svelte";
    import ProjectValidationModal from "./ProjectValidationModal.svelte";
    import ProjectMembersModal from "./ProjectMembersModal.svelte";
    import ProjectSupervisorsModal from "./ProjectSupervisorsModal.svelte";

    const dispatch = createEventDispatcher();

    let projectResumeModalState = false;
    let projectResumeModalData = "";
    let projectValidationModalState = false;
    let projectValidationModalData = {};
    let projectMembersModalState = false;
    let projectSupervisorsModalState = false;
    let projectMembersModalData = [];
    let projectSupervisorsModalData = [];

    $: projects = getProjects();
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
                    >{$_("projects.members")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("projects.supervisors")}</th
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
            {#await projects}
                <button class="btn loading">{$_("admin.users.loading")}</button>
            {:then res}
                {#if res.status >= 200 && res.status < 300}
                    {#each res.data as project}
                        <tr>
                            <td
                                class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200 font-bold"
                                >{project.product_name}</td
                            >
                            <td
                                class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200 font-bold"
                                >{project.brand_name}</td
                            >
                            <td
                                class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200 font-bold"
                                >{project.type}</td
                            >
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <td
                                on:click={() => {
                                    projectResumeModalState = true;
                                    projectResumeModalData = project.resume;
                                }}
                                class="cursor-pointer bg-gray-200 text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800 select-none font-semibold"
                                >{project.resume
                                    .split(" ")
                                    .slice(0, 2)
                                    .join(" ")}
                                <br />
                                {project.resume
                                    .split(" ")
                                    .slice(2, 3)
                                    .join(" ")} ...<span
                                    class="opacity-60 underline">show more</span
                                ></td
                            >
                            <td
                                class="text-base font-semibold capitalize flex-col justify-start items-start bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >
                                <div class="-mb-1">
                                    {project.owner.first_name}
                                    {project.owner.last_name}
                                </div>
                                <div
                                    class="font-normal opacity-90 -mt-1"
                                    style="text-transform: none;"
                                >
                                    {project.owner.email}
                                </div>
                            </td>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <td
                                on:click={() => {
                                    projectMembersModalState = true;
                                    projectMembersModalData = project.members;
                                }}
                                class="cursor-pointer bg-gray-200 text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800 select-none font-semibold"
                                >{project.members.length}
                                {$_("projects.members")}</td
                            >
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <td
                                on:click={() => {
                                    projectSupervisorsModalState = true;
                                    projectSupervisorsModalData =
                                        project.supervisors;
                                }}
                                class="cursor-pointer bg-gray-200 text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800 select-none font-semibold"
                                >{project.supervisors.length}
                                {$_("projects.supervisors")}</td
                            >
                            <td
                                class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200 font-bold"
                            >
                                {project.created_at.split("T")[0]}
                            </td>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <td
                                on:click={() => {
                                    projectValidationModalState = true;
                                    projectValidationModalData =
                                        project.validation;
                                }}
                                class="cursor-pointer bg-gray-200 text-gray-800 transition-all hover:bg-opacity-10 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40 hover:bg-gray-800 select-none font-semibold"
                                >{project.validation.decision}</td
                            >
                        </tr>
                    {:else}
                        <p
                            class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("projects.no projects available")}
                        </p>
                    {/each}
                {:else}
                    <p
                        class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                    >
                        {$_("projects.no projects available")}
                    </p>
                {/if}
            {:catch error}
                <p
                    class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
                >
                    {error.message}
                </p>
            {/await}
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
