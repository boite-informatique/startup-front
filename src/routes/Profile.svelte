<script lang="ts">
    import { _ } from "svelte-i18n";
    import EditProfile from "src/lib/EditProfile.svelte";
    import { currentUserInfo } from "../stores/currentUserInfo";
    const baseURL = import.meta.env.VITE_baseURL;
</script>

<div
    class="container mt-8 flex flex-col flex-wrap content-center items-start justify-center gap-3 text-left text-xl capitalize text-gray-800 dark:text-gray-200"
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
    <EditProfile on:showIndicator />
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">First Name</div>
        <div>{$currentUserInfo.first_name}</div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Last Name</div>
        <div>{$currentUserInfo.last_name}</div>
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Date of Birth</div>
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
        <div class="w-[330px] font-bold">Email</div>
        <div class="lowercase">
            {$currentUserInfo.email}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Phone Number</div>
        <div>
            {$currentUserInfo.phone}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Account Type</div>
        <div>
            {$currentUserInfo.type}
        </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <div class="w-[330px] font-bold">Account Activation</div>
        <div>
            {$currentUserInfo.activated}
        </div>
    </div>

    {#if $currentUserInfo.type === "student"}
        <h2 class="mt-6 mb-2 font-bold">Student Information</h2>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Registration Number</div>
            <div>
                {$currentUserInfo.student.registration_num}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Filiere</div>
            <div>
                {$currentUserInfo.student.filiere}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Specialty</div>
            <div>
                {$currentUserInfo.student.specialty}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Establishment :</div>
            <div>
                {$currentUserInfo.student.establishement.name}
            </div>
        </div>
    {:else if $currentUserInfo.type == "teacher"}
        <h2 class="mt-6 mb-2 font-bold">Student Information</h2>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Registration Number</div>
            <div>
                {$currentUserInfo.teacher.registration_num}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Grade</div>
            <div>
                {$currentUserInfo.teacher.grade}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Specialty</div>
            <div>
                {$currentUserInfo.teacher.specialty}
            </div>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Establishment :</div>
            <div>
                {$currentUserInfo.teacher.establishement.name}
            </div>
        </div>
    {:else if $currentUserInfo.type == "staff"}
        <div class="flex flex-col gap-2 md:flex-row">
            <div class="w-[330px] font-bold">Grade</div>
            <div>
                {$currentUserInfo.staff.grade}
            </div>
        </div>
    {/if}
</div>
