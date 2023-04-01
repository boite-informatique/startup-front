<script>
    // importing Modules
    import { Router, Route } from "svelte-navigator";

    // importing routes
    import Login from "./routes/Login.svelte";
    import Home from "./routes/Home.svelte";

    // importing components
    import Indicator from "./lib/Indicator.svelte";

    let indicatorVisible = false;
    let indicatorContent;
    let indicatorType;

    let showIndicator = (event) => {
        indicatorContent = event.detail.indicatorContent;
        indicatorType = event.detail.indicatorType;
        indicatorVisible = event.detail.indicatorVisible;
    };
</script>

<Indicator
    bind:isVisible={indicatorVisible}
    {indicatorContent}
    {indicatorType}
/>

<Router>
    <main class="flex min-h-screen flex-col items-center justify-between">
        <Route path="login">
            <Login on:showIndicator={showIndicator} />
        </Route>
        <Route path="/">
            <Home />
        </Route>
    </main>
</Router>

<style>
</style>
