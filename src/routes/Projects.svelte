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

    // importing stores
    import { userPermissions } from "../stores/userPermissions";

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

    onMount(() => {
        let userIsAdmin = $userPermissions.some(
            (obj) => obj.name === "canManageAll"
        );
        let userIsTeacher = $userPermissions.some(
            (obj) => obj.name === "isTeacher"
        );

        if (!(userIsAdmin || userIsTeacher)) {
            indicateUnauthorizedToAccessProjects();
            navigate("/");
        }
    });
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Breadcrumb breadcrumbItems={["projects"]} />
    <div
        class="-mb-2 flex flex-col items-start justify-start gap-2 md:flex-row"
    >
        <AddProject on:showIndicator />
    </div>
    <ProjectsTables on:showIndicator />
</div>
