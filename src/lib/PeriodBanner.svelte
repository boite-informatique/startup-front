<script>
    import { periods } from "src/stores/periodsStore";
    import { _ } from "svelte-i18n";

    let message = "";
    const currentDate = new Date();

    if (currentDate < new Date($periods.submission)) {
        message = "Platform is not open yet";
    } else if (currentDate < new Date($periods.validation)) {
        message = "Within submission phase";
    } else if (currentDate < new Date($periods.appeal)) {
        message = "Within validation phase";
    } else if (currentDate < new Date($periods.appealValidation)) {
        message = "Within appeal phase";
    } else if (currentDate < new Date($periods.end)) {
        message = "Within appeal validation phase";
    } else {
        message = "Platform is closed";
    }
</script>

<div
    class="flex h-9 w-full items-center justify-center text-center font-semibold capitalize"
    title={$_(`banner.current period`)}
>
    {$_(`banner.${message}`)}
</div>
