<div class="h-[400px] w-full overflow-x-auto rounded-lg scrollbar-hide">
    <table class="table w-full">
        <!-- head -->
        <thead>
            <tr class="sticky top-0 z-10 bg-opacity-100 backdrop-blur-md">
                <th />
                <th>User</th>
                <th>type</th>
                <th>roles</th>
                <th>sex</th>
                <th>birth infos</th>
            </tr>
        </thead>
        <tbody>
            <!-- duplicate -->
            <tr>
                <td>
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
                        class="checkbox cursor-default"
                        style="cursor: default;"
                        disabled
                        checked
                    />
                </td>
                <td>
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
                    class="cursor-pointer font-bold transition-all duration-300 hover:bg-opacity-75"
                >
                    student
                    <br />
                    <span class="text-sm font-medium opacity-50"
                        >click to see more</span
                    >
                </td>
                <td
                    class="cursor-pointer font-bold transition-all duration-300 hover:bg-opacity-75"
                >
                    3 roles
                    <br />
                    <span class="text-sm font-medium opacity-50"
                        >click to see more</span
                    >
                </td>
                <td class="capitalize">male</td>
                <td>
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
