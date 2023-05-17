<!-- this component will be just redirecting to the first route in routesList since we don't have a home page so far -->
<script>
    import { onMount } from "svelte";
    import { useNavigate } from "svelte-navigator";
    import { userPermissions } from "../stores/userPermissions";
    import routes from "../config/routesList";
    import { currentUserInfo } from "src/stores/currentUserInfo";

    const navigate = useNavigate();

    let userIsAdmin = $userPermissions.some(
        (obj) => obj.name === "canManageAll"
    );

    let userIsStudent = $currentUserInfo.type == "student";

    let userIsTeacher = $currentUserInfo.type == "teacher";

    let routesList = [];
    if (userIsAdmin) {
        routesList = routes.admin;
    } else if (userIsTeacher) {
        routesList = routes.teacher;
    } else if (userIsStudent) {
        routesList = routes.student;
    }

    onMount(() => {
        navigate(routesList[0].path);
    });
</script>
