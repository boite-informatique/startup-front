<script>
    // importing Modules
    import { Router, Route, navigate } from "svelte-navigator";
    import { onMount } from "svelte";
    import fetchUserPermissions from "./api/userPermissions";
    import fetchPeriods from "./api/periods";
    import { mode } from "src/stores/darkModeStore";

    // importing routes
    import Login from "src/routes/Login.svelte";
    import Home from "src/routes/Home.svelte";
    import Admin from "src/routes/Admin.svelte";
    import ForgotPassword from "src/routes/ForgotPassword.svelte";
    import ChangePassword from "src/routes/ChangePassword.svelte";
    import Register from "src/routes/Register.svelte";
    import RequestActivation from "src/routes/RequestActivation.svelte";

    import ActivateAccount from "src/routes/ActivateAccount.svelte";

    // importing components
    import Indicator from "src/lib/components/Indicator.svelte";
    import { getCurrentUserInfoAndStore } from "./api/user";
    import Profile from "src/routes/Profile.svelte";
    import Navbar from "src/lib/components/layout/navbar/Navbar.svelte";
    import ProjectsRoutes from "src/routes/ProjectsRoutes.svelte";
    import PeriodBanner from "src/lib/PeriodBanner.svelte";
    import ProfileRoutes from "./routes/ProfileRoutes.svelte";
    import Announcements from "./routes/Announcements.svelte";

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
        document.getElementsByTagName("html")[0].className =
            localStorage.getItem("theme") == "dark" ? "dark" : "";
        $mode = localStorage.getItem("theme") == "dark" ? "dark" : "";

        // performance enhancement
        await Promise.allSettled([
            fetchUserPermissions(),
            fetchPeriods(),
            getCurrentUserInfoAndStore(),
        ]);

        loadPage = true;
    });

    let userIsLoggedIn;

    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        userIsLoggedIn = true;
        // now gotta verify if his token is still valid by sending GET /auth , if 200 status he is logged in, else he is not, I will do this later (mor l ftour)
    } else {
        userIsLoggedIn = false;
        navigate("/login");
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
        <main class="flex min-h-screen flex-col items-center justify-start">
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
            <Route>
                <PeriodBanner />
                <Navbar />
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/profile/*">
                    <ProfileRoutes on:showIndicator={showIndicator} />
                </Route>
                <Route path="/admin/*">
                    <Admin on:showIndicator={showIndicator} />
                </Route>
                <Route path="/projects/*">
                    <ProjectsRoutes on:showIndicator={showIndicator} />
                </Route>
                <Route path="/announcements">
                    <Announcements on:showIndicator={showIndicator} />
                </Route>
            </Route>
        </main>
    </Router>
{/if}
