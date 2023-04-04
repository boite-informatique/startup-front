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
    import Sidebar from "./lib/Sidebar.svelte";

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

    let userIsLoggedIn;

    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        userIsLoggedIn = true;
        // now gotta verify if his token is still valid by sending GET /auth , if 200 status he is logged in, else he is not, I will do this later (mor l ftour)
    } else {
        userIsLoggedIn = false;
    }
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

            <div class="flex h-full w-full flex-1 flex-col lg:flex-row">
                {#if userIsLoggedIn}
                    <Sidebar />
                {/if}

                <Route path="login">
                    <Login on:showIndicator={showIndicator} />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/admin/*">
                    <Admin on:showIndicator={showIndicator} />
                </Route>
            </div>
        </main>
    </Router>
{/if}

<style>
</style>
