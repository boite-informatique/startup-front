<script lang="ts">
    import { CreateProjectProgress } from "src/api/project/ReportProgress";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/ts/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";

    export let initialPercentage = 50;
    export let projectId = 0;

    const dispatch = createEventDispatcher();
    let percentage: number = initialPercentage; // TODO : initialize with latest project progress's percentage
    let note: string = "";

    const handleFormSubmit = async () => {
        try {
            let response = await CreateProjectProgress(projectId, {
                percentage,
                note,
            });
            console.log(response);

            switch (response.status) {
                case 201:
                    indicateSuccess(dispatch, "Progress Reported successfully");
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
        <h2 class="mb-4 text-center text-2xl font-bold">
            Report Project's Progress
        </h2>
        <form class="flex flex-col justify-start space-y-4">
            <div>
                <label for="percentage" class="label"
                    ><div class="label-text">
                        Progress Percentage : {percentage}%
                    </div>
                </label>
                <input
                    bind:value={percentage}
                    type="range"
                    min="0"
                    max="100"
                    name="percentage"
                    class="range w-full {percentage < initialPercentage &&
                        'range-warning'}"
                />
            </div>
            <div>
                <label class="label" for="note"
                    ><span class="label-text">Note</span></label
                >
                <textarea
                    bind:value={note}
                    class="textarea-bordered textarea w-full"
                    placeholder="Description"
                    name="note"
                />
            </div>
            <button class="btn" on:click|preventDefault={handleFormSubmit}
                >Submit</button
            >
        </form>
    </div>
</div>
