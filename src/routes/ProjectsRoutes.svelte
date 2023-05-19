<script>
    // importing modules
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { Route, useNavigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";
    import { useLocation } from "svelte-navigator";

    // importing modules
    import Breadcrumb from "../lib/Breadcrumb.svelte";
    import AddProject from "../lib/AddProject.svelte";
    import ProjectsTables from "../lib/ProjectsTables.svelte";

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

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Route path="/" let:location>
        <ProjectsPage queryString={location.search} />
    </Route>

    <Route path="/:id" let:params>
        <Project projectID={params.id} on:showIndicator />
    </Route>
</div>
