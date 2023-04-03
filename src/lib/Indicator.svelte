<!-- this is a component that behaves like a Snackbar, to notify the user that something happened, use it instead of using the javascript alert() -->
<script>
    import { fly } from "svelte/transition";

    export let indicatorType = "btn-warning"; // can be btn-info, btn-success, btn-warning, btn-error
    export let indicatorContent = "Hello world";
    export let duration = 6000;
    export let isVisible = false;

    let elapsedTime = 0;

    $: {
        isVisible;
        setTimeout(() => {
            isVisible = false;
            elapsedTime = 0;
        }, duration);
    }

    $: elapsedTime = isVisible ? 0 : elapsedTime + 50;
</script>

{#if isVisible}
    <div
        in:fly={{
            y: -40,
            duration: 500,
            delay: 0,
            opacity: 0,
        }}
        out:fly={{
            y: -40,
            duration: 500,
            delay: 0,
            opacity: 0,
        }}
        class="absolute top-0 left-0 z-50 flex h-20 w-screen select-none items-center justify-center overflow-hidden"
    >
        <div
            class="{indicatorType} no-animation btn-xs btn z-30 cursor-auto ring-2 ring-gray-800 sm:btn-sm md:btn-md dark:ring-gray-200"
        >
            {indicatorContent}
        </div>
    </div>
{/if}
