<script lang="ts">
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";
    import { ModifyPeriods } from "src/api/periods";
    import { periods } from "src/stores/periodsStore";

    let submission = $periods.submission;
    let validation = $periods.validation;
    let appeal = $periods.appeal;
    let appealValidation = $periods.appealValidation;
    let end = $periods.end;

    const today = new Date().toISOString().split("T")[0];
    const dispatch = createEventDispatcher();

    const handleFormSubmit = async () => {
        try {
            let response = await ModifyPeriods({
                submission: submission,
                validation: validation,
                appeal: appeal,
                appealValidation: appealValidation,
                end: end,
            });

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
<label for="my-modal-4" class="modal cursor-pointer">
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
                            ><span class="label-text"
                                >Project Submission Start Date</span
                            ></label
                        >
                        <input
                            bind:value={submission}
                            type="date"
                            min={today}
                            name="submission"
                            class="input-bordered input w-full max-w-xs"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text"
                                >Project Validation Start Date</span
                            ></label
                        >
                        <input
                            bind:value={validation}
                            type="date"
                            min={submission}
                            class="input-bordered input w-full max-w-xs"
                            name="validation"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text"
                                >Project Appeal Start Date</span
                            ></label
                        >
                        <input
                            bind:value={appeal}
                            type="date"
                            min={validation}
                            class="input-bordered input w-full max-w-xs"
                            name="appeal"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text"
                                >Project Appeal Validation Start Date</span
                            ></label
                        >
                        <input
                            bind:value={appealValidation}
                            type="date"
                            min={appeal}
                            class="input-bordered input w-full max-w-xs"
                            name="appeal"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text"
                                >Project Appeal Validation End Date</span
                            ></label
                        >
                        <input
                            bind:value={end}
                            type="date"
                            min={appealValidation}
                            class="input-bordered input w-full max-w-xs"
                            name="end"
                        />
                    </div>
                    <button class="btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </label>
</label>

<label for="my-modal-4" class="btn-primary btn">Edit Periods</label>
