<script>
    import Breadcrumb from "../lib/Breadcrumb.svelte";
    import UserFilter from "../lib/UserFilter.svelte";
    import AddUser from "../lib/AddUser.svelte";
    import AdminUsersTable from "../lib/AdminUsersTable.svelte";
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Breadcrumb />
    <div
        class="-mb-2 flex flex-col items-center justify-between gap-2 md:flex-row"
    >
        <AddUser />
        <UserFilter />
    </div>
    <AdminUsersTable />
    <div class="flex w-full items-center justify-end">
        <div class="btn-group">
            <button class="btn-md btn">1</button>
            <button
                class="btn-md btn bg-light hover:bg-light hover:bg-opacity-70"
                >2</button
            >
            <button class="btn-md btn">3</button>
            <button class="btn-md btn">4</button>
        </div>
    </div>
</div>
