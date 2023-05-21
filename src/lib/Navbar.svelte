<script>
    import { Link } from "svelte-navigator";
    import { useLocation } from "svelte-navigator";
    import { _ } from "svelte-i18n";
    import innoviumLogo from "../assets/innovium_logos/innovium_light.png";
    import innoviumLogoNoText from "../assets/innovium_logos/light.png";

    import DarkModeTogglerLogin from "../lib/DarkModeTogglerLogin.svelte";
    import LanguageMenuLogin from "../lib/LanguageMenuLogin.svelte";
    import { routesStore } from "../stores/routesStore";
    import NavbarAvatar from "./NavbarAvatar.svelte";
    import MenuButton from "./MenuButton.svelte";

    let routesList = $routesStore;

    const location = useLocation();
</script>

<nav
    class="navbar sticky top-0 z-50 flex flex-row items-center justify-between bg-light bg-opacity-10 py-3 pl-0 pr-3 shadow-lg backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-50 lg:px-5"
>
    <MenuButton />
    <img src={innoviumLogo} alt="Innovium logo" class="hidden h-14 sm:block" />
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
    <!-- <div class="w-28 lg:w-[270px]" /> -->
    <!-- added this to take the place of the darkMode btn and language button since they are absolute -->
    <div class="flex flex-row gap-2">
        <DarkModeTogglerLogin />
        <LanguageMenuLogin />
        <NavbarAvatar />
    </div>
</nav>
<div class="fixed right-5 top-5 z-50 flex gap-3 md:gap-4" />
