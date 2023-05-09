<script lang="ts">
    import { register } from "../api/project";
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";

    const dispatch = createEventDispatcher();

    let product: string = "";
    let brand: string = "";
    let type: "startup" | "patent";
    let resume: string = "";
    let ownerEmail: string = "";
    let memberEmail: string = "";
    let membersEmails: string[] = [];
    let supervisorEmail: string = "";
    let supervisorsEmails: string[] = [];
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
                bind:value={product}
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
                bind:value={brand}
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
                    class="btn {type == 'startup' ? 'btn-primary' : ''}"
                    on:click={() => {
                        type = "startup";
                    }}>{$_("projects.startup")}</button
                >
                <button
                    class="btn {type == 'patent' ? 'btn-primary' : ''}"
                    on:click={() => {
                        type = "patent";
                    }}>{$_("projects.patent")}</button
                >
            </div>
        </div>
        <div class="flex flex-col items-start justify-start gap-2 md:flex-row">
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.resume")} :
            </div>
            <textarea
                bind:value={resume}
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
                bind:value={ownerEmail}
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                placeholder={$_("login.Email address")}
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
                bind:value={memberEmail}
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                placeholder={$_("login.Email address")}
                class="input-bordered input w-full max-w-xs"
            />
            <button class="btn-square btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 rotate-45 font-extrabold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    /></svg
                >
            </button>
        </div>
        <div
            class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center"
        >
            <div class="text-lg font-semibold capitalize md:w-40">
                {$_("projects.supervisors")} :
            </div>
            <input
                bind:value={supervisorEmail}
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                placeholder={$_("login.Email address")}
                class="input-bordered input w-full max-w-xs"
            />
            <button class="btn-square btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 rotate-45 font-extrabold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    /></svg
                >
            </button>
        </div>
        <div
            class="mt-3 flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
        >
            <button
                class="btn -mb-6"
                on:click={() => {
                    product = "";
                    brand = "";
                    type = undefined;
                    resume = "";
                    ownerEmail = "";
                    memberEmail = "";
                    membersEmails = [];
                    supervisorEmail = "";
                    supervisorsEmails = [];
                }}>{$_("projects.clear the form")}</button
            >
            <div
                class="flex flex-row items-center justify-start gap-1 md:gap-2"
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label
                    for="my-modal-97"
                    class="modal-action btn"
                    on:click={() => {
                        product = "";
                        brand = "";
                        type = undefined;
                        resume = "";
                        ownerEmail = "";
                        memberEmail = "";
                        membersEmails = [];
                        supervisorEmail = "";
                        supervisorsEmails = [];
                    }}>{$_("admin.users.filter.cancel")}</label
                >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label
                    for="my-modal-97"
                    class="modal-action btn"
                    on:click={() => {}}>{$_("admin.users.save & close")}</label
                >
            </div>
        </div>
    </div>
</div>
