<script lang="ts">
    import { _ } from "svelte-i18n";
    import { Route, navigate, useLocation } from "svelte-navigator";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import Sidebar from "src/lib/components/layout/Sidebar.svelte";
    import { sidebarLists } from "src/config/sidebarList";
    import CreateReferential from "src/lib/components/CreateReferential.svelte";
    import DisplayReferential from "src/lib/components/DisplayReferential.svelte";
    import {
        createEstablishments,
        getEstablishments,
    } from "src/api/referentiel/establishments";
    import { createFilieres, getFilieres } from "src/api/referentiel/filiere";
    import {
        createGradesForStaff,
        getGradesForStaff,
    } from "src/api/referentiel/grade-staff";
    import {
        createGradesForTeachers,
        getGradesForTeachers,
    } from "src/api/referentiel/grade-teacher";
    import {
        createSpecialities,
        getSpecialities,
    } from "src/api/referentiel/speciality";

    let establishmentName;
    let gradeStaffName;
    let gradeTeacherName;
    let filiereName;
    let specialtyName;

    // const location = useLocation();
    // $: if ($location.pathname == "/referential") {
    //     navigate("/referential/create");
    // }

    let handleCreateSpecialty = async () => {
        try {
            let response = await createSpecialities(specialtyName);

            switch (response.status) {
                case 201:
                    indicateSuccess(dispatch, "specialty added succesfully");
                    specialtyName = "";
                    break;
                case 400:
                    indicateError(dispatch, (response.data as any).message);
                    break;
                default:
                    indicateError(dispatch);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        specialtyResponse = getSpecialities();
    };

    let handleCreateEstablishment = async () => {
        try {
            let response = await createEstablishments(establishmentName);

            switch (response.status) {
                case 201:
                    indicateSuccess(
                        dispatch,
                        "establishment added succesfully"
                    );
                    establishmentName = "";
                    break;
                case 400:
                    indicateError(dispatch, (response.data as any).message);
                    break;
                default:
                    indicateError(dispatch);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        establishmentResponse = getEstablishments();
    };

    let handleCreateFiliere = async () => {
        try {
            let response = await createFilieres(filiereName);

            switch (response.status) {
                case 201:
                    indicateSuccess(dispatch, "filiere added succesfully");
                    filiereName = "";
                    break;
                case 400:
                    indicateError(dispatch, (response.data as any).message);
                    break;
                default:
                    indicateError(dispatch);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        filiereResponse = getFilieres();
    };

    let handleCreateGradeTeacher = async () => {
        try {
            let response = await createGradesForTeachers(gradeTeacherName);

            switch (response.status) {
                case 201:
                    indicateSuccess(
                        dispatch,
                        "teacher grade added succesfully"
                    );
                    gradeTeacherName = "";
                    break;
                case 400:
                    indicateError(dispatch, (response.data as any).message);
                    break;
                default:
                    indicateError(dispatch);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        gradeTeacherResponse = getGradesForTeachers();
    };

    let handleCreateGradeStaff = async () => {
        try {
            let response = await createGradesForStaff(gradeStaffName);

            switch (response.status) {
                case 201:
                    indicateSuccess(dispatch, "staff grade added succesfully");
                    gradeStaffName = "";
                    break;
                case 400:
                    indicateError(dispatch, (response.data as any).message);
                    break;
                default:
                    indicateError(dispatch);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        gradeStaffResponse = getGradesForStaff();
    };

    let establishmentResponse = getEstablishments();
    let filiereResponse = getFilieres();
    let specialtyResponse = getSpecialities();
    let gradeStaffResponse = getGradesForStaff();
    let gradeTeacherResponse = getGradesForTeachers();
</script>

<!-- <div class="flex h-full w-full flex-1 flex-col lg:flex-row"> -->
<div class="flex h-full w-full flex-1 flex-col">
    <!-- <Sidebar sidebarList={sidebarLists.referential} />
    <Route path="create">
        <CreateReferential on:showIndicator />
    </Route>
    <Route path="display">
        <DisplayReferential on:showIndicator />
    </Route> -->

    <div class="flex w-full flex-col items-start gap-3 p-7 pt-10">
        <div class="mb-3 text-3xl font-bold">
            {$_("referential.create referential")}
        </div>
        <div class="flex flex-row gap-2">
            <div class="translate-y-2 text-xl font-bold sm:w-[350px]">
                {$_("referential.add an establishment")} :
            </div>
            <div class="flex flex-row gap-2">
                <input
                    bind:value={establishmentName}
                    type="text"
                    placeholder={$_("admin.users.filter.Type here")}
                    class="input-bordered input w-full max-w-xs"
                />
                <button
                    class="btn-outline btn-square btn"
                    on:click={handleCreateEstablishment}
                >
                    <svg
                        class="h-8 w-8"
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
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="translate-y-2 text-xl font-bold sm:w-[350px]">
                {$_("referential.add a speciality")} :
            </div>
            <div class="flex flex-row gap-2">
                <input
                    bind:value={specialtyName}
                    type="text"
                    placeholder={$_("admin.users.filter.Type here")}
                    class="input-bordered input w-full max-w-xs"
                />
                <button
                    class="btn-outline btn-square btn"
                    on:click={handleCreateSpecialty}
                >
                    <svg
                        class="h-8 w-8"
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
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="translate-y-2 text-xl font-bold sm:w-[350px]">
                {$_("referential.add a filiere")} :
            </div>
            <div class="flex flex-row gap-2">
                <input
                    bind:value={filiereName}
                    type="text"
                    placeholder={$_("admin.users.filter.Type here")}
                    class="input-bordered input w-full max-w-xs"
                />
                <button
                    class="btn-outline btn-square btn"
                    on:click={handleCreateFiliere}
                >
                    <svg
                        class="h-8 w-8"
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
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="translate-y-2 text-xl font-bold sm:w-[350px]">
                {$_("referential.add a grade-teacher")} :
            </div>
            <div class="flex flex-row gap-2">
                <input
                    bind:value={gradeTeacherName}
                    type="text"
                    placeholder={$_("admin.users.filter.Type here")}
                    class="input-bordered input w-full max-w-xs"
                />
                <button
                    class="btn-outline btn-square btn"
                    on:click={handleCreateGradeTeacher}
                >
                    <svg
                        class="h-8 w-8"
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
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="translate-y-2 text-xl font-bold sm:w-[350px]">
                {$_("referential.add a grade-staff")} :
            </div>
            <div class="flex flex-row gap-2">
                <input
                    bind:value={gradeStaffName}
                    type="text"
                    placeholder={$_("admin.users.filter.Type here")}
                    class="input-bordered input w-full max-w-xs"
                />
                <button
                    class="btn-outline btn-square btn"
                    on:click={handleCreateGradeStaff}
                >
                    <svg
                        class="h-8 w-8"
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
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <div class="divider" />
    <div class="flex w-full flex-col items-start gap-3 p-7 pt-10">
        <div class="mb-3 text-3xl font-bold">
            {$_("referential.display referential")}
        </div>
        <div class="mb-3 flex flex-row gap-2">
            <div class="text-xl font-bold sm:w-[350px]">
                {$_("referential.establishments")} :
            </div>
            <div class="flex flex-col gap-1">
                {#await establishmentResponse}
                    <button class="btn loading"
                        >{$_("admin.users.loading")}</button
                    >
                {:then res}
                    {#if res.status >= 200 && res.status < 300}
                        {#each res.data as item}
                            <div>
                                {item.id} : {item.name}
                            </div>
                        {:else}
                            <p
                                class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                            >
                                {$_("no establishments available")}
                            </p>
                        {/each}
                    {:else}
                        <p
                            class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("no establishments available")}
                        </p>
                    {/if}
                {:catch error}
                    <p
                        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
                    >
                        {error.message}
                    </p>
                {/await}
            </div>
        </div>
        <div class="mb-3 flex flex-row gap-2">
            <div class="text-xl font-bold sm:w-[350px]">
                {$_("referential.specialties")} :
            </div>
            <div class="flex flex-col gap-1">
                {#await specialtyResponse}
                    <button class="btn loading"
                        >{$_("admin.users.loading")}</button
                    >
                {:then res}
                    {#if res.status >= 200 && res.status < 300}
                        {#each res.data as item}
                            <div>
                                {item.id} : {item.name}
                            </div>
                        {:else}
                            <p
                                class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                            >
                                {$_("no specialtys available")}
                            </p>
                        {/each}
                    {:else}
                        <p
                            class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("no specialtys available")}
                        </p>
                    {/if}
                {:catch error}
                    <p
                        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
                    >
                        {error.message}
                    </p>
                {/await}
            </div>
        </div>
        <div class="mb-3 flex flex-row gap-2">
            <div class="text-xl font-bold sm:w-[350px]">
                {$_("referential.filieres")} :
            </div>
            <div class="flex flex-col gap-1">
                {#await filiereResponse}
                    <button class="btn loading"
                        >{$_("admin.users.loading")}</button
                    >
                {:then res}
                    {#if res.status >= 200 && res.status < 300}
                        {#each res.data as item}
                            <div>
                                {item.id} : {item.name}
                            </div>
                        {:else}
                            <p
                                class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                            >
                                {$_("no filieres available")}
                            </p>
                        {/each}
                    {:else}
                        <p
                            class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("no filieres available")}
                        </p>
                    {/if}
                {:catch error}
                    <p
                        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
                    >
                        {error.message}
                    </p>
                {/await}
            </div>
        </div>
        <div class="mb-3 flex flex-row gap-2">
            <div class="text-xl font-bold sm:w-[350px]">
                {$_("referential.grade-teacher")} :
            </div>
            <div class="flex flex-col gap-1">
                {#await gradeTeacherResponse}
                    <button class="btn loading"
                        >{$_("admin.users.loading")}</button
                    >
                {:then res}
                    {#if res.status >= 200 && res.status < 300}
                        {#each res.data as item}
                            <div>
                                {item.id} : {item.name}
                            </div>
                        {:else}
                            <p
                                class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                            >
                                {$_("no grade-teachers available")}
                            </p>
                        {/each}
                    {:else}
                        <p
                            class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("no grade-teachers available")}
                        </p>
                    {/if}
                {:catch error}
                    <p
                        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
                    >
                        {error.message}
                    </p>
                {/await}
            </div>
        </div>
        <div class="mb-3 flex flex-row gap-2">
            <div class="text-xl font-bold sm:w-[350px]">
                {$_("referential.grade-staff")} :
            </div>
            <div class="flex flex-col gap-1">
                {#await gradeStaffResponse}
                    <button class="btn loading"
                        >{$_("admin.users.loading")}</button
                    >
                {:then res}
                    {#if res.status >= 200 && res.status < 300}
                        {#each res.data as item}
                            <div>
                                {item.id} : {item.name}
                            </div>
                        {:else}
                            <p
                                class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                            >
                                {$_("no grade-staffs available")}
                            </p>
                        {/each}
                    {:else}
                        <p
                            class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                        >
                            {$_("no grade-staffs available")}
                        </p>
                    {/if}
                {:catch error}
                    <p
                        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
                    >
                        {error.message}
                    </p>
                {/await}
            </div>
        </div>
    </div>
</div>
