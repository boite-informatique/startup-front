<script lang="ts">
    export let initialPercentage = 50;
    let percentage: number = initialPercentage; // TODO : initialize with latest project progress's percentage
    let note: string = "";
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
        </form>
    </div>
</div>
