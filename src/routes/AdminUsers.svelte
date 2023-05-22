<script>
    import Breadcrumb from "src/lib/components/Breadcrumb.svelte";
    import AddUser from "src/lib/components/admin/AddUser.svelte";
    import AdminUsersTable from "src/lib/components/admin/AdminUsersTable.svelte";
    import PaginationButtons from "src/lib/components/admin/PaginationButtons.svelte";
    import UserFilter from "src/lib/components/admin/UserFilter.svelte";

    let stopPagination = false; // this variable tells if the pagination should stop or not (in case user reached the end)

    let pageIndex = 1;
    let changePage = (e) => {
        pageIndex = e.detail;
        filter.skip = (pageIndex - 1) * 10;
        filter.take = 10;
    };

    let filter = {
        skip: 0,
        take: 10,
    };
    let applyFilters = (e) => {
        filter = e.detail;
        pageIndex = 1;
    };
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
    <Breadcrumb />
    <div
        class="-mb-2 flex flex-col items-center justify-between gap-2 md:flex-row"
    >
        <AddUser />
        <UserFilter on:applyFilters={applyFilters} />
    </div>
    <AdminUsersTable
        on:showIndicator
        on:stopPagination={(e) => {
            e.detail ? (stopPagination = true) : (stopPagination = false);
        }}
        {filter}
    />
    <div class="flex w-full items-center justify-end">
        <PaginationButtons
            on:changePage={changePage}
            {pageIndex}
            {stopPagination}
        />
    </div>
</div>
