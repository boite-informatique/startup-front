import type { PopulatedProject } from "src/api/project/types/project-types";
import AddTaskForm from "./actions/AddTaskForm.svelte";
import AuthorizeDefense from "./actions/AuthorizeDefense.svelte";
import ProjectDefenseDocumentsUpload from "./actions/ProjectDefenseDocumentsUpload.svelte";
import ProjectModify from "./actions/ProjectModify.svelte";
import ReportProgress from "./actions/ReportProgress.svelte";
import ValidationForm from "./actions/ValidationForm.svelte";
import { periods as periodsStore } from "../../stores/periodsStore";
import PlanSoutenance from "./actions/PlanSoutenance.svelte";

function strToDatetime(str: string): number {
    return new Date(str).getTime();
}

const today = new Date().getTime();

let periods = {
    submission: false,
    validation: false,
    appeal: false,
    appealValidation: false,
};
periodsStore.subscribe((value) => {
    if (today > strToDatetime(value.submission)) {
        if (today <= strToDatetime(value.validation)) {
            periods.submission = true;
        } else if (today <= strToDatetime(value.appeal)) {
            periods.validation = true;
        } else if (today <= strToDatetime(value.appealValidation)) {
            periods.appeal = true;
        } else if (today <= strToDatetime(value.end)) {
            periods.appealValidation = true;
        }
    }
});

export const actions = {
    sc: [
        {
            name: "Validate",
            component: ValidationForm,
            disabled: (project: PopulatedProject): string => {
                if (project.validation.length == 0 && !periods.validation)
                    return "projectActions.validate.disabled not in validation period";
                if (
                    project.validation[0]?.decision !=
                        "accepted_with_reservation" &&
                    !periods.appealValidation
                )
                    return "projectActions.validate.disabled not in appeal validation period";
                if (
                    project.validation[0]?.decision !==
                    "accepted_with_reservation"
                )
                    return "projectActions.validate.disabled already validated";

                return null;
            },
        },
    ],
    supervisor: [
        {
            name: "Add Task",
            component: AddTaskForm,
            disabled: (project: PopulatedProject): string => {
                if (project.validation[0]?.decision != "favorable")
                    return "projectActions.addTask.disabled not accepted";
            },
        },
        {
            name: "Report Progress",
            component: ReportProgress,
            disabled: (project: PopulatedProject): string => {
                if (project.validation[0]?.decision != "favorable")
                    return "projectActions.addTask.disabled not accepted";
            },
        },
        {
            name: "Authorize Defense",
            component: AuthorizeDefense,
            disabled: (project: PopulatedProject): string => {
                if (project.validation[0]?.decision != "favorable")
                    return "projectActions.addTask.disabled not accepted";
            },
        },
    ],
    owner: [
        {
            name: "Edit Project",
            component: ProjectModify,
            disabled: (project: PopulatedProject): string => {
                // return null;

                if (project.validation[0]?.decision == "unfavorable")
                    return "projectActions.editProject.disabled rejeceted";

                if (
                    !periods.submission ||
                    (project.validation[0]?.decision ==
                        "accepted_with_reservation" &&
                        !periods.appeal)
                )
                    return;
                ("projectActions.editProject.disabled only submission or validation recours");

                return null;
            },
        },
        {
            name: "Upload Defense Documents",
            component: ProjectDefenseDocumentsUpload,
            disabled: (project: PopulatedProject): string => {
                if (project.DefenseAuthorization == null)
                    return "projectActions.uploadDefenseDocuments.disabled no defense authorization";
                if (project.DefenseDocument != null)
                    return "projectActions.uploadDefenseDocuments.disabled already uploaded";

                return null;
            },
        },
    ],
    rs: [
        {
            name: "Plan Defense",
            component: PlanSoutenance,
            disabled: (project: PopulatedProject): string => {
                if (project.DefenseAuthorization == null)
                    return "projectActions.planDefense.disabled no defense authorization";
                if (project.DefensePlanification != null)
                    return "projectActions.planDefense.disabled already planned";
            },
        },
    ],
};
