<script lang="ts">
    import { _ } from "svelte-i18n";
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import ProjectResumeModal from "../components/project/ProjectResumeModal.svelte";
    import Avatar from "../components/Avatar.svelte";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";
    import ImageModal from "../components/ImageModal.svelte";

    export let data: PopulatedProject;

    let projectResumeModalState = false;
    let projectResumeModalData = "";
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.general information")}
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.product")} :
    </div>
    <div>
        {data.product_name}
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.brand")} :
    </div>
    <div>
        {data.brand_name}
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.type")} :
    </div>
    <div>
        {data.type}
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.resume")} :
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        on:click={() => {
            projectResumeModalState = true;
            projectResumeModalData = data.resume;
        }}
        class="cursor-pointer select-none"
    >
        {data.resume.split(" ").slice(0, 8).join(" ")}
        {data.resume.split(" ").slice(8, 9).join(" ")} ...<span
            class="underline opacity-60">{$_("projects.show more")}</span
        >
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.logo")} :
    </div>
    <div>
        <ImageModal src={data.logo} />
    </div>
</div>
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.owner")} :
    </div>
    <UserInfoAvatarName user={data.owner} />
</div>

<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.created at")} :
    </div>
    <div>
        {new Date(data.created_at).toLocaleString("en-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC",
        })}
    </div>
</div>
<ProjectResumeModal {projectResumeModalData} bind:projectResumeModalState />
