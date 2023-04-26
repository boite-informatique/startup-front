<script>
    // importing modules
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { useNavigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";

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

this is projects for teacher or admin
