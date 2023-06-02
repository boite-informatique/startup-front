<script lang="ts">
    const baseURL = import.meta.env.VITE_baseURL;

    export let src = "";
    export let altText = "";
</script>

{#if src}
    <img src={baseURL + "upload/" + src} alt="Avatar of a user" />
{:else}
    <div class="placeholder avatar">
        <div class="h-12 w-12 bg-neutral-focus text-neutral-content">
            <span class="text-3xl">{altText[0]}</span>
        </div>
    </div>
{/if}
