<script lang="ts">
    import { _ } from "svelte-i18n";
    import { getAnnouncements } from "src/api/announcements";

    const baseURL = import.meta.env.VITE_baseURL;

    let announcements = getAnnouncements();
</script>

<div
    class="container mt-8 flex flex-col flex-wrap content-center items-start justify-center gap-3 text-left text-xl capitalize"
>
    {#await announcements then res}
        {#if res.data.length == 0}
            <div>
                {$_("profile.noAnnouncements")}
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
                        <h2 class="card-title">{announcement.title}</h2>
                        <p>{announcement.description}</p>
                    </div>
                </div>
            {/each}
            <div class="mb-8" />
        {/if}
    {/await}
</div>
