<script>
    import { Link } from "svelte-navigator";
    import { _ } from "svelte-i18n";
    import { routesStore } from "src/stores/routesStore";

    let routesList = $routesStore;
</script>

<div class="dropdown">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <div
        tabindex="0"
        class="px- flex h-11 cursor-pointer select-none items-center rounded-r-2xl bg-black bg-opacity-20 py-2 pl-[6px] pr-[10px] text-gray-800 transition-all duration-300 hover:bg-opacity-25 dark:bg-white  dark:bg-opacity-20 dark:text-slate-300 dark:hover:bg-opacity-25 md:px-3 lg:hidden"
    >
        <!-- hamburger icon -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <svg
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
    </div>

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="dropdown-content menu mt-2 w-52 rounded-r-md bg-base-100 p-2 font-medium capitalize shadow"
    >
        {#each routesList as route}
            <li>
                <Link to="/{route.path}">{$_(`navbar.${route.name}`)}</Link>
            </li>
        {:else}
            <li>
                <Link to="/login">login</Link>
            </li>
        {/each}
    </ul>
</div>
