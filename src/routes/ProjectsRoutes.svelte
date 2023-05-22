<script>
    // importing modules
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { Route, useNavigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";
    import { useLocation } from "svelte-navigator";

    // importing modules
    import Breadcrumb from "src/lib/components/Breadcrumb.svelte";
    import AddProject from "../lib/components/project/AddProject.svelte";
    import ProjectsTables from "src/lib/components/project/ProjectsTables.svelte";

    // importing stores
    import { userPermissions } from "../stores/userPermissions";
    import Project from "src/routes/Project.svelte";
    import { currentUserInfo } from "src/stores/currentUserInfo";
    import ProjectsPage from "./ProjectsPage.svelte";

    const location = useLocation();
    const dispatch = createEventDispatcher();

    const navigate = useNavigate();

    let indicateUnauthorizedToAccessProjects = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_(
                "projects.indicator.You are not authorized to access '/projects' route"
            ),
            indicatorVisible: true,
        });
    };
</script>

<Route path="/" let:location>
    <div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
        <ProjectsPage queryString={location.search} on:showIndicator />
    </div>
</Route>
<Route path="/:id/*" let:params>
    <Project projectID={params.id} on:showIndicator />
</Route>
