<script lang="ts">
    import { _ } from "svelte-i18n";
    import UserInfoAvatarName from "../UserInfoAvatarName.svelte";
    import { GetTask } from "src/api/project/tasks";
    export let taskID = 1;

    let task = GetTask(taskID);
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
                {taskData.data.title}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.description")} :
            </div>
            <div>
                {taskData.data.description}
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
                {new Date(taskData.data.created_at).toLocaleString("en-UK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: "UTC",
                })}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.resources")} :
            </div>
            <div>
                <!-- <ImageModal src={data.logo} /> -->
                here put ressources
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.finished")}? :
            </div>
            <!-- <UserInfoAvatarName user={data.owner} /> -->
        </div>

        <div class="flex flex-col gap-2 md:flex-row">
            <div class="font-bold sm:w-[330px]">
                {$_("projects.tasks.comments")} :
            </div>
            <div>
                <!-- {new Date(data.created_at).toLocaleString("en-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC",
        })} -->
            </div>
        </div>
        <!-- <ProjectResumeModal {projectResumeModalData} bind:projectResumeModalState /> -->
    {:else}
        <p class="text-gray-200 text-center text-lg capitalize font-semibold">
            {$_("projects.task unavailable")}
        </p>
    {/if}
{:catch error}
    <p
        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
    >
        {error.message}
    </p>
{/await}
