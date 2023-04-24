<script>
    // importing Modules
    import { _ } from "svelte-i18n";
    import authenticateUser from "../api/authentication";
    import fetchUserPermissions from "../api/userPermissions";
    import { Link, useNavigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";

    // importing components
    import DarkModeTogglerLogin from "../lib/DarkModeTogglerLogin.svelte";
    import LanguageMenuLogin from "../lib/LanguageMenuLogin.svelte";
    import logo from "../assets/innovium_logos/innovium_light.png";

    const dispatch = createEventDispatcher();

    let rememberMe = false;
    let email = "";
    let password = "";

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await authenticateUser(email, password);
            if (response.status >= 200 && response.status < 300) {
                // write token in sessionStorage or localStorage
                const storageType = rememberMe ? localStorage : sessionStorage;
                storageType.setItem("token", response.data.token);
                await fetchUserPermissions();
                window.location.href = "/";
            } else if (response.status == 403) {
                indicateDeactivatedAccount();
            } else if (response.status >= 400 && response.status < 500) {
                indicateUnauthorized();
            } else if (response.status >= 500 && response.status < 600) {
                indicateInternalServerError();
            } else {
                indicateErrorOccurred();
            }
        } catch (error) {
            console.log(error);
        }
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
    let indicateDeactivatedAccount = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_("login.indicator.this account is deactivated"),
            indicatorVisible: true,
        });
    };
    let indicateUnauthorized = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_(
                "login.indicator.Invalid email or password. Please try again"
            ),
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
    <!-- <MesrsLogo /> -->
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
                {$_("login.Sign in to your account")}
            </div>
        </div>
        <form
            class="mt-8 space-y-6"
            action="#"
            method="POST"
            on:submit|preventDefault={handleFormSubmit}
        >
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label for="email-address" class="sr-only"
                        >{$_("login.Email address")}</label
                    >
                    <input
                        bind:value={email}
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("login.Email address")}
                    />
                </div>
                <div>
                    <label for="password" class="sr-only"
                        >{$_("login.Password")}</label
                    >
                    <input
                        bind:value={password}
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("login.Password")}
                    />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                        bind:checked={rememberMe}
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        class="z-20 h-4 w-4 rounded border-gray-300 text-light focus:ring-light"
                    />
                    <label
                        for="remember-me"
                        class="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                        >{$_("login.Remember me")}</label
                    >
                </div>
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
                    {$_("login.Sign in")}
                </button>
            </div>
        </form>
        <Link to="/forgot_password"
            ><div class="link-hover link relative mt-4">
                {$_("login.fogetpwlink")}
            </div></Link
        >
    </div>
</div>
