<script lang="ts">
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";
    import { ModifyPeriods } from "src/api/periods";
    import { periods, type PeriodsType } from "src/stores/periodsStore";

    let newPeriods: PeriodsType = $periods;

    const today = new Date().toISOString().split("T")[0];
    const dispatch = createEventDispatcher();

    $: console.log(newPeriods);
    const handleFormSubmit = async () => {
        try {
            let response = await ModifyPeriods(newPeriods);

            console.log(response);
            switch (response.status) {
                case 200:
                    indicateSuccess(
                        dispatch,
                        "Project periods updated succesfully"
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

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal z-[9999] cursor-pointer">
    <label class="modal-box relative" for="">
        <!-- modal content starts here -->
        <div class="flex items-center justify-center">
            <div class="rounded-lg py-8">
                <h2 class="mb-4 text-center text-2xl font-bold">
                    Edit Periods
                </h2>
                <form
                    class="flex flex-col justify-start space-y-4"
                    action="#"
                    on:submit|preventDefault={handleFormSubmit}
                >
                    <div>
                        <label class="label" for="title"
                            ><span class="label-text">Project Submission</span
                            ></label
                        >
                        <input
                            bind:value={newPeriods.submission.start}
                            type="date"
                            min={today}
                            name="submission"
                            class="input-bordered input w-full max-w-xs"
                        />

                        <input
                            bind:value={newPeriods.submission.end}
                            type="date"
                            min={newPeriods.submission.start}
                            name="submission"
                            class="input-bordered input w-full max-w-xs"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text">Project Validation</span
                            ></label
                        >
                        <input
                            bind:value={newPeriods.validation.start}
                            type="date"
                            min={newPeriods.submission.end}
                            class="input-bordered input w-full max-w-xs"
                            name="validation"
                        />
                        <input
                            bind:value={newPeriods.validation.end}
                            type="date"
                            min={newPeriods.validation.start}
                            class="input-bordered input w-full max-w-xs"
                            name="validation"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text">Project Appeal</span
                            ></label
                        >
                        <input
                            bind:value={newPeriods.appeal.start}
                            type="date"
                            min={newPeriods.validation.end}
                            class="input-bordered input w-full max-w-xs"
                            name="appeal"
                        />

                        <input
                            bind:value={newPeriods.appeal.end}
                            type="date"
                            min={newPeriods.appeal.start}
                            class="input-bordered input w-full max-w-xs"
                            name="appeal"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text"
                                >Project Appeal Validation</span
                            ></label
                        >
                        <input
                            bind:value={newPeriods.appealValidation.start}
                            type="date"
                            min={newPeriods.appeal.end}
                            class="input-bordered input w-full max-w-xs"
                            name="appeal"
                        />

                        <input
                            bind:value={newPeriods.appealValidation.end}
                            type="date"
                            min={newPeriods.appealValidation.start}
                            class="input-bordered input w-full max-w-xs"
                            name="appeal"
                        />
                    </div>
                    <button class="btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </label>
</label>

<label for="my-modal-4" class="btn-primary btn">Edit Periods</label>
