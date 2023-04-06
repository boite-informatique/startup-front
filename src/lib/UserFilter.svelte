<script lang="ts">
    import { _ } from "svelte-i18n";

    type FetchUsersQuery = {
        skip?: number;
        take?: number;
        first_name?: string;
        sex?: "Male" | "Female";
        type?: "Teacher" | "Student" | "Staff";
    };

    let filter: FetchUsersQuery = {};
</script>

<label
    for="my-modal-5"
    class="flex w-full max-w-xs cursor-pointer select-none flex-row items-center justify-between rounded-lg bg-gray-200 py-3 pl-4 text-sm font-semibold capitalize text-gray-800 outline outline-1 outline-accent active:outline-4 dark:bg-gray-800 dark:text-gray-200"
>
    <div>{$_("admin.users.filter users by...")}</div>
    <svg
        class="h-7 w-7 scale-150 pr-3"
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
    </svg>
</label>

<input type="checkbox" id="my-modal-5" class="modal-toggle" />
<div class="modal">
    <div
        class="modal-box flex w-11/12 max-w-5xl flex-col gap-5 border border-gray-400 text-gray-200"
    >
        <h3 class="mb-2 text-xl font-bold capitalize">
            {$_("admin.users.filter.filter users as you like")}!
        </h3>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("admin.users.first name")} :
            </div>
            <input
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("admin.users.sex")} :
            </div>
            <div class="flex flex-row gap-1 md:gap-2">
                <button class="btn">{$_("admin.users.male")}</button>
                <button class="btn">{$_("admin.users.female")}</button>
            </div>
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("admin.users.type")} :
            </div>
            <div class="flex flex-row gap-1 md:gap-2">
                <button class="btn">{$_("admin.users.student")}</button>
                <button class="btn">{$_("admin.users.teacher")}</button>
                <button class="btn">{$_("admin.users.staff")}</button>
            </div>
        </div>
        <div
            class="mt-3 flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
        >
            <button class="btn -mb-6"
                >{$_("admin.users.filter.remove all filters")}</button
            >
            <div
                class="flex flex-row items-center justify-start gap-1 md:gap-2"
            >
                <label for="my-modal-5" class="modal-action btn"
                    >{$_("admin.users.filter.cancel")}</label
                >
                <label for="my-modal-5" class="modal-action btn"
                    >{$_("admin.users.filter.apply filters")}</label
                >
            </div>
        </div>
    </div>
</div>
