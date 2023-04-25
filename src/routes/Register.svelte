<script>
    // importing Modules
    import { _ } from "svelte-i18n";
    import { register } from "../api/user-register";
    import fetchUserPermissions from "../api/userPermissions";
    import { Link } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";

    // importing components
    import DarkModeTogglerLogin from "../lib/DarkModeTogglerLogin.svelte";
    import LanguageMenuLogin from "../lib/LanguageMenuLogin.svelte";
    import logo from "../assets/innovium_logos/innovium_light.png";

    const dispatch = createEventDispatcher();

    let rememberMe = false;
    let email = "";
    let password = "";
    let first_name = "";
    let last_name = "";
    let date_of_birth = "";
    let phone = "";
    let type = "student";
    let registration_num = "";
    let establishment = "";
    let specialty = "";
    let filiere = "";
    let grade = "";

    const handleFormSubmit = async (event) => {
        //todo
        event.preventDefault();
        try {
            let response = await register(null);
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
    class="relative flex min-h-screen w-full items-center justify-center justify-self-center overflow-y-scroll px-4 py-12 sm:px-6 lg:px-8"
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
                {$_("register.header")}
            </div>
        </div>
        <form
            class="mt-8 space-y-6"
            action="#"
            method="POST"
            on:submit|preventDefault={handleFormSubmit}
        >
            <div class="-space-y-px rounded-md shadow-sm">
                <input
                    bind:value={email}
                    id="email-address"
                    type="email"
                    autocomplete="email"
                    required
                    class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                    placeholder={$_("register.email")}
                />
                <input
                    bind:value={password}
                    id="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="relative block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                    placeholder={$_("register.password")}
                />
                <input
                    bind:value={first_name}
                    type="text"
                    required
                    class="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                    placeholder={$_("register.firstname")}
                />
                <input
                    bind:value={last_name}
                    type="text"
                    required
                    class="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                    placeholder={$_("register.lastname")}
                />
                <input
                    bind:value={phone}
                    type="text"
                    required
                    class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                    placeholder={$_("register.phone")}
                />
                <label for="date_of_birth">
                    <span class="label-text">{$_("register.date.label")}</span>
                    <input
                        bind:value={date_of_birth}
                        type="date"
                        name="date_of_birth"
                        required
                        class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("register.date")}
                    />
                    <div>
                        <label for="type">
                            <span class="label-text"
                                >{$_("register.select.label")}</span
                            >
                        </label>
                        <select
                            bind:value={type}
                            name="type"
                            required
                            class="relative mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        >
                            <option value="student"
                                >{$_("register.select.student")}</option
                            >
                            <option value="teacher"
                                >{$_("register.select.teacher")}</option
                            >
                            <option value="staff"
                                >{$_("register.select.staff")}</option
                            >
                        </select>
                    </div>
                    {#if type == "student"}
                        <input
                            bind:value={registration_num}
                            type="text"
                            required
                            class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                            placeholder={$_("register.registrationnum")}
                        />
                        <input
                            bind:value={establishment}
                            type="text"
                            required
                            class="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                            placeholder={$_("register.establishment")}
                        />
                        <input
                            bind:value={filiere}
                            type="text"
                            required
                            class="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                            placeholder={$_("register.filiere")}
                        />
                        <input
                            bind:value={specialty}
                            type="text"
                            required
                            class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                            placeholder={$_("register.specialty")}
                        />
                    {/if}
                </label>
            </div>

            <div>
                <button
                    type="submit"
                    class="group relative flex w-full justify-center rounded-md bg-light px-3 py-2 text-sm font-semibold text-white hover:bg-opacity-75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
                >
                    {$_("register.submit")}
                </button>
            </div>
        </form>
        <Link to="/login"
            ><div class="link-hover link relative mt-4">
                {$_("register.loginlink")}
            </div></Link
        >
    </div>
</div>
