<script>
    import { getProjectByID } from "src/api//project/project";
    import { sidebarLists } from "src/config/sidebarList";
    import ProjectActions from "src/lib/ProjectActions/ProjectActions.svelte";
    import ProjectGeneralInfo from "src/lib/ProjectPage/ProjectGeneralInfo.svelte";
    import ProjectTasks from "src/lib/components/project/ProjectTasks.svelte";
    import Redirect from "src/lib/components/Redirect.svelte";
    import Sidebar from "src/lib/components/layout/Sidebar.svelte";
    import ProjectTaskPage from "src/lib/components/project/ProjectTaskPage.svelte";
    import { _ } from "svelte-i18n";
    import { Route, navigate } from "svelte-navigator";

    export let projectID;

    let project = getProjectByID(projectID);
</script>

<div class="flex h-full w-full flex-1 flex-col gap-8 lg:flex-row">
    <Sidebar sidebarList={sidebarLists.project} />
    {#await project}
        <button class="btn loading">{$_("admin.users.loading")}</button>
    {:then res}
        {#if res.status >= 200 && res.status < 300}
            <!-- main content goes here -->
            <div class="flex flex-col gap-5 capitalize text-xl mt-8 w-full p-2">
                <ProjectActions project={res.data} on:showIndicator />

                <Route>
                    <Redirect path={sidebarLists.project[0].path} />
                </Route>
                {#each sidebarLists.project as listItem}
                    <Route path={listItem.path}>
                        <svelte:component
                            this={listItem.component}
                            data={res.data}
                        />
                    </Route>
                {/each}
                <Route path="tasks/:id" let:params>
                    <ProjectTaskPage
                        taskID={params.id}
                        data={res.data}
                        on:showIndicator
                    />
                </Route>
            </div>
        {:else}
            <p
                class="text-gray-200 text-center text-lg capitalize font-semibold"
            >
                {$_("projects.project unavailable")}
            </p>
        {/if}
    {:catch error}
        <p
            class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
        >
            {error.message}
        </p>
    {/await}
</div>
