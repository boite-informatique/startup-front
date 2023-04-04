<script>
    import { userPermissions } from "../stores/userPermissions";
    import { Link, useLocation } from "svelte-navigator";
    import allSidebarList from "../config/sidebarList";
    import { fly } from "svelte/transition";
    import { quintInOut } from "svelte/easing";
    import { _ } from "svelte-i18n";

    const location = useLocation();
    let showSidebar = true;
    $: {
        showSidebar = $location.pathname !== "/login";
    }

    let userIsAdmin = $userPermissions.some(
        (obj) => obj.name === "canManageAll"
    );

    let userIsStudent = $userPermissions.some(
        (obj) => obj.name === "isStudent" // later change this permission name 'isStudent' to the name of permission in the store that only students have
    );

    let userIsTeacher = $userPermissions.some(
        (obj) => obj.name === "isTeacher" // later change this permission name 'isTeacher' to the name of permission in the store that only teachers have
    );

    let sidebarList;
    if (userIsStudent) {
        sidebarList = allSidebarList.student;
    } else if (userIsTeacher) {
        sidebarList = allSidebarList.teacher;
    } else if (userIsAdmin) {
        sidebarList = allSidebarList.admin;
    }
</script>

{#if showSidebar}
    <div
        class="m-4 mt-6 rounded-lg bg-light bg-opacity-10 text-gray-900 shadow-lg dark:bg-gray-800 dark:bg-opacity-50 dark:text-gray-50 lg:m-0 lg:w-[22%] lg:rounded-none lg:px-2 lg:py-3 lg:shadow-left"
    >
        <div
            class="menu h-full w-full font-medium lg:rounded-md lg:outline lg:outline-1 lg:outline-gray-400 dark:lg:outline-gray-700"
        >
            {#each sidebarList as item}
                <div class="group">
                    <li
                        in:fly={{
                            x: -40,
                            duration: 500,
                            delay: 380 + item.index * 40,
                            opacity: 0,
                            easing: quintInOut,
                        }}
                        class="relative cursor-pointer hover:opacity-100 {$location.pathname.includes(
                            `/${item.path}`
                        )
                            ? 'border-l-4 border-darkest opacity-100 dark:border-gray-200'
                            : 'opacity-75'} transition-all"
                    >
                        <Link
                            to="/{$location.pathname.split('/')[1]}/{item.path}"
                            >{$_(
                                `sidebar.${$location.pathname
                                    .split("/")[1]
                                    .replace(/%20/g, " ")}.${item.path}`
                            )}</Link
                        >
                    </li>
                </div>
            {/each}
        </div>
    </div>
{/if}
