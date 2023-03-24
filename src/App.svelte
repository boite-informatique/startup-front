<script>
    import { _, locale } from "svelte-i18n";
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

<main class="bg-gray-300 dark:bg-gray-700 h-screen">
    <div class="dark:text-gray-200 text-gray-800">{$_("content")}</div>
    <div class="flex flex-row gap-2">
        <div
            class="btn btn-primary"
            on:click={() => {
                changleLanguage("fr");
            }}
        >
            french
        </div>
        <div
            class="btn btn-primary"
            on:click={() => {
                changleLanguage("en");
            }}
        >
            english
        </div>
        <div class="btn btn-secondary" on:click={toggleDarkMode}>
            toggle dark mode
        </div>
    </div>
</main>

<style>
</style>
