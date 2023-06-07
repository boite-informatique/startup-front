<script>
    import { currentPeriod } from "src/stores/currentPeriod";
    import { _ } from "svelte-i18n";

    let message = $currentPeriod;
</script>

<div
    class="flex h-9 w-full items-center justify-center text-center font-semibold capitalize"
    title={$_(`banner.current period`)}
>
    {$_(`banner.${message}`)}
</div>
