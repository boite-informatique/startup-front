<script>
    import { _ } from "svelte-i18n";
</script>

<div class="flex w-full flex-col items-start gap-3 p-7 pt-10">
    <div class="mb-3 text-3xl font-bold">
        {$_("referential.referential")}
    </div>
    <div class="flex flex-row gap-2">
        <div class="translate-y-2 text-xl font-bold sm:w-[350px]">
            {$_("referential.add an establishment")} :
        </div>
        <div class="flex flex-row gap-2">
            <input
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
            <button class="btn-outline btn-square btn" on:click={() => {}}>
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
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
            <button class="btn-outline btn-square btn" on:click={() => {}}>
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
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
            <button class="btn-outline btn-square btn" on:click={() => {}}>
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
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
            <button class="btn-outline btn-square btn" on:click={() => {}}>
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
                type="text"
                placeholder={$_("admin.users.filter.Type here")}
                class="input-bordered input w-full max-w-xs"
            />
            <button class="btn-outline btn-square btn" on:click={() => {}}>
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
