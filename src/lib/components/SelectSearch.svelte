<script lang="ts">
    import { onMount } from "svelte";
    import debounce from "lodash.debounce";
    import { _ } from "svelte-i18n";
    import {
        getEstablishments,
        type GetEstablishmentsOutput,
    } from "src/api/establishment-api";

    let query = "";
    let results: GetEstablishmentsOutput[] = [];
    export let selectedEstablishment = 0;
    async function search(query: string) {
        const response = await getEstablishments(query);
        if (response.status == 200) return response.data;
        return [];
    }
    async function handleInput(event) {
        query = event.target.value;
        results = await search(query);
        results.length > 0
            ? (selectedEstablishment = results[0].id)
            : (selectedEstablishment = 0);
    }

    onMount(async () => {
        results = await search("");
        results.length > 0
            ? (selectedEstablishment = results[0].id)
            : (selectedEstablishment = 0);
    });
</script>

<div>
    <label for="search-field" class="label-text"
        >{$_("register.establishment name")}</label
    >
    <input
        type="text"
        id="search-field"
        class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
        placeholder={$_("register.establishment")}
        on:input={debounce(handleInput, 200, { maxWait: 1000 })}
    />

    <div>
        <select
            class="relative block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
            bind:value={selectedEstablishment}
        >
            <option disabled selected value={0}>Select an establishement</option
            >
            {#if results.length > 0}
                {#each results as result}
                    <option value={result.id}>{result.name}</option>
                {/each}
            {/if}
        </select>
    </div>
</div>
