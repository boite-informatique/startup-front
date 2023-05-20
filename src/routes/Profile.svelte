<script lang="ts">
    import { _ } from "svelte-i18n";
    import EditProfile from "src/lib/EditProfile.svelte";
    import { currentUserInfo } from "../stores/currentUserInfo";
    const baseURL = import.meta.env.VITE_baseURL;
</script>

<div
    class="container mt-8 flex flex-col flex-wrap content-center items-start justify-center gap-3 text-left text-xl capitalize"
>
    {#if $currentUserInfo.avatar}
        <div class="avatar mx-auto">
            <div class="w-24 rounded-full">
                <img
                    src={`${baseURL}upload/${$currentUserInfo.avatar}`}
                    alt="avatar"
                />
            </div>
        </div>
    {:else}
        <div class="placeholder avatar">
            <div
                class="w-24 rounded-full bg-neutral-focus text-neutral-content"
            >
                <span class="text-3xl"
                    >{$currentUserInfo.first_name[0] +
                        $currentUserInfo.last_name[0]}</span
                >
            </div>
        </div>
    {/if}
    <div class="self-center">
        <EditProfile on:showIndicator />
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.firstname")}</div>
        <div>{$currentUserInfo.first_name}</div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.lastname")}</div>
        <div>{$currentUserInfo.last_name}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.dateLabel")}</div>
        <div>
            {new Date($currentUserInfo.date_of_birth).toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                }
            )}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row ">
        <div class="w-[330px] font-bold">{$_("register.email")}</div>
        <div class="lowercase">
            {$currentUserInfo.email}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.phone")}</div>
        <div>
            {$currentUserInfo.phone}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.select.label")}</div>
        <div>
            {$currentUserInfo.type}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">
            {$_("profile.Account Activation")}
        </div>
        <div>
            {$currentUserInfo.activated}
        </div>
    </div>

    {#if $currentUserInfo.type === "student"}
        <h2 class="mt-6 mb-2 font-bold">{$_("profile.Student Information")}</h2>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">
                {$_("profile.Registration Number")}
            </div>
            <div>
                {$currentUserInfo.student.registration_num}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Filiere")}</div>
            <div>
                {$currentUserInfo.student.filiere}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Speciality")}</div>
            <div>
                {$currentUserInfo.student.speciality}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">
                {$_("profile.Establishment")} :
            </div>
            <div>
                {$currentUserInfo.student.establishement.name}
            </div>
        </div>
    {:else if $currentUserInfo.type == "teacher"}
        <h2 class="mt-6 mb-2 font-bold">{$_("profile.Teacher Information")}</h2>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">
                {$_("profile.Registration Number")}
            </div>
            <div>
                {$currentUserInfo.teacher.registration_num}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Grade")}</div>
            <div>
                {$currentUserInfo.teacher.grade}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Speciality")}</div>
            <div>
                {$currentUserInfo.teacher.speciality}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">
                {$_("profile.Establishment")} :
            </div>
            <div>
                {$currentUserInfo.teacher.establishement.name}
            </div>
        </div>
    {:else if $currentUserInfo.type == "staff"}
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Grade")}</div>
            <div>
                {$currentUserInfo.staff.grade}
            </div>
        </div>
    {/if}
</div>
