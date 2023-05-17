<script lang="ts">
    // importing Modules
    import { _ } from "svelte-i18n";
    import { register } from "../api/user-register";
    import { Link, navigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";

    // importing components
    import DarkModeTogglerLogin from "../lib/DarkModeTogglerLogin.svelte";
    import LanguageMenuLogin from "../lib/LanguageMenuLogin.svelte";
    import logo from "../assets/innovium_logos/innovium_light.png";
    import SelectSearch from "../lib/SelectSearch.svelte";
    import type { InvitationType } from "src/api/types/registration-types";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import { indicateError } from "src/lib/utils/indicatorDispatchers";

    const dispatch = createEventDispatcher();
    let qs = new URLSearchParams(window.location.search);

    let email = "";
    let password = "";
    let first_name = "";
    let last_name = "";
    let date_of_birth;
    let phone = "";
    let type = "student";
    let registration_num = "";
    let establishment_id = 0;
    let specialty = "";
    let filiere = "";
    let grade = "";
    let invitation: InvitationType = null;
    let fileUpload; // file upload function binded from UploadComponent
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let avatar: string = null;
        try {
            const files = await fileUpload();
            avatar = files || null;
            console.log(files);
        } catch (error) {
            indicateError(dispatch, error.message);
            return;
        }

        let info;
        switch (type) {
            case "student":
                info = {
                    registration_num,
                    establishment_id,
                    filiere,
                    specialty,
                };
                break;
            case "teacher":
                info = { registration_num, establishment_id, grade, specialty };
                break;
            case "staff":
                info = { grade };
            default:
                indicateErrorOccurred();
                return;
        }
        try {
            let response = await register(
                {
                    email,
                    password,
                    first_name,
                    last_name,
                    date_of_birth,
                    phone,
                    type,
                    info,
                    invitation,
                    avatar,
                },
                Boolean(invitation)
            );
            switch (response.status) {
                case 201:
                    indicateSuccess();
                    navigate("/request_activation");
                    break;
                case 409:
                    indicateEmailAlreadyExists();
                    break;
                default:
                    indicateErrorOccurred();
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    let indicateEmailAlreadyExists = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-error",
            indicatorContent: $_("register.indicator.emailconflict"),
            indicatorVisible: true,
        });
    };
    let indicateSuccess = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-success",
            indicatorContent: $_("register.indicator.success"),
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

    let indicateProjectInvitation = () => {
        dispatch("showIndicator", {
            indicatorType: "btn-info",
            indicatorContent: $_(
                "You have been invited to a project! Please register to accept the invitation."
            ),
            indicatorVisible: true,
        });
    };

    // in case of project invitation
    let emailDisabled = false;
    let typeDisabled = false;
    let projectId;
    let invitationToken;

    let invitationSearch = qs.get("invitation");
    if (invitationSearch) {
        email = qs.get("email");
        const invitationType = qs.get("type");
        projectId = +qs.get("projectId");
        invitationToken = qs.get("token");
        invitationType == "member" ? (type = "student") : (type = "teacher");
        emailDisabled = true;
        typeDisabled = true;
        invitation = {
            projectId,
            token: invitationToken,
        };
        setTimeout(() => {
            indicateProjectInvitation();
        }, 50);
    }
</script>

<div
    class="relative flex min-h-screen w-full items-center justify-center justify-self-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8"
>
    <!-- <MesrsLogo />  -->
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
                    disabled={emailDisabled}
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
                    <span class="label-text">{$_("register.dateLabel")}</span
                    ></label
                >
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
                        disabled={typeDisabled}
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
                        class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("register.registrationnum")}
                    />
                    <SelectSearch
                        bind:selectedEstablishment={establishment_id}
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
                {:else if type == "teacher"}
                    <input
                        bind:value={registration_num}
                        type="text"
                        required
                        class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("register.registrationnum")}
                    />
                    <SelectSearch
                        bind:selectedEstablishment={establishment_id}
                    />
                    <input
                        bind:value={grade}
                        type="text"
                        required
                        class="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("register.grade")}
                    />
                    <input
                        bind:value={specialty}
                        type="text"
                        required
                        class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("register.specialty")}
                    />
                {:else if type == "staff"}
                    <input
                        bind:value={grade}
                        type="text"
                        required
                        class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
                        placeholder={$_("register.grade")}
                    />
                {/if}
            </div>

            <div class="form-control w-full max-w-xs">
                <label class="label" for="file">
                    <span class="label-text">Select Avatar</span>
                </label>
                <UploadComponent
                    bind:handleFormSubmit={fileUpload}
                    type="image"
                    required={false}
                />
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
            ><div
                class="link-hover link relative mt-4 text-gray-900 opacity-70 hover:opacity-100 dark:text-gray-200"
            >
                {$_("register.loginlink")}
            </div></Link
        >
    </div>
</div>
