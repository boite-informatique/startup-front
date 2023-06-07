<script>
    import Breadcrumb from "src/lib/components/Breadcrumb.svelte";
    import { periods } from "src/stores/periodsStore";
    import EditPeriods from "src/lib/components/EditPeriods.svelte";
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Breadcrumb />
    <div
        class="-mb-2 flex flex-col items-center justify-between gap-2 md:flex-row"
    >
        <EditPeriods on:showIndicator />
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Project Submission</div>
        <div>{$periods.submission.start} - {$periods.submission.end}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Project Validation</div>
        <div>{$periods.validation.start} - {$periods.validation.end}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Project Appeal</div>
        <div>{$periods.appeal.start} - {$periods.appeal.end}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">
            Project Appeal Validation Start Date
        </div>
        <div>
            {$periods.appealValidation.start} - {$periods.appealValidation.end}
        </div>
    </div>
</div>
