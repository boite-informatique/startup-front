<script>
    import { _ } from "svelte-i18n";

    export let UserTypeModalState = false;
    export let UserTypeModalData;
    export let UserType;
</script>

<input
    type="checkbox"
    id="my-modal-4"
    class="modal-toggle"
    bind:checked={UserTypeModalState}
/>
<div class="modal">
    <div class="modal-box relative border border-gray-500 text-gray-200">
        <label
            for="my-modal-4"
            class="btn-sm btn-circle btn absolute right-2 top-2 border border-gray-500 text-gray-200"
            >✕</label
        >
        <h3 class="text-lg font-bold capitalize">
            {$_("admin.users.informations about the")}{$_(
                `admin.users.${`${UserType}`.toLowerCase()}`
            )} :
        </h3>
        <div class="flex flex-col py-4">
            <div class="text-lg font-medium capitalize">
                - {console.log(UserTypeModalData)}
            </div>
            <div class="text-lg font-medium capitalize">- hahaaa</div>
        </div>
    </div>
</div>
