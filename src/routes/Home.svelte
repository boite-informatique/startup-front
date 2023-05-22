<script>
    // importing components
    import HomeAuthorizedUser from "src/lib/components/HomeAuthorizedUser.svelte";
    import HomeUnauthorizedUser from "src/lib/components/HomeUnauthorizedUser.svelte";

    let userIsLoggedIn;

    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        userIsLoggedIn = true;
        // now gotta verify if his token is still valid by sending GET /auth , if 200 status he is logged in, else he is not, I will do this later (mor l ftour)
    } else {
        userIsLoggedIn = false;
    }
</script>

{#if userIsLoggedIn}
    <HomeAuthorizedUser />
{:else}
    <HomeUnauthorizedUser />
{/if}
