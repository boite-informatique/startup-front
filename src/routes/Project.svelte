<script>
    import { getProjectByID } from "src/api/project";
    import { _ } from "svelte-i18n";

    export let projectID;
    let project = getProjectByID(projectID);
</script>

{#await project}
    <button class="btn loading">{$_("admin.users.loading")}</button>
{:then res}
    {#if res.status >= 200 && res.status < 300}
        <!-- main content goes here -->
        <div class="flex flex-col">
            hna ketba ta3 l project with ID == {projectID}
        </div>
    {:else}
        <p class="text-gray-200 text-center text-lg capitalize font-semibold">
            {$_("projects.project unavailable")}
        </p>
    {/if}
{:catch error}
    <p
        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
    >
        {error.message}
    </p>
{/await}
