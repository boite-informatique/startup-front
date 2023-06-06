<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { _ } from "svelte-i18n";
    import Avatar from "../components/Avatar.svelte";
    import UserInfoAvatarName from "../components/UserInfoAvatarName.svelte";

    export let data: PopulatedProject;
</script>

<div class="mb-3 text-3xl font-bold">
    {$_("sidebar.defense")}
</div>

<!-- defense authorization -->
<div class="flex flex-col gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.defense authorization")} :
    </div>

    {#if data.DefenseAuthorization}
        <div class="flex flex-col gap-2">
            <div class="flex flex-row items-center gap-5">
                <span class="font-bold">{$_("projects.supervisor")} : </span>
                <UserInfoAvatarName
                    user={data.DefenseAuthorization.supervisor}
                />
            </div>
            <div class="flex flex-row items-center gap-3">
                <div>
                    <span class="font-bold"
                        >{$_("projects.defense authorization file")} :
                    </span>
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a
                    href="http://localhost:3001/upload/{data
                        .DefenseAuthorization.uploadedFile}"
                    target="_blank"
                    class="btn"
                >
                    {$_("projects.click here")}
                </a>
            </div>
        </div>
    {:else}
        {$_("projects.no defense authorization for this project")}
    {/if}
</div>

<div class="divider my-4 mx-auto w-11/12" />
<!-- defense documents -->
<div class=" flex flex-col items-center gap-2 md:flex-row">
    <div class="font-bold sm:w-[330px]">
        {$_("projects.defense documents")} :
    </div>
    <p class="-mb-1 mt-1">
        {#if data.DefenseDocument}
            <a
                href={`http://localhost:3001/upload/${data.DefenseDocument.bmc}`}
                target="_blank"
                class="btn">BMC</a
            >
            <a
                href={`http://localhost:3001/upload/${data.DefenseDocument.memoire}`}
                target="_blank"
                class="btn">Memoire</a
            >
            <a
                href={`http://localhost:3001/upload/${data.DefenseDocument.label}`}
                target="_blank"
                class="btn">Label</a
            >
        {:else}
            {$_("projects.no defense documents for this project")}
        {/if}
    </p>
</div>
