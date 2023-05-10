<script lang="ts">
    import { onMount } from "svelte";
    import debounce from "lodash.debounce";
    import { _ } from "svelte-i18n";

    let query = "";
    let results = [];
    export let selectedEstablishment = 0;
    async function search(query: string) {
        return [
            { id: 1, name: "esisba" },
            { id: 2, name: "djilali sba" },
            { id: 3, name: "esi mascara" },
            { id: 4, name: "medecine sba" },
        ].filter((obj) => obj.name.indexOf(query) != -1);
    }
    async function handleInput(event) {
        console.log(query, results, selectedEstablishment);
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
        >{$_("register.establishment")}</label
    >
    <input
        type="text"
        id="search-field"
        class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-light dark:bg-gray-700 dark:text-white dark:ring-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
        placeholder={$_("register.establishment.label")}
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
