<script>
    import { Link } from "svelte-navigator";
    import { useLocation } from "svelte-navigator";
    import { _ } from "svelte-i18n";
    import innoviumLogo from "src/assets/innovium_logos/innovium_light.png";
    import innoviumLogoNoText from "src/assets/innovium_logos/light.png";

    import DarkModeToggler from "src/lib/components/layout/navbar/DarkModeToggler.svelte";
    import LanguageMenu from "src/lib/components/layout/navbar/LanguageMenu.svelte";
    import { routesStore } from "src/stores/routesStore";
    import NavbarAvatar from "src/lib/components/layout/navbar/NavbarAvatar.svelte";
    import MenuButton from "./MenuButton.svelte";
    import { onMount } from "svelte";
    import { userPermissions } from "src/stores/userPermissions";
    import { currentUserInfo } from "src/stores/currentUserInfo";

    let routesList = $routesStore;
    let thisUserType = "guest";

    onMount(() => {
        let userIsAdmin = $userPermissions.some(
            (obj) => obj.name === "canManageAll"
        );
        let userIsStudent = $currentUserInfo?.type == "student";
        let userIsTeacher = $currentUserInfo?.type == "teacher";
        let userIsSc = $userPermissions?.some((obj) => obj.name === "sc");
        let userIsRs = $userPermissions?.some((obj) => obj.name == "rs"); // responsable de stage

        if (userIsAdmin) {
            thisUserType = "admin";
        } else if (userIsRs) {
            thisUserType = "RS";
        } else if (userIsSc) {
            thisUserType = "SC";
        } else if (userIsStudent) {
            thisUserType = "student";
        } else if (userIsTeacher) {
            thisUserType = "teacher";
        } else {
            thisUserType = "guest";
        }
    });

    const location = useLocation();
</script>

<nav
    class="navbar sticky top-0 z-[9998] flex flex-row items-center justify-between bg-light bg-opacity-10 py-3 pl-0 pr-3 shadow-lg backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-50 lg:px-5"
>
    <MenuButton />
    <div class="relative inset-0">
        <img
            src={innoviumLogo}
            alt="Innovium logo"
            class="hidden h-14 sm:block"
        />
        <span
            class="badge-primary badge indicator-item absolute top-[5px] -right-5 hidden border-light bg-light font-semibold capitalize sm:block"
            >{thisUserType}</span
        >
    </div>
    <img
        src={innoviumLogoNoText}
        alt="Innovium logo"
        class="block h-14 sm:hidden"
    />
    <ul
        class="hidden flex-1 items-center justify-center gap-10 text-lg font-semibold capitalize text-gray-900 dark:text-white lg:flex"
    >
        {#each routesList as route}
            <div class="group">
                <li
                    class="relative cursor-pointer px-2 hover:opacity-100 {(
                        $location.pathname + $location.search
                    )
                        .replace(/%20/g, ' ')
                        .startsWith(`/${route.path}`)
                        ? 'opacity-100'
                        : 'opacity-60'} transition-all"
                >
                    <Link to="/{route.path}">{$_(`navbar.${route.name}`)}</Link>
                    <span
                        class="absolute -bottom-1 left-0 h-1 {(
                            $location.pathname + $location.search
                        )
                            .replace(/%20/g, ' ')
                            .startsWith(`/${route.path}`)
                            ? 'w-full'
                            : 'w-0'}  bg-slate-900 bg-opacity-90 transition-all group-hover:w-full dark:bg-light dark:bg-opacity-90"
                    />
                </li>
            </div>
        {/each}
    </ul>
    <div class="flex flex-row gap-2">
        <DarkModeToggler />
        <LanguageMenu />
        <NavbarAvatar />
    </div>
</nav>
<div class="fixed right-5 top-5 z-50 flex gap-3 md:gap-4" />
