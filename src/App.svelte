<script>
    import { _, locale } from "svelte-i18n";

    const changleLanguage = (lang) => {
        locale.set(lang)
    }
</script>

<main>
    {$_("content")}
    <div class="flex flex-row gap-2">
        <div class="btn btn-primary" on:click={() => {changleLanguage("fr")}}>french</div>
        <div class="btn btn-primary" on:click={() => {changleLanguage("en")}}>english</div>
    </div>
</main>

<style>

</style>
