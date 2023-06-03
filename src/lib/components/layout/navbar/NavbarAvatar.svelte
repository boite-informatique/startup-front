<script lang="ts">
    import { currentUserInfo } from "src/stores/currentUserInfo";
    import { _ } from "svelte-i18n";
    import { Link, useNavigate } from "svelte-navigator";
    import Avatar from "../../Avatar.svelte";

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
    <label tabindex="0" class="cursor-pointer">
        <div class="mask mask-circle avatar h-14 w-14">
            <Avatar
                src={$currentUserInfo.avatar}
                altText={$currentUserInfo.first_name}
            />
        </div>
    </label>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="dropdown-content menu mt-1 w-52 rounded-md bg-base-100 p-2 font-medium capitalize shadow"
    >
        <!-- svelte-ignore a11y-missing-attribute -->
        <li>
            <Link to="/profile"
                ><a class="flex flex-row gap-4">
                    <svg
                        class="h-6 w-6 fill-transparent stroke-gray-800 dark:stroke-slate-300"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <div>
                        {$_("navbar.profile")}
                    </div>
                </a></Link
            >
        </li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <li>
            <a on:click={logout} class="flex flex-row gap-4">
                <svg
                    class="h-6 w-6 translate-x-[2px] fill-transparent stroke-gray-800 dark:stroke-slate-300"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21 12L13 12"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <div>
                    {$_("navbar.logout")}
                </div>
            </a>
        </li>
    </ul>
</div>
