<script>
    import { currentPeriod } from "src/stores/currentPeriod";
    import { periods } from "src/stores/periodsStore";
    import { _ } from "svelte-i18n";

    let message = $currentPeriod;
    let period;
    if (message == "Within submission phase") period = $periods.submission;
    else if (message == "Within validation phase") period = $periods.validation;
    else if (message == "Within appeal phase") period = $periods.appeal;
    else if (message == "Within appeal validation phase")
        period = $periods.appealValidation;
</script>

<div
    class="flex h-9 w-full flex-row items-center justify-between px-2 text-center font-semibold capitalize"
    title={$_(`banner.current period`)}
>
    {#if period}
        <div>
            {period.start}
        </div>
    {/if}
    <div class="mx-auto">
        {$_(`banner.${message}`)}
    </div>
    {#if period}
        <div>
            {period.end}
        </div>
    {/if}
</div>
