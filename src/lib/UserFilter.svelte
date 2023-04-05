<script>
    import { _ } from "svelte-i18n";
</script>

<select
    class="select-accent select w-full max-w-xs bg-gray-100 capitalize text-gray-800 dark:bg-gray-800 dark:text-gray-200"
>
    <option disabled selected>{$_("admin.users.filter users by...")}</option>
    <option>{$_("admin.users.first name")}</option>
    <option>{$_("admin.users.sex")}</option>
    <option>{$_("admin.users.type")}</option>
</select>
