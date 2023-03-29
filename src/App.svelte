<script>
    // importing Modules
    import { Router, Route } from "svelte-navigator";
    import { _, locale } from "svelte-i18n";

    // importing routes
    import Login from "./routes/Login.svelte";

    import { mode } from "./stores/darkModeStore";

    const myPage = document.getElementsByTagName("html");
    const toggleDarkMode = () => {
        myPage[0].className = $mode == "dark" ? "" : "dark";
        $mode = myPage[0].className;
    };

    const changleLanguage = (lang) => {
        locale.set(lang);
    };
</script>

<Router>
    <main class="h-screen bg-gray-300 dark:bg-gray-700">
        <div class="text-gray-800 dark:text-gray-200">{$_("content")}</div>
        <div class="flex flex-row gap-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="btn-primary btn"
                on:click={() => {
                    changleLanguage("fr");
                }}
            >
                french
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="btn-primary btn"
                on:click={() => {
                    changleLanguage("en");
                }}
            >
                english
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="btn-secondary btn" on:click={toggleDarkMode}>
                toggle dark mode
            </div>
        </div>
        <Route path="login">
            <Login />
        </Route>
    </main>
</Router>

<style>
</style>
