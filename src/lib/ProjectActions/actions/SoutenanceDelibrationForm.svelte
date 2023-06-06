<script lang="ts">
    import { createDelibration } from "src/api/project/delibration";
    import type { DelibrationStatus } from "src/api/project/types/defense-deliberation";
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { createValidation } from "src/api/project/validation";
    import UserInfoAvatarName from "src/lib/components/UserInfoAvatarName.svelte";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";

    export let project: PopulatedProject;
    const dispatch = createEventDispatcher();

    let status: DelibrationStatus = "accepted";
    let memberEvaluations = project.members.map((member) => ({
        member,
        evaluation: {
            member_id: member.id,
            note: 0,
            appreciation: "",
        },
    }));

    const handleFormSubmit = async () => {
        try {
            let response = await createDelibration(project.id, {
                status,
                evaluations: memberEvaluations.map(
                    (evaluation) => evaluation.evaluation
                ),
            });

            switch (response.status) {
                case 201:
                    indicateSuccess(
                        dispatch,
                        $_("project.delibration created successfully")
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
        <h2 class="mb-8 text-center text-2xl font-bold">
            {$_("project.delibration header")}
        </h2>
        <form
            class="flex flex-col justify-start space-y-4"
            action="#"
            method="POST"
            on:submit|preventDefault={handleFormSubmit}
        >
            <div>
                <label class="label" for="decision"
                    ><span class="label-text"
                        >{$_("project.delibration decision")}</span
                    ></label
                >
                <select
                    bind:value={status}
                    name="decision"
                    class="select-bordered select w-full max-w-xs"
                >
                    <option disabled selected
                        >{$_(
                            "project.delibration choose your decision"
                        )}</option
                    >
                    <option value="accepted"
                        >{$_("project.delibration accepted")}</option
                    >
                    <option value="accepted_with_reservation"
                        >{$_(
                            "project.delibration accepted with reserve"
                        )}</option
                    >
                    <option value="refused"
                        >{$_("project.delibration rejected")}</option
                    >
                </select>
            </div>
            <div>
                {$_("project.delibration Evaluations")}
            </div>
            {#each memberEvaluations as { member, evaluation }, i}
                <div>
                    <UserInfoAvatarName user={member} />

                    <label class="label" for="note"
                        ><span class="label-text"
                            >{$_("project.delibration note")}</span
                        ></label
                    >
                    <div
                        class="flex w-full max-w-xs flex-row items-center gap-4"
                    >
                        <input
                            type="number"
                            class="input-bordered input w-5/12"
                            min="0"
                            max="20"
                            step="0.25"
                            bind:value={evaluation.note}
                        />
                        <input
                            type="range"
                            class="range"
                            min="0"
                            max="20"
                            step="0.25"
                            bind:value={evaluation.note}
                        />
                    </div>
                    <label class="label" for="appreciation"
                        ><span class="label-text"
                            >{$_("project.delibration appreciation")}</span
                        ></label
                    >
                    <input
                        type="text"
                        class="input-bordered input w-full max-w-xs"
                        bind:value={evaluation.appreciation}
                    />
                </div>
                <div class="divider" />
            {/each}
            <button type="submit" class="btn">Submit</button>
        </form>
    </div>
</div>
