<script>
    import { _ } from "svelte-i18n";
</script>

<div class="h-[400px] w-full overflow-x-auto rounded-lg scrollbar-hide">
    <table class="table w-full">
        <!-- head -->
        <thead>
            <tr class="sticky top-0 z-10 bg-opacity-100 backdrop-blur-md">
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                />
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.user")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.type")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.roles")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.sex")}</th
                >
                <th
                    class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                    >{$_("admin.users.birthday infos")}</th
                >
            </tr>
        </thead>
        <tbody>
            <!-- duplicate -->
            <tr>
                <td
                    class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                >
                    <!-- <label>
                        <input
                            type="checkbox"
                            class="checkbox-primary checkbox cursor-default focus:ring-0"
                            checked={true}
                            on:click={(e) => {
                                e.preventDefault();
                            }}
                        />
                    </label> -->

                    <input
                        type="checkbox"
                        class="checkbox cursor-default ring-1 ring-black"
                        style="cursor: default;"
                        disabled
                        checked
                    />
                </td>
                <td
                    class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                >
                    <div class="flex items-center space-x-3">
                        <div class="avatar">
                            <div class="mask mask-squircle h-12 w-12">
                                <img
                                    src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                    alt="Avatar Tailwind CSS Component"
                                />
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">
                                ouzane mohamed chakib dhiyaa eddine
                            </div>
                            <div class="text-sm font-medium opacity-90">
                                email
                            </div>
                        </div>
                    </div>
                </td>
                <td
                    class="cursor-pointer bg-gray-200 font-bold text-gray-800 transition-all hover:bg-opacity-75 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40"
                >
                    student
                    <br />
                    <span class="text-sm font-medium opacity-50"
                        >click to see more</span
                    >
                </td>
                <td
                    class="cursor-pointer bg-gray-200 font-bold text-gray-800 transition-all hover:bg-opacity-75 hover:shadow-inner dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-opacity-40"
                >
                    3 roles
                    <br />
                    <span class="text-sm font-medium opacity-50"
                        >click to see more</span
                    >
                </td>
                <td
                    class="bg-gray-200 capitalize text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                    >male</td
                >
                <td
                    class="bg-gray-200 text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                >
                    10-12-2002
                    <br />
                    <span class="text-sm font-medium opacity-90"
                        >hammadia - tiaret</span
                    >
                </td>
            </tr>
            <!-- duplicate -->
        </tbody>
    </table>
</div>
