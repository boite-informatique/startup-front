<!-- this component will be just redirecting to the first route in routesList since we don't have a home page so far -->
<script>
    import { onMount } from "svelte";
    import { useNavigate } from "svelte-navigator";
    import { routesStore } from "src/stores/routesStore";

    const navigate = useNavigate();
    onMount(() => {
        navigate($routesStore[0].path);
    });
</script>
