<script>
    // importing modules
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { useNavigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";

    // importing stores
    import { userPermissions } from "../stores/userPermissions";

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

    onMount(() => {
        let userIsAdmin = $userPermissions.some(
            (obj) => obj.name === "canManageAll"
        );

        if (!userIsAdmin) {
            indicateUnauthorizedToAccessAdmin();
            navigate("/");
        }
    });
</script>
