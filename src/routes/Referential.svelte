<script>
    import { _ } from "svelte-i18n";
    import { Route, navigate, useLocation } from "svelte-navigator";

    import Sidebar from "src/lib/components/layout/Sidebar.svelte";
    import { sidebarLists } from "src/config/sidebarList";
    import CreateReferential from "src/lib/components/CreateReferential.svelte";
    import DisplayReferential from "src/lib/components/DisplayReferential.svelte";

    const location = useLocation();
    $: if ($location.pathname == "/referential") {
        navigate("/referential/create");
    }
</script>

<div class="flex h-full w-full flex-1 flex-col lg:flex-row">
    <Sidebar sidebarList={sidebarLists.referential} />
    <Route path="create">
        <CreateReferential on:showIndicator />
    </Route>
    <Route path="display">
        <DisplayReferential on:showIndicator />
    </Route>
</div>
