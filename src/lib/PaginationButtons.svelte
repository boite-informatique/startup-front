<script>
    import { createEventDispatcher } from "svelte";

    $: indexes = // this array stores the indexes that should appear in the pagination buttons
        pageIndex in [1, 2, 3]
            ? [1, 2, 3, 4]
            : stopPagination
            ? [pageIndex - 3, pageIndex - 2, pageIndex - 1, pageIndex]
            : [pageIndex - 2, pageIndex - 1, pageIndex, pageIndex + 1];

    const dispatch = createEventDispatcher();
    export let pageIndex = 1;
    export let stopPagination = false;
</script>

<div class="btn-group">
    <button
        class={pageIndex == indexes[0]
            ? "btn-md btn border-gray-400 bg-light text-black hover:border-gray-400 hover:bg-light hover:bg-opacity-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-700 dark:hover:bg-opacity-100"
            : "btn-md btn border-gray-400 bg-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700"}
        on:click={() => {
            pageIndex = indexes[0];
            dispatch("changePage", pageIndex);
        }}>{indexes[0]}</button
    >
    <button
        class={pageIndex == indexes[1]
            ? "btn-md btn border-gray-400 bg-light text-black hover:border-gray-400 hover:bg-light hover:bg-opacity-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-700 dark:hover:bg-opacity-100"
            : "btn-md btn border-gray-400 bg-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700"}
        on:click={() => {
            pageIndex = indexes[1];
            dispatch("changePage", pageIndex);
        }}>{indexes[1]}</button
    >
    <button
        class={pageIndex == indexes[2]
            ? "btn-md btn border-gray-400 bg-light text-black hover:border-gray-400 hover:bg-light hover:bg-opacity-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-700 dark:hover:bg-opacity-100"
            : "btn-md btn border-gray-400 bg-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700"}
        on:click={() => {
            pageIndex = indexes[2];
            dispatch("changePage", pageIndex);
        }}>{indexes[2]}</button
    >
    <button
        class={pageIndex == indexes[3]
            ? "btn-md btn border-gray-400 bg-light text-black hover:border-gray-400 hover:bg-light hover:bg-opacity-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-700 dark:hover:bg-opacity-100"
            : "btn-md btn border-gray-400 bg-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700"}
        on:click={() => {
            pageIndex = indexes[3];
            dispatch("changePage", pageIndex);
        }}>{indexes[3]}</button
    >
</div>
