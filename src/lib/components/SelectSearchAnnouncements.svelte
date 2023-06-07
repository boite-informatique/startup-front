<script lang="ts">
    import { onMount } from "svelte";
    import debounce from "lodash.debounce";
    import { _ } from "svelte-i18n";
    import { getEstablishments } from "src/api/referentiel/establishments.ts";
    import type { ReferentialItem } from "src/api/referentiel/types";

    let query = "";
    let results: ReferentialItem[] = [];
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
    <label class="label" for="deadline"
        ><span class="label-text">Search for establishments</span></label
    >
    <input
        type="text"
        on:input={debounce(handleInput, 200, { maxWait: 1000 })}
        class="input-bordered input w-full max-w-xs"
        name="dateEnd"
    />

    <select
        class="select-bordered select w-full max-w-xs"
        bind:value={selectedEstablishment}
    >
        <option disabled selected value={0}>Select establishement</option>
        {#if results.length > 0}
            {#each results as result}
                <option value={result.id}>{result.name}</option>
            {/each}
        {/if}
    </select>
</div>
