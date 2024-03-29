<script>
    // importing Modules
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import { ChangePassword } from "../api/forgot-password";

    // importing components
    import DarkModeToggler from "src/lib/components/layout/navbar/DarkModeToggler.svelte";
    import LanguageMenu from "src/lib/components/layout/navbar/LanguageMenu.svelte";
    import { Link } from "svelte-navigator";
    import logo from "src/assets/innovium_logos/innovium_light.png";
    import MesrsLogo from "src/lib/components/MesrsLogo.svelte";

    const dispatch = createEventDispatcher();

    export let token;
    let password = "";
    let password2 = "";

    const query = new URLSearchParams(window.location.search);
    const email = query.get("email");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (password !== password2) {
            indicatePasswordInequality();
        } else {
            try {
                let response = await ChangePassword(email, password, token);
                console.log("hello", response);
                if (response.status == 200) {
                    indicateSuccess();
                } else if (response.status == 403) {
                    indicateTokenExpiration();
                } else if (response.status >= 500 && response.status < 600) {
                    indicateInternalServerError();
                } else {
                    indicateErrorOccurred();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    let indicateSuccess = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-success",
            indicatorContent: $_("changepw.success"),
            indicatorVisible: true,
        });
    };

    let indicateInternalServerError = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_(
                "login.indicator.an internal server error occurred, please try again"
            ),
            indicatorVisible: true,
        });
    };
    let indicatePasswordInequality = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_("changepw.inequalpw"),
            indicatorVisible: true,
        });
    };

    let indicateTokenExpiration = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_("changepw.tokenexpiration"),
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
    <MesrsLogo />
    <div class="absolute top-5 right-5 flex gap-4">
        <DarkModeToggler />
        <LanguageMenu />
    </div>
    <div class="w-full max-w-md space-y-8">
        <div>
            <img
                class="mx-auto mb-10 h-16 md:h-24"
                src={logo}
                alt="Innovium logo with text"
            />
            <div
                class="-mx-1 mt-6 text-center text-3xl font-bold tracking-tight"
            >
                {$_("changepw.header")}
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
                    <label for="email-address" class="sr-only"
                        >{$_("changepw.password")}</label
                    >
                    <input
                        bind:value={password}
                        id="email-address"
                        name="password"
                        type="password"
                        required
                        class="relative mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("changepw.password")}
                    />
                </div>

                <div>
                    <label for="email-address" class="sr-only"
                        >{$_("changepw.password2")}</label
                    >
                    <input
                        bind:value={password2}
                        id="email-address"
                        name="password"
                        type="password"
                        required
                        class="relative mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("changepw.password2")}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative flex w-full justify-center rounded-md bg-light px-3 py-2 text-sm font-semibold text-white hover:bg-opacity-75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
                    >
                        <span
                            class="absolute inset-y-0 left-0 flex items-center pl-3"
                        >
                            <svg
                                class="h-5 w-5 text-lightest group-hover:text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
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
