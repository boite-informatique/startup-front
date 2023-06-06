<script lang="ts">
    import { _ } from "svelte-i18n";
    import UserInfoAvatarName from "../UserInfoAvatarName.svelte";
    import { GetTask } from "src/api/project/tasks";
    import MarkTaskFinished from "./MarkTaskFinished.svelte";
    import { userPermissions } from "src/stores/userPermissions";
    import { currentUserInfo } from "src/stores/currentUserInfo";
    export let taskID: string | number = 1;

    let taskFinishedModalData;
    let taskFinishedModalState;

    let task = GetTask(+taskID);
</script>

{#await task}
    <button class="btn loading">{$_("admin.users.loading")}</button>
{:then taskData}
    {#if taskData.status >= 200 && taskData.status < 300}
        <div class="mb-3 text-3xl font-bold">
            {$_("projects.tasks.task informations")}
        </div>

        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.title")} :
            </div>
            <div>
                {taskData.data.title
                    ? taskData.data.title
                    : $_("projects.tasks.title not available")}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.description")} :
            </div>
            <div>
                {taskData.data.description
                    ? taskData.data.description
                    : $_("projects.tasks.description not available")}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.user")} :
            </div>
            <UserInfoAvatarName user={taskData.data.user} />
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.deadline")} :
            </div>
            <div>
                {taskData.data.deadline
                    ? new Date(taskData.data.deadline).toLocaleString("en-UK", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          timeZone: "UTC",
                      })
                    : $_("projects.tasks.no deadline available")}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.resources")} :
            </div>
            <div class="flex flex-col justify-start items-start gap-1">
                {#each taskData.data.resources as ressource}
                    <a
                        href={`http://localhost:3001/upload/${ressource}`}
                        target="_blank"
                        class="btn">ressource</a
                    >
                {:else}
                    {$_("projects.tasks.no resources available")}
                {/each}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.finished")}? :
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex flex-row gap-2">
                    <div class="font-semibold">
                        {$_("projects.tasks.description")} :
                    </div>
                    <div>
                        {taskData.data.TaskFinished?.description
                            ? taskData.data.TaskFinished?.description
                            : $_("projects.tasks.no description available")}
                    </div>
                </div>
                <div class="flex flex-row gap-2">
                    <div class="font-semibold">
                        {$_("projects.tasks.resources")} :
                    </div>
                    <div class="flex flex-col justify-start items-start gap-1">
                        {#if taskData.data.TaskFinished?.resources}
                            {#each taskData.data.TaskFinished?.resources as ressource}
                                <a
                                    href={`http://localhost:3001/upload/${ressource}`}
                                    target="_blank"
                                    class="btn">ressource</a
                                >
                            {:else}
                                {$_("projects.tasks.no resources available")}
                            {/each}
                        {:else}
                            {$_("projects.tasks.no resources available")}
                        {/if}
                    </div>
                </div>
                {#if taskData.data.user_id == $currentUserInfo.id}
                    <!-- show this only if he is owner -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="font-semibold underline cursor-pointer"
                        on:click={() => {
                            taskFinishedModalState = true;
                            taskFinishedModalData = taskData.data;
                        }}
                    >
                        {$_("projects.tasks.click to mark task as finished")}
                    </div>
                {/if}
            </div>
        </div>

        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.comments")} :
            </div>
            <div class="flex flex-col gap-11">
                {#each taskData.data.comments as comment}
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2">
                            <div class="font-semibold">
                                {$_("projects.tasks.by")} :
                            </div>
                            <div>
                                <UserInfoAvatarName user={comment.author} />
                            </div>
                        </div>
                        <div class="flex flex-row gap-2">
                            <div class="font-semibold">
                                {$_("projects.tasks.at")} :
                            </div>
                            <div>
                                {new Date(comment.created_at).toLocaleString(
                                    "en-UK",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        timeZone: "UTC",
                                    }
                                )}
                            </div>
                        </div>
                        <div class="flex flex-row gap-2">
                            <div class="font-semibold">
                                {$_("projects.tasks.comment")} :
                            </div>
                            <div>
                                {comment.body}
                            </div>
                        </div>
                    </div>
                {:else}
                    {$_("projects.tasks.no comments available")}
                {/each}
            </div>
        </div>
    {:else}
        <p class="text-gray-200 text-center text-lg capitalize font-semibold">
            {$_("projects.tasks.task unavailable")}
        </p>
    {/if}
{:catch error}
    <p
        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
    >
        {error.message}
    </p>
{/await}

<MarkTaskFinished
    {taskFinishedModalData}
    bind:taskFinishedModalState
    on:showIndicator
/>
