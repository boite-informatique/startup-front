<script>
    import { useLocation } from "svelte-navigator";

    const location = useLocation();
    let showSidebar = true;
    $: {
        showSidebar = $location.pathname !== "/login";
    }
</script>

{#if showSidebar}
    hello sidebar
{/if}
