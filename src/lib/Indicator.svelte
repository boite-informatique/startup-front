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
        class="absolute top-0 left-0 z-[9999] flex h-24 w-screen select-none items-center justify-center overflow-hidden overflow-y-visible sm:h-20"
    >
        {#if indicatorType == "btn-info"}
            <div
                class="alert alert-info z-30 w-11/12 shadow-lg ring-2 ring-gray-800 dark:ring-gray-200 sm:max-w-lg"
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="h-6 w-6 flex-shrink-0 stroke-current"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <span>{indicatorContent}</span>
                </div>
            </div>
        {/if}

        {#if indicatorType == "btn-success"}
            <div
                class="alert alert-success z-30 w-11/12 shadow-lg ring-2 ring-gray-800 dark:ring-gray-200 sm:max-w-lg"
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 flex-shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <span>{indicatorContent}</span>
                </div>
            </div>
        {/if}

        {#if indicatorType == "btn-warning"}
            <div
                class="alert alert-warning z-30 w-11/12 shadow-lg ring-2 ring-gray-800 dark:ring-gray-200 sm:max-w-lg"
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 flex-shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        /></svg
                    >
                    <span>{indicatorContent}</span>
                </div>
            </div>
        {/if}

        {#if indicatorType == "btn-error"}
            <div
                class="alert alert-error z-30 w-11/12 shadow-lg ring-2 ring-gray-800 dark:ring-gray-200 sm:max-w-lg"
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 flex-shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <span>{indicatorContent}</span>
                </div>
            </div>
        {/if}
    </div>
{/if}
