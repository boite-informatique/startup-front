<script>
    // importing Modules
    import { Router, Route } from "svelte-navigator";
    import { onMount } from "svelte";
    import fetchUserPermissions from "./api/userPermissions";
    import fetchPeriods from "./api/periods";

    // importing routes
    import Login from "./routes/Login.svelte";
    import Home from "./routes/Home.svelte";
    import Admin from "./routes/Admin.svelte";
    import MyProject from "./routes/MyProject.svelte";
    import Projects from "./routes/Projects.svelte";
    import ForgotPassword from "./routes/ForgotPassword.svelte";
    import Layout from "./routes/Layout.svelte";
    import ChangePassword from "./routes/ChangePassword.svelte";
    import Register from "./routes/Register.svelte";
    import RequestActivation from "./routes/RequestActivation.svelte";

    import ActivateAccount from "./routes/ActivateAccount.svelte";

    // importing components
    import Indicator from "./lib/Indicator.svelte";
    import { getCurrentUserInfoAndStore } from "./api/user";

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
        await fetchPeriods();
        await getCurrentUserInfoAndStore();
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
            <!-- Components that don't need navbar and sidebar -->
            <Route path="login">
                <Login on:showIndicator={showIndicator} />
            </Route>
            <Route path="forgot_password">
                <ForgotPassword on:showIndicator={showIndicator} />
            </Route>
            <Route path="change_password/:token" let:params>
                <ChangePassword
                    on:showIndicator={showIndicator}
                    token={params.token}
                />
            </Route>
            <Route path="register">
                <Register on:showIndicator={showIndicator} />
            </Route>
            <Route path="request_activation">
                <RequestActivation on:showIndicator={showIndicator} />
            </Route>
            <Route path="activate_account/:token" let:params>
                <ActivateAccount
                    on:showIndicator={showIndicator}
                    token={params.token}
                />
            </Route>

            <!-- Components that need navbar and sidebar -->
            <Route path="/">
                <Layout>
                    <Home />
                </Layout>
            </Route>
            <Route path="/admin/*">
                <Layout>
                    <Admin on:showIndicator={showIndicator} />
                </Layout>
            </Route>
            <Route path="/my%20project">
                <Layout showSidebar={false}>
                    <MyProject on:showIndicator={showIndicator} />
                </Layout>
            </Route>
            <Route path="/projects/*">
                <Layout showSidebar={false}>
                    <Projects on:showIndicator={showIndicator} />
                </Layout>
            </Route>
        </main>
    </Router>
{/if}

<style>
</style>
