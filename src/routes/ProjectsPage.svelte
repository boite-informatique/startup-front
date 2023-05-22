<script lang="ts">
    import { getProjects } from "src/api/project";
    import AddProject from "src/lib/components/project/AddProject.svelte";
    import Breadcrumb from "src/lib/components/Breadcrumb.svelte";

    import ProjectsTables from "src/lib/components/project/ProjectsTables.svelte";
    import { canAddProject } from "src/lib/utils/canAddProject";

    export let queryString = "";
    let queryType = "";
    let projects;
    $: {
        const qs = new URLSearchParams(queryString);
        queryType = qs.get("type");
        projects = getProjects(queryType);
    }
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
