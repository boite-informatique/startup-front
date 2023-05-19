<script lang="ts">
    import { getProjects } from "src/api/project";
    import AddProject from "src/lib/AddProject.svelte";
    import Breadcrumb from "src/lib/Breadcrumb.svelte";

    import ProjectsTables from "src/lib/ProjectsTables.svelte";
    import { canAddProject } from "src/lib/utils/canAddProject";

    let qs = new URLSearchParams(window.location.search);
    const queryType = qs.get("type");

    $: projects = getProjects(queryType);
</script>

<Breadcrumb breadcrumbItems={["projects"]} />
{#await projects then res}
    {#if res.status == 200}
        <div
            class="-mb-2 flex flex-col items-start justify-start gap-2 md:flex-row"
        >
            {#if canAddProject(true, queryType)}
                <AddProject on:showIndicator />
            {/if}
        </div>
        <ProjectsTables on:showIndicator projects={res.data} />
    {:else}
        <div
            class="-mb-2 flex flex-col items-start justify-start gap-2 md:flex-row"
        >
            {#if canAddProject(false, queryType)}
                <AddProject on:showIndicator />
            {/if}
        </div>
        <ProjectsTables on:showIndicator projects={[]} />
    {/if}
{/await}
