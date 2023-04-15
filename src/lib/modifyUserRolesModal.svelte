<script>
    import { _ } from "svelte-i18n";

    export let modifyRolesModalState = false;
</script>

<input
    type="checkbox"
    id="my-modal-12"
    class="modal-toggle"
    bind:checked={modifyRolesModalState}
/>
<div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box text-gray-200">
        <h3 class="mb-2 text-xl font-bold capitalize">
            {$_("admin.users.modify the user's roles")}
        </h3>
        <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
        </p>
        <div class="modal-action">
            <label for="my-modal-12" class="btn">Yay!</label>
        </div>
    </div>
</div>
