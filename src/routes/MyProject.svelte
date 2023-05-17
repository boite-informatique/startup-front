<script>
    // importing modules
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { useNavigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";

    // importing modules
    import Breadcrumb from "../lib/Breadcrumb.svelte";
    import AddProject from "../lib/AddProject.svelte";
    import ProjectsTables from "../lib/ProjectsTables.svelte";
    import { getProjects } from "../api/project";

    // importing stores
    import { userPermissions } from "../stores/userPermissions";
    import { currentUserInfo } from "src/stores/currentUserInfo";

    const dispatch = createEventDispatcher();

    const navigate = useNavigate();

    let indicateUnauthorizedToAccessMyProjects = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_(
                "projects.indicator.You are not authorized to access '/my projects' route"
            ),
            indicatorVisible: true,
        });
    };

    onMount(() => {
        let userIsStudent = $currentUserInfo.type == "student";

        if (!userIsStudent) {
            indicateUnauthorizedToAccessMyProjects();
            navigate("/");
        }
    });

    const projects = getProjects();
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Breadcrumb breadcrumbItems={["my project"]} />
    <div
        class="-mb-2 flex flex-col items-start justify-start gap-2 md:flex-row"
    >
        {#await projects then res}
            {#if !res}
                <AddProject />
            {/if}
        {/await}
        <!-- added the previous #await and #if blocks to check if user has an existing project, if he does then the "add project" button should not appear -->
        <!-- this is still inefficient because it requests a lot of data from the api just to verify whether the array is empty or not, this will be refactored later -->
    </div>
    <ProjectsTables on:showIndicator />
</div>
