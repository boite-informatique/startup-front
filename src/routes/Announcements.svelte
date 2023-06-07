<script lang="ts">
    import { _ } from "svelte-i18n";
    import { getAnnouncements } from "src/api/announcements";
    import { userPermissions } from "src/stores/userPermissions";
    import EditAnnouncementButton from "src/lib/components/EditAnnouncementButton.svelte";
    import AdminAnnouncements from "./AdminAnnouncements.svelte";
    import CreateAnnouncementForm from "src/lib/components/CreateAnnouncementForm.svelte";

    const baseURL = import.meta.env.VITE_baseURL;
    let isIncubator = $userPermissions.some((obj) => obj.name === "incubator");

    let announcements = getAnnouncements(isIncubator ? "admin" : "");
</script>

<div
    class="container mt-8 flex flex-col flex-wrap content-center items-start justify-center gap-3 text-left text-xl capitalize"
>
    {#if isIncubator}
        <CreateAnnouncementForm on:showIndicator />
    {/if}
    {#await announcements then res}
        {#if res.data.length == 0}
            <div>
                {$_("announcements.noAnnouncements")}
            </div>
        {:else}
            {#each res.data as announcement}
                <div class="card lg:card-side bg-base-100 shadow-xl w-9/12">
                    <figure>
                        <img
                            class="h-48 w-full object-cover"
                            src={baseURL + "upload/" + announcement.image}
                            alt="Album"
                        />
                    </figure>
                    <div class="card-body">
                        <!-- actions button -->
                        <div
                            class="flex flex-row items-center justify-between w-full
                        "
                        >
                            <h2 class="card-title">{announcement.title}</h2>
                            {#if isIncubator}
                                <EditAnnouncementButton
                                    {announcement}
                                    on:showIndicator
                                />
                            {/if}
                        </div>
                        <p>{announcement.description}</p>
                    </div>
                </div>
            {/each}
            <div class="mb-8" />
        {/if}
    {/await}
</div>
