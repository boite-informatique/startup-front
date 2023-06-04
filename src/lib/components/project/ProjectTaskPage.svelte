<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("projects.tasks.task informations")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.title")} :
    </div>
    <div>
        <!-- {data.product_name} -->
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.description")} :
    </div>
    <div>
        <!-- {data.brand_name} -->
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.user")} :
    </div>
    <div>
        <!-- {data.type} -->
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.deadline")} :
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="cursor-pointer select-none">
        <!-- {data.resume.split(" ").slice(0, 8).join(" ")}
        {data.resume.split(" ").slice(8, 9).join(" ")} ...<span
            class="underline opacity-60">{$_("projects.show more")}</span
        > -->
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.tasks.resources")} :
    </div>
    <div>
        <!-- <ImageModal src={data.logo} /> -->
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
