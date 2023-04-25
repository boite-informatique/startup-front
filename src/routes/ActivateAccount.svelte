<script>
    // importing Modules
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import { activateAccount } from "../api/user-account-activation";

    // importing components
    import DarkModeTogglerLogin from "../lib/DarkModeTogglerLogin.svelte";
    import LanguageMenuLogin from "../lib/LanguageMenuLogin.svelte";
    import { Link } from "svelte-navigator";
    import logo from "../assets/innovium_logos/innovium_light.png";

    const dispatch = createEventDispatcher();

    export let token;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await activateAccount(token);
            if (response.status >= 200 && response.status < 300) {
                indicateSuccess();
            } else {
                indicateErrorOccurred();
            }
        } catch (error) {
            console.log(error);
        }
    };

    let indicateSuccess = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-success",
            indicatorContent: $_("forgotpw.indicator.success"),
            indicatorVisible: true,
        });
    };

    let indicateErrorOccurred = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-warning",
            indicatorContent: $_(
                "login.indicator.an error occured, please try again"
            ),
            indicatorVisible: true,
        });
    };
</script>

<div
    class="relative flex h-screen w-full items-center justify-center justify-self-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8"
>
    <div class="absolute top-5 right-5 flex gap-4">
        <DarkModeTogglerLogin />
        <LanguageMenuLogin />
    </div>
    <div class="w-full max-w-md space-y-8">
        <div>
            <img
                class="mx-auto mb-10 h-16 md:h-24"
                src={logo}
                alt="Innovium logo with text"
            />
            <div
                class="-mx-1 mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
            >
                {$_("forgotpw.header")}
            </div>
        </div>

        <form
            class="mt-8 space-y-6"
            action="#"
            method="POST"
            on:submit|preventDefault={handleFormSubmit}
        >
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <button
                        type="submit"
                        class="group relative flex w-full justify-center rounded-md bg-light px-3 py-2 text-sm font-semibold text-white hover:bg-opacity-75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
                    >
                        {$_("forgotpw.submit")}
                    </button>
                </div>
            </div>
        </form>
        <Link to="/login"
            ><div class="link-hover link relative mt-4">
                {$_("forgotpw.loginlink")}
            </div></Link
        >
    </div>
</div>
