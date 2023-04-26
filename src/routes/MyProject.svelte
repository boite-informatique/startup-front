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

this is my project for project holder (student)
