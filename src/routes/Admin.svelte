<script>
    // importing modules
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { Route, useNavigate, useLocation } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";

    // importing routes
    import AdminRoles from "./AdminRoles.svelte";
    import AdminUsers from "./AdminUsers.svelte";

    // importing stores
    import { userPermissions } from "../stores/userPermissions";
    import AdminPeriods from "./AdminPeriods.svelte";
    import Sidebar from "src/lib/Sidebar.svelte";
    import { sidebarLists } from "src/config/sidebarList";

    const dispatch = createEventDispatcher();

    const navigate = useNavigate();

    let indicateUnauthorizedToAccessAdmin = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_(
                "admin.indicator.You are not authorized to access '/admin' route"
            ),
            indicatorVisible: true,
        });
    };

    const location = useLocation();
    onMount(() => {
        let userIsAdmin = $userPermissions.some(
            (obj) => obj.name === "canManageAll"
        );

        if (!userIsAdmin) {
            indicateUnauthorizedToAccessAdmin();
            // navigate("/");
        } else {
            if ($location.pathname == "/admin") {
                navigate("/admin/users");
            }
        }
    });

    $: if ($location.pathname == "/admin") {
        navigate("/admin/users");
    }
</script>

<div class="flex h-full w-full flex-1 flex-col lg:flex-row">
    <Sidebar sidebarList={sidebarLists.admin} />
    <Route path="/users">
        <AdminUsers on:showIndicator />
    </Route>
    <Route path="/roles">
        <AdminRoles on:showIndicator />
    </Route>
    <Route path="/periods">
        <AdminPeriods on:showIndicator />
    </Route>
</div>
