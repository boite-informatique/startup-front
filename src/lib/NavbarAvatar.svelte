<script lang="ts">
    import { currentUserInfo } from "src/stores/currentUserInfo";
    import { _ } from "svelte-i18n";
    import { Link, useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");
    };
</script>

<div class="dropdown-end dropdown">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label tabindex="0" class="btn-ghost btn-circle avatar btn">
        <div class="w-16 rounded-full">
            {#if $currentUserInfo.avatar}
                <img
                    src={`${import.meta.env.VITE_baseURL}upload/${
                        $currentUserInfo.avatar
                    }`}
                    alt="avatar"
                />
            {:else if $currentUserInfo.first_name && $currentUserInfo.last_name}
                <div class="placeholder avatar">
                    <div
                        class="w-24 rounded-full bg-neutral-focus text-neutral-content"
                    >
                        <span class="text-3xl"
                            >{`${$currentUserInfo.first_name}`}</span
                        >
                    </div>
                </div>
            {:else}
                <span class="text-3xl">?</span>
            {/if}
        </div>
    </label>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 capitalize shadow"
    >
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><Link to="/profile"><a>{$_("navbar.profile")}</a></Link></li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><a on:click={logout}>{$_("navbar.logout")}</a></li>
    </ul>
</div>
