<script>
    import { Link } from "svelte-navigator";
    import { userPermissions } from "../stores/userPermissions";
    import routes from "../config/routesList";
    import { useLocation } from "svelte-navigator";
    import { _ } from "svelte-i18n";

    export let menu;

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
    if (userIsStudent) {
        routesList = routes.student;
    } else if (userIsTeacher) {
        routesList = routes.teacher;
    } else if (userIsAdmin) {
        routesList = routes.admin;
    } else {
        routesList = routes.guest;
    }

    const location = useLocation();
    let showMenu = true;
    $: {
        showMenu = $location.pathname !== "/login";
    }
</script>

{#if showMenu}
    <div
        class="fixed top-24 z-10 flex flex-col gap-3 rounded-r-lg bg-light bg-opacity-25 py-3 pl-1 pr-3 text-xl capitalize text-gray-900 transition-all duration-1000 dark:bg-gray-700 dark:text-white lg:hidden {menu
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
{/if}
