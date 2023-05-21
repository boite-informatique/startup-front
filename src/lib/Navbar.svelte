<script>
    import { Link } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";
    import { useLocation } from "svelte-navigator";
    import { _ } from "svelte-i18n";
    import innoviumLogo from "../assets/innovium_logos/innovium_light.png";
    import innoviumLogoNoText from "../assets/innovium_logos/light.png";

    import DarkModeTogglerLogin from "../lib/DarkModeTogglerLogin.svelte";
    import LanguageMenuLogin from "../lib/LanguageMenuLogin.svelte";
    import { routesStore } from "../stores/routesStore";
    import NavbarAvatar from "./NavbarAvatar.svelte";

    const dispatch = createEventDispatcher();

    let routesList = $routesStore;

    let toggleMenu = () => {
        dispatch("toggleMenu");
    };

    const location = useLocation();
</script>

<nav
    class="navbar sticky top-0 z-50 flex flex-row items-center justify-between bg-light bg-opacity-10 py-3 pl-0 pr-3 shadow-lg backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-50 lg:px-5"
>
    <button
        class="h-11 rounded-r-2xl bg-black bg-opacity-20 pl-[6px] pr-[10px] text-gray-800 dark:bg-white dark:bg-opacity-20 dark:text-slate-300 lg:hidden"
    >
        <label class="swap-rotate swap">
            <!-- this hidden checkbox controls the state -->
            <input type="checkbox" class="hidden" />

            <!-- hamburger icon -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <svg
                on:click={toggleMenu}
                class="swap-off h-7 w-7 fill-gray-800 dark:fill-slate-300"
                style="transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
                ><path
                    d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
                /></svg
            >

            <!-- close icon -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <svg
                on:click={toggleMenu}
                style="transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));"
                class="swap-on h-7 w-7 fill-gray-800 dark:fill-slate-300"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
                ><polygon
                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
                /></svg
            >
        </label>
    </button>
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
