import type { PopulatedProject } from "src/api/project/types/project-types";
import AddTaskForm from "./actions/AddTaskForm.svelte";
import AuthorizeDefense from "./actions/AuthorizeDefense.svelte";
import ProjectDefenseDocumentsUpload from "./actions/ProjectDefenseDocumentsUpload.svelte";
import ProjectModify from "./actions/ProjectModify.svelte";
import ReportProgress from "./actions/ReportProgress.svelte";
import ValidationForm from "./actions/ValidationForm.svelte";
import { get } from "svelte/store";
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
            disabled: (project: PopulatedProject): boolean => {
                if (
                    (project.validation.length == 0 && periods.validation) ||
                    (project.validation[0]?.decision ==
                        "accepted_with_reservation" &&
                        periods.appeal)
                ) {
                    return true;
                }
                return false;
            },
        },
    ],
    supervisor: [
        {
            name: "Add Task",
            component: AddTaskForm,
            disabled: (project: PopulatedProject): boolean => {
                return Boolean(project.validation[0]?.decision != "favorable");
            },
        },
        {
            name: "Report Progress",
            component: ReportProgress,
            disabled: (project: PopulatedProject): boolean => {
                return Boolean(project.validation[0]?.decision != "favorable");
            },
        },
        {
            name: "Authorize Defense",
            component: AuthorizeDefense,
            disabled: (project: PopulatedProject): boolean => {
                return Boolean(project.validation[0]?.decision != "favorable");
            },
        },
    ],
    owner: [
        {
            name: "Edit Project",
            component: ProjectModify,
            disabled: (project: PopulatedProject): boolean => {
                return false;
                return !(
                    (project.validation.length == 0 && periods.submission) ||
                    (project.validation[0]?.decision ==
                        "accepted_with_reservation" &&
                        periods.appeal)
                );
            },
        },
        {
            name: "Upload Defense Documents",
            component: ProjectDefenseDocumentsUpload,
            disabled: (project: PopulatedProject): boolean => {
                return project.DefenseAuthorization == null;
            },
        },
    ],
    rs: [
        {
            name: "Plan Defense",
            component: PlanSoutenance,
            disabled: (project: PopulatedProject): boolean => {
                return (
                    project.DefenseAuthorization == null ||
                    project.DefensePlanification != null
                );
            },
        },
    ],
};
