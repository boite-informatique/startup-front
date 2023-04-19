<script>
    import Breadcrumb from "../lib/Breadcrumb.svelte";
    import RoleFilter from "../lib/RoleFilter.svelte";
    import AddRole from "../lib/AddRole.svelte";
    import AdminRolesTable from "../lib/AdminRolesTable.svelte";

    let filter = {
        skip: 0,
        take: 10,
    };
    let applyFilters = (e) => {
        filter = e.detail;
    };
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Breadcrumb />
    <div
        class="-mb-2 flex flex-col items-center justify-between gap-2 md:flex-row"
    >
        <AddRole />
        <RoleFilter on:applyFilters={applyFilters} />
    </div>
    <AdminRolesTable on:showIndicator {filter} />
</div>
