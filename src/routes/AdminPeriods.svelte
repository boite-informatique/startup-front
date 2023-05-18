<script>
    import Breadcrumb from "../lib/Breadcrumb.svelte";
    import AddRole from "../lib/AddRole.svelte";
    import AdminRolesTable from "../lib/AdminRolesTable.svelte";
    import { periods } from "src/stores/periodsStore";
    import EditPeriods from "src/lib/EditPeriods.svelte";
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Breadcrumb />
    <div
        class="-mb-2 flex flex-col items-center justify-between gap-2 md:flex-row"
    >
        <EditPeriods on:showIndicator />
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Project Submission Start Date</div>
        <div>{$periods.submission}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Project Validation Start Date</div>
        <div>{$periods.validation}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Project Appeal Start Date</div>
        <div>{$periods.appeal}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">
            Project Appeal Validation Start Date
        </div>
        <div>{$periods.appealValidation}</div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">
            Project Appeal Validation End Date
        </div>
        <div>{$periods.end}</div>
    </div>
</div>
