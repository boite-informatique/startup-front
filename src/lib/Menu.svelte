<script>
    import { Link } from "svelte-navigator";
    import { userPermissions } from "../stores/userPermissions";
    import routes from "../config/routesList";
    import { _ } from "svelte-i18n";
    import { currentUserInfo } from "src/stores/currentUserInfo";

    export let menu;

    let userIsAdmin = $userPermissions.some(
        (obj) => obj.name === "canManageAll"
    );

    let userIsStudent = $currentUserInfo.type == "student";

    let userIsTeacher = $currentUserInfo.type == "teacher";

    let routesList;
    if (userIsAdmin) {
        routesList = routes.admin;
    } else if (userIsTeacher) {
        routesList = routes.teacher;
    } else if (userIsStudent) {
        routesList = routes.student;
    } else {
        routesList = routes.guest;
    }
</script>

<div
    class="fixed top-24 z-40 flex flex-col gap-3 rounded-r-lg bg-black bg-opacity-20 py-3 pl-1 pr-3 text-xl capitalize text-gray-800 shadow backdrop-blur-md transition-all duration-1000 dark:bg-white dark:bg-opacity-20 dark:text-slate-300 lg:hidden {menu
        ? 'left-0 opacity-100'
        : '-left-32 opacity-0'}"
>
    {#each routesList as route}
        <div class="flex justify-start gap-4 px-2">
            <svg
                class="h-4 w-4 translate-y-[6px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                /></svg
            >
            <Link to="/{route.path}">{$_(`navbar.${route.path}`)}</Link>
        </div>
    {:else}
        <div class="flex justify-start gap-4 px-2">
            <svg
                class="h-4 w-4 translate-y-[6px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                /></svg
            >
            <Link to="/login">login</Link>
        </div>
    {/each}
</div>
