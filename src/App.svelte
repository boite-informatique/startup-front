<script>
    // importing Modules
    import { Router, Route } from "svelte-navigator";
    import { onMount } from "svelte";
    import fetchUserPermissions from "./api/userPermissions";

    // importing routes
    import Login from "./routes/Login.svelte";
    import Home from "./routes/Home.svelte";
    import Admin from "./routes/Admin.svelte";

    // importing components
    import Indicator from "./lib/Indicator.svelte";
    import Navbar from "./lib/Navbar.svelte";
    import Menu from "./lib/Menu.svelte";

    let menu = false;
    const toggleMenu = () => {
        menu = !menu;
    };

    let indicatorVisible = false;
    let indicatorContent;
    let indicatorType;

    let showIndicator = (event) => {
        indicatorContent = event.detail.indicatorContent;
        indicatorType = event.detail.indicatorType;
        indicatorVisible = event.detail.indicatorVisible;
    };

    let loadPage = false;
    onMount(async () => {
        await fetchUserPermissions();
        loadPage = true;
    });
</script>

<!-- this condition is added to make "onMount" work more like "beforeMount", since we want to fetch userPermission before the page loads. there is no "beforeMount" or any similar lifecycle functions in svelte and that's why is did this "workaround" thing -->
{#if loadPage}
    <Indicator
        bind:isVisible={indicatorVisible}
        {indicatorContent}
        {indicatorType}
    />

    <Router>
        <main class="flex min-h-screen flex-col items-center justify-between">
            <Navbar on:toggleMenu={toggleMenu} />
            <Menu {menu} />

            <Route path="login">
                <Login on:showIndicator={showIndicator} />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            <Route path="/admin/*">
                <Admin on:showIndicator={showIndicator} />
            </Route>
        </main>
    </Router>
{/if}

<style>
</style>
