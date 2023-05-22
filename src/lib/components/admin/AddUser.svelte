<script>
    import { _ } from "svelte-i18n";
</script>

<div
    class="flex w-full max-w-xs cursor-pointer select-none flex-row items-center justify-between rounded-lg bg-black bg-opacity-5 py-3 pl-4 text-sm font-semibold capitalize outline outline-1 outline-accent active:outline-4"
>
    <div>{$_("admin.users.add a user")}</div>
    <div class="scale-150 pr-3">+</div>
</div>
