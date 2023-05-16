import AddTaskForm from "./actions/AddTaskForm.svelte";
import AuthorizeDefense from "./actions/AuthorizeDefense.svelte";
import ProjectDefenseDocumentsUpload from "./actions/ProjectDefenseDocumentsUpload.svelte";
import ProjectModify from "./actions/ProjectModify.svelte";
import ReportProgress from "./actions/ReportProgress.svelte";
import ValidationForm from "./actions/ValidationForm.svelte";

export const actions = {
    sc: [
        {
            name: "Validate",
            component: ValidationForm,
        },
    ],
    supervisor: [
        {
            name: "Add Task",
            component: AddTaskForm,
        },
        {
            name: "Report Progress",
            component: ReportProgress,
        },
        {
            name: "Authorize Defense",
            component: AuthorizeDefense,
        },
    ],
    owner: [
        {
            name: "Edit Project",
            component: ProjectModify,
        },
        {
            name: "Upload Defense Documents",
            component: ProjectDefenseDocumentsUpload,
        },
    ],
};
