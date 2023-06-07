import type { PopulatedProject } from "src/api/project/types/project-types";
import AddTaskForm from "./actions/AddTaskForm.svelte";
import AuthorizeDefense from "./actions/AuthorizeDefense.svelte";
import ProjectDefenseDocumentsUpload from "./actions/ProjectDefenseDocumentsUpload.svelte";
import ProjectModify from "./actions/ProjectModify.svelte";
import ReportProgress from "./actions/ReportProgress.svelte";
import ValidationForm from "./actions/ValidationForm.svelte";
import PlanSoutenance from "./actions/PlanSoutenance.svelte";
import SoutenanceDeliberationForm from "./actions/SoutenanceDelibrationForm.svelte";
import { currentPeriod } from "src/stores/currentPeriod";

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
currentPeriod.subscribe((value) => {
    if (value == "Within submission phase") {
        periods.submission = true;
    } else if (value == "Within validation phase") {
        periods.validation = true;
    } else if (value == "Within appeal phase") {
        periods.appeal = true;
    } else if (value == "Within appeal validation phase") {
        periods.appealValidation = true;
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
        {
            name: "Soutenance Deliberation",
            component: SoutenanceDeliberationForm,
            disabled: (project: PopulatedProject): string => {
                if (project.DefensePlanification == null)
                    return "projectActions.soutenanceDeliberation.disabled no defense planification";

                if (
                    new Date(project.DefensePlanification.date).getTime() >
                    today
                )
                    return "projectActions.soutenanceDeliberation.disabled not yet";

                if (project.Delibration != null)
                    return "projectActions.soutenanceDeliberation.disabled already deliberated";
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
