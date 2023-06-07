<script lang="ts">
    import { _ } from "svelte-i18n";
    import EditProfile from "src/lib/components/EditProfile.svelte";
    import { currentUserInfo } from "../stores/currentUserInfo";
    import Avatar from "src/lib/components/Avatar.svelte";
    import type {
        User,
        UserWithRelationsAndEstablishment,
    } from "src/api/types/user-types";

    export let user: UserWithRelationsAndEstablishment;
    export let ownProfile: boolean = true;
</script>

<div
    class="container mt-8 flex flex-col flex-wrap content-center items-start justify-center gap-3 text-left text-xl capitalize"
>
    <div class="mask mask-circle avatar mx-auto h-24 w-24">
        <Avatar src={user?.avatar} altText={user?.first_name} />
    </div>
    {#if ownProfile}
        <div class="self-center">
            <EditProfile on:showIndicator />
        </div>
    {/if}
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.firstname")}</div>
        <div>{user?.first_name}</div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.lastname")}</div>
        <div>{user?.last_name}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.dateLabel")}</div>
        <div>
            {new Date(user?.date_of_birth).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row ">
        <div class="w-[330px] font-bold">{$_("register.email")}</div>
        <div class="lowercase">
            {user?.email}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.phone")}</div>
        <div>
            {user?.phone}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">{$_("register.select.label")}</div>
        <div>
            {user?.type}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">
            {$_("profile.Account Activation")}
        </div>
        <div>
            {user?.activated}
        </div>
    </div>

    {#if user?.type === "student"}
        <h2 class="mt-6 mb-2 font-bold">{$_("profile.Student Information")}</h2>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">
                {$_("profile.Registration Number")}
            </div>
            <div>
                {user?.student?.registration_num}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Filiere")}</div>
            <div>
                {user?.student?.filiere.name}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Speciality")}</div>
            <div>
                {user?.student?.speciality.name}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">
                {$_("profile.Establishment")} :
            </div>
            <div>
                {user?.student?.establishment.name}
            </div>
        </div>
    {:else if user?.type == "teacher"}
        <h2 class="mt-6 mb-2 font-bold">{$_("profile.Teacher Information")}</h2>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">
                {$_("profile.Registration Number")}
            </div>
            <div>
                {user?.teacher?.registration_num}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Grade")}</div>
            <div>
                {user?.teacher?.grade.name}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Speciality")}</div>
            <div>
                {user?.teacher?.speciality.name}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">
                {$_("profile.Establishment")} :
            </div>
            <div>
                {user?.teacher?.establishment.name}
            </div>
        </div>
    {:else if user?.type == "staff"}
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">{$_("profile.Grade")}</div>
            <div>
                {user?.staff?.grade.name}
            </div>
        </div>
    {/if}
</div>
