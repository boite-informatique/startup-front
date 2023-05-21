<script>
    import Navbar from "../lib/Navbar.svelte";
    import Sidebar from "../lib/Sidebar.svelte";

    export let showNavbar = true;
    export let showSidebar = true;

    let userIsLoggedIn;

    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        userIsLoggedIn = true;
        // now gotta verify if his token is still valid by sending GET /auth , if 200 status he is logged in, else he is not, I will do this later (mor l ftour)
    } else {
        userIsLoggedIn = false;
    }
</script>

{#if showNavbar}
    <Navbar />
{/if}

<div class="flex h-full w-full flex-1 flex-col lg:flex-row">
    {#if userIsLoggedIn && showSidebar}
        <Sidebar />
    {/if}
    <slot />
</div>
