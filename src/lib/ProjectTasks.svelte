<script>
    import { _ } from "svelte-i18n";

    export let tasksData = [];
</script>

<div class="flex flex-col gap-3">
    <div class="text-3xl font-bold">
        {$_("projects.tasks.project's tasks")}
    </div>

    <div
        class="h-[400px] w-full overflow-x-auto rounded-lg text-base scrollbar-hide"
    >
        <table class="table w-full">
            <!-- head -->
            <thead>
                <tr class="sticky top-0 z-10 bg-opacity-100 backdrop-blur-md">
                    <th
                        class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                        >{$_("projects.tasks.title")}</th
                    >
                    <th
                        class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                        >{$_("projects.tasks.description")}</th
                    >
                    <th
                        class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                        >{$_("projects.tasks.user")}</th
                    >
                    <th
                        class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                        >{$_("projects.tasks.deadline")}</th
                    >
                    <th
                        class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                        >{$_("projects.tasks.resources")}</th
                    >
                    <th
                        class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                        >{$_("projects.tasks.finished")}?</th
                    >
                    <th
                        class="bg-slate-300 text-gray-800 transition-all dark:bg-slate-700 dark:text-gray-200"
                        >{$_("projects.tasks.comments")}</th
                    >
                </tr>
            </thead>
            <tbody>
                {#each tasksData as task}
                    <tr>
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >{task.title}</td
                        >
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >{task.description}</td
                        >
                        <td
                            class="flex items-center space-x-3 bg-gray-200 dark:bg-gray-800"
                        >
                            <div class="avatar">
                                <div class="mask mask-squircle h-12 w-12">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                        alt="Avatar of a user"
                                    />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">
                                    {task.user.first_name}
                                    {task.user.last_name}
                                </div>
                                <div class="text-sm font-medium opacity-90">
                                    {task.user.email}
                                </div>
                            </div>
                        </td>
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >{new Date(task.deadline).toLocaleString("en-UK", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                timeZone: "UTC",
                            })}</td
                        >
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >mazal</td
                        >
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >mazal</td
                        >
                        <td
                            class="bg-gray-200 font-bold text-gray-800 transition-all dark:bg-gray-800 dark:text-gray-200"
                            >mazal</td
                        >
                    </tr>
                {:else}
                    <p
                        class="text-gray-800 dark:text-gray-200 text-center text-lg capitalize font-semibold"
                    >
                        {$_("projects.tasks.no tasks available")}
                    </p>
                {/each}
            </tbody>
        </table>
    </div>
</div>
