<script>
    import { _ } from "svelte-i18n";
    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
    for="my-modal-6690"
    class="flex cursor-pointer select-none flex-row items-center gap-3 rounded-md bg-black bg-opacity-20 py-2 px-2 font-semibold text-gray-800 transition-all duration-300 hover:scale-[1.02] hover:bg-opacity-25 dark:bg-white dark:bg-opacity-20 dark:text-slate-300 dark:hover:bg-opacity-25 md:px-3"
>
    <div class="hidden lg:block">
        {$_("navbar.log out")}
    </div>
    <svg
        class="h-6 w-6 fill-transparent stroke-gray-800 dark:stroke-slate-300"
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
</label>
<input type="checkbox" id="my-modal-6690" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
        <h3 class="text-xl font-extrabold">{$_("navbar.log out")}!</h3>
        <p class="py-4 text-lg font-medium">
            {$_("navbar.are you sure you want to log out?")}
        </p>
        <div class="modal-action flex flex-row">
            <label for="my-modal-6690" class="btn dark:btn-outline"
                >{$_("navbar.no")}</label
            >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <label
                for="my-modal-6690"
                class="btn-error btn dark:btn-outline"
                on:click={logOut}>{$_("navbar.yes")}</label
            >
        </div>
    </div>
</div>
