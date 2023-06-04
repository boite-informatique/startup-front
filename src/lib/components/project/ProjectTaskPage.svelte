<script lang="ts">
    import { _ } from "svelte-i18n";
    import UserInfoAvatarName from "../UserInfoAvatarName.svelte";
    export let taskData;
    export let taskID;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("projects.tasks.task informations")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.title")} :
    </div>
    <div>
        {taskData.title}
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.description")} :
    </div>
    <div>
        {taskData.description}
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.user")} :
    </div>
    <UserInfoAvatarName user={taskData.user} />
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.deadline")} :
    </div>
    <div>
        {new Date(taskData.created_at).toLocaleString("en-UK", {
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
