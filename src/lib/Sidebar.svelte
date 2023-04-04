<script>
    import { useLocation } from "svelte-navigator";

    const location = useLocation();
    let showSidebar = true;
    $: {
        showSidebar = $location.pathname !== "/login";
    }
</script>

{#if showSidebar}
    <div
        class="m-4 mt-6 rounded-lg bg-light bg-opacity-10 shadow-lg dark:bg-gray-800 dark:bg-opacity-50 lg:m-0 lg:w-[22%] lg:rounded-none lg:px-2 lg:py-3 lg:shadow-left"
    >
        <div
            class="menu h-full w-full lg:rounded-md lg:outline lg:outline-1 lg:outline-gray-400 dark:lg:outline-gray-700"
        >
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
        </div>
    </div>
{/if}
