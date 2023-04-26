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
        let userIsStudent = $userPermissions.some(
            (obj) => obj.name === "isStudent"
        );

        if (!userIsStudent) {
            indicateUnauthorizedToAccessMyProjects();
            navigate("/");
        }
    });
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Breadcrumb breadcrumbItems={["my project"]} />
    <div
        class="-mb-2 flex flex-col items-start justify-start gap-2 md:flex-row"
    >
        <AddProject />
    </div>
    <ProjectsTables on:showIndicator />
</div>
