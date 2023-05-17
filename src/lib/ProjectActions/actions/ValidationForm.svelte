<script lang="ts">
    import { createValidation } from "src/api/project/validation";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";

    export let projectId: number = 0;
    const dispatch = createEventDispatcher();

    let decision: "favorable" | "unfavorable" | "accepted_with_reservation";
    let reservation: "minor" | "major";
    let note: string = "";
    $: if (decision !== "accepted_with_reservation") {
        reservation = undefined;
    }

    const handleFormSubmit = async () => {
        try {
            let response = await createValidation(projectId, {
                decision,
                reservation,
                note,
            });

            switch (response.status) {
                case 201:
                    indicateSuccess(
                        dispatch,
                        "Project validation created successfully"
                    );
                    break;
                case 400:
                    indicateError(dispatch, (response.data as any).message);
                    break;
                default:
                    indicateError(dispatch);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };
</script>

<div class="flex items-center justify-center">
    <div class="rounded-lg py-8">
        <h2 class="mb-8 text-center text-2xl font-bold">Validate Project</h2>
        <form class="flex flex-col justify-start space-y-4">
            <div>
                <label class="label" for="decision"
                    ><span class="label-text">Decision</span></label
                >
                <select
                    bind:value={decision}
                    name="decision"
                    class="select-bordered select w-full max-w-xs"
                >
                    <option disabled selected>Choose your decision</option>
                    <option value="favorable">Accepted</option>
                    <option value="accepted_with_reservation"
                        >Accepted Under Reservation</option
                    >
                    <option value="refused">Refused</option>
                </select>
            </div>

            {#if decision == "accepted_with_reservation"}
                <div>
                    <label class="label" for="reservation"
                        ><span class="label-text">Reservation</span></label
                    >
                    <select
                        bind:value={reservation}
                        class="select-bordered select w-full max-w-xs"
                        name="reservation"
                    >
                        <option disabled selected
                            >Choose your reservation</option
                        >
                        <option value="major">Major</option>
                        <option value="minor">Minor</option>
                    </select>
                </div>
            {/if}

            <div>
                <label class="label" for="note"
                    ><span class="label-text">Note</span></label
                >
                <textarea
                    bind:value={note}
                    placeholder="Note"
                    class="textarea-bordered textarea w-full max-w-xs"
                    name="note"
                />
            </div>
            <button class="btn" on:click|preventDefault={handleFormSubmit}
                >Submit</button
            >
        </form>
    </div>
</div>
