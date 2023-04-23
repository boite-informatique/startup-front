<script>
    import Menu from "../lib/Menu.svelte";

    import Navbar from "../lib/Navbar.svelte";
    import Sidebar from "../lib/Sidebar.svelte";

    let menu = false;
    const toggleMenu = () => {
        menu = !menu;
    };

    let userIsLoggedIn;

    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        userIsLoggedIn = true;
        // now gotta verify if his token is still valid by sending GET /auth , if 200 status he is logged in, else he is not, I will do this later (mor l ftour)
    } else {
        userIsLoggedIn = false;
    }
</script>

<Navbar on:toggleMenu={toggleMenu} />
<Menu {menu} />

<div class="flex h-full w-full flex-1 flex-col lg:flex-row">
    {#if userIsLoggedIn}
        <Sidebar />
    {/if}
    <slot />
</div>
