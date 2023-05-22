<script>
    import { Link, useLocation } from "svelte-navigator";
    import { fly } from "svelte/transition";
    import { quintInOut } from "svelte/easing";
    import { _ } from "svelte-i18n";

    const location = useLocation();

    export let sidebarList = [];
</script>

<div
    class="m-4 mt-6 rounded-lg bg-light bg-opacity-10 capitalize text-gray-900 shadow-lg dark:bg-gray-800 dark:bg-opacity-50 dark:text-gray-50 lg:m-0 lg:w-[22%] lg:rounded-none lg:px-2 lg:py-3 lg:shadow-left"
>
    <div
        class="menu h-full w-full font-medium lg:rounded-md  lg:outline-gray-400 dark:lg:outline-gray-700"
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
                    class="relative cursor-pointer border-l-4 border-darkest hover:opacity-100 dark:border-gray-200 {$location.pathname.includes(
                        `/${item.path}`
                    )
                        ? 'border-opacity-100 opacity-100'
                        : 'border-opacity-40 opacity-75 dark:border-opacity-40'} transition-all"
                >
                    <Link to={item.path}>{$_(`sidebar.${item.name}`)}</Link>
                </li>
            </div>
        {/each}
    </div>
</div>
