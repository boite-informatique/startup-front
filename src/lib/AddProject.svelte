<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";

    const dispatch = createEventDispatcher();

    type FetchUsersQuery = {
        skip?: number;
        take?: number;
        first_name?: string;
        sex?: "Male" | "Female";
        type?: "Teacher" | "Student" | "Staff";
    };

    let firstName: string = "";
    let sex: "Male" | "Female";
    let type: "Teacher" | "Student" | "Staff";

    let applyFilters = () => {
        filter = {
            skip: 0,
            take: 10,
            first_name: firstName,
            sex: sex,
            type: type,
        };

        dispatch("applyFilters", filter);
    };

    let filter: FetchUsersQuery = {};
</script>

<label
    for="my-modal-97"
    class="flex w-full max-w-xs cursor-pointer select-none flex-row items-center justify-between rounded-lg bg-gray-200 py-3 pl-4 text-sm font-semibold capitalize text-gray-800 outline outline-1 outline-accent active:outline-4 dark:bg-gray-800 dark:text-gray-200"
>
    <div>{$_("projects.add a project")}</div>
    <div class="scale-150 pr-3">+</div>
</label>

<input type="checkbox" id="my-modal-97" class="modal-toggle" />
<div class="modal">
    <div
        class="modal-box flex w-11/12 max-w-5xl flex-col gap-5 border border-gray-400 text-gray-200"
    >
        <h3 class="mb-2 text-xl font-bold capitalize">
            {$_("projects.add a project")} !
        </h3>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.product")} :
            </div>
            <input
                bind:value={firstName}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.brand")} :
            </div>
            <input
                bind:value={firstName}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.type")} :
            </div>
            <div class="flex flex-row gap-1 md:gap-2">
                <button
                    class="btn {sex == 'Male' ? 'btn-primary' : ''}"
                    on:click={() => {
                        sex = "Male";
                    }}>{$_("projects.startup")}</button
                >
                <button
                    class="btn {sex == 'Female' ? 'btn-primary' : ''}"
                    on:click={() => {
                        sex = "Female";
                    }}>{$_("projects.patent")}</button
                >
            </div>
        </div>
        <div class="flex flex-col items-start justify-start gap-2 md:flex-row">
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.resume")} :
            </div>
            <textarea
                class="textarea-bordered textarea w-full max-w-lg"
                placeholder="Résumé"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.owner")} :
            </div>
            <input
                bind:value={firstName}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.members")} :
            </div>
            <input
                bind:value={firstName}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.supervisor")} :
            </div>
            <input
                bind:value={firstName}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.co_supervisor")} :
            </div>
            <input
                bind:value={firstName}
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="mt-3 flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
        >
            <button
                class="btn -mb-6"
                on:click={() => {
                    firstName = "";
                    sex = undefined;
                    type = undefined;
                }}>{$_("admin.users.filter.remove all filters")}</button
            >
            <div
                class="flex flex-row items-center justify-start gap-1 md:gap-2"
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label
                    for="my-modal-97"
                    class="modal-action btn"
                    on:click={() => {
                        firstName = "";
                        sex = undefined;
                        type = undefined;
                    }}>{$_("admin.users.filter.cancel")}</label
                >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label
                    for="my-modal-97"
                    class="modal-action btn"
                    on:click={applyFilters}
                    >{$_("admin.users.save & close")}</label
                >
            </div>
        </div>
    </div>
</div>
