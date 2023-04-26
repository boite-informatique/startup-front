<script>
    import { _ } from "svelte-i18n";
</script>

<div
    class="flex w-full max-w-xs cursor-pointer select-none flex-row items-center justify-between rounded-lg bg-gray-200 py-3 pl-4 text-sm font-semibold capitalize text-gray-800 outline outline-1 outline-accent active:outline-4 dark:bg-gray-800 dark:text-gray-200"
>
    <div>{$_("projects.add a project")}</div>
    <div class="scale-150 pr-3">+</div>
</div>
