<!-- this component will be just redirecting to the first route in routesList since we don't have a home page so far -->
<script>
    import { onMount } from "svelte";
    import { useNavigate } from "svelte-navigator";
    import { userPermissions } from "../stores/userPermissions";
    import routes from "../config/routesList";

    const navigate = useNavigate();

    let userIsAdmin = $userPermissions.some(
        (obj) => obj.name === "canManageAll"
    );

    let userIsStudent = $userPermissions.some(
        (obj) => obj.name === "isStudent" // later change this permission name 'isStudent' to the name of permission in the store that only students have
    );

    let userIsTeacher = $userPermissions.some(
        (obj) => obj.name === "isTeacher" // later change this permission name 'isTeacher' to the name of permission in the store that only teachers have
    );

    let routesList;
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
