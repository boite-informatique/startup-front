<script lang="ts">
    import { _ } from "svelte-i18n";
    import UserInfoAvatarName from "../UserInfoAvatarName.svelte";
    import { GetTask } from "src/api/project/tasks";
    import MarkTaskFinished from "./MarkTaskFinished.svelte";
    import EditTaskModal from "./EditTaskModal.svelte";
    import { userPermissions } from "src/stores/userPermissions";
    import { currentUserInfo } from "src/stores/currentUserInfo";
    import { CreateTaskComment } from "src/api/project/taskComments";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let taskID: string | number = 1;
    let newComment = "";

    let taskFinishedModalData;
    let taskFinishedModalState;
    let editTaskModalState;
    let editTaskModalData;

    let task = GetTask(+taskID);

    let handleAddComment = async (taskId) => {
        let response = await CreateTaskComment(taskId, {
            body: newComment,
        });

        switch (response.status) {
            case 201:
                indicateSuccess(
                    dispatch,
                    $_("projects.tasks.comment added successfully")
                );
                newComment = "";
                break;

            case 400:
                indicateError(
                    dispatch,
                    $_("projects.tasks.comment could not be added")
                );
                break;
            default:
                indicateError(dispatch);
                break;
        }
        task = GetTask(+taskID); // to update what's show curretly to the user, without a need to refresh
    };
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
            <div class="flex flex-col gap-2">
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
                    <div class="divider" />
                {:else}
                    {$_("projects.tasks.no comments available")}
                {/each}
                {#if !$userPermissions.some((obj) => obj.name === "sc")}
                    <!-- anyone can add comment except scientific committee -->
                    <div class="flex flex-row gap-2">
                        <input
                            bind:value={newComment}
                            type="text"
                            placeholder={$_("admin.users.filter.Type here")}
                            class="input-bordered input w-full max-w-xs"
                        />
                        <button
                            class="btn-outline btn-square btn"
                            on:click={() => handleAddComment(taskData.data.id)}
                        >
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
                {/if}
            </div>
        </div>
        {#if taskData.data.user_id == $currentUserInfo.id}
            <!-- show this only if he is owner -->
            <div class="flex flex-col gap-2 md:flex-row mb-5 mt-4">
                <div class="font-bold sm:w-[330px] translate-y-2">
                    {$_("projects.tasks.modify task")} :
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    class="flex flex-row items-center justify-center btn gap-3"
                    on:click={() => {
                        editTaskModalState = true;
                        editTaskModalData = taskData.data;
                    }}
                >
                    <div>{$_("projects.tasks.modify task")}</div>
                    <svg
                        class="h-7 w-7"
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                </div>
            </div>
        {/if}
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
<EditTaskModal {editTaskModalData} bind:editTaskModalState on:showIndicator />
