<script>
    // importing Modules
    import { Router, Route } from "svelte-navigator";

    // importing routes
    import Login from "./routes/Login.svelte";
</script>

<Router>
    <main class="flex min-h-screen flex-col items-center justify-between">
        <Route path="login">
            <Login />
        </Route>
    </main>
</Router>

<style>
</style>
