<script>
    import Breadcrumb from "../lib/Breadcrumb.svelte";
    import UserFilter from "../lib/UserFilter.svelte";
    import AddUser from "../lib/AddUser.svelte";
</script>

<div class="flex w-full flex-col gap-4 p-4 md:gap-7 md:px-12 md:py-7">
    <Breadcrumb />
    <div class="flex flex-col items-center justify-between gap-2 md:flex-row">
        <AddUser />
        <UserFilter />
    </div>
    <div>this is table area</div>
    <div>this is pagination area</div>
</div>
