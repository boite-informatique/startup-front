<script>
    import { _ } from "svelte-i18n";

    export let tasksData = [];
</script>

<div class="text-2xl font-bold">
    {$_("projects.tasks.project's tasks")}
</div>
{console.log(tasksData)}
