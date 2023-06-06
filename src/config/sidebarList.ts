import ProjectDefenseDelibration from "src/lib/ProjectPage/ProjectDefenseDelibration.svelte";
import ProjectDefensePage from "src/lib/ProjectPage/ProjectDefensePage.svelte";
import ProjectDefensePlanification from "src/lib/ProjectPage/ProjectDefensePlanification.svelte";
import ProjectGeneralInfo from "src/lib/ProjectPage/ProjectGeneralInfo.svelte";
import ProjectHistoryPage from "src/lib/ProjectPage/ProjectHistoryPage.svelte";
import ProjectMembersPage from "src/lib/ProjectPage/ProjectMembersPage.svelte";
import ProjectProgressPage from "src/lib/ProjectPage/ProjectProgressPage.svelte";
import ProjectSupervisorsPage from "src/lib/ProjectPage/ProjectSupervisorsPage.svelte";
import ProjectValidationPage from "src/lib/ProjectPage/ProjectValidationPage.svelte";
import ProjectTasks from "src/lib/components/project/ProjectTasks.svelte";

// this file stores the elements that will appear in the sidebar for each user, if you want to add an element just change the array.
export const sidebarLists = {
    admin: [
        { path: "users", name: "users" },
        { path: "roles", name: "roles" },
        { path: "periods", name: "periods" },
        { path: "announcements", name: "announcements" },
    ],
    project: [
        {
            path: "general",
            name: "general information",
            component: ProjectGeneralInfo,
        },
        {
            path: "validation",
            name: "validation",
            component: ProjectValidationPage,
        },
        { path: "members", name: "members", component: ProjectMembersPage },
        {
            path: "supervisors",
            name: "supervisors",
            component: ProjectSupervisorsPage,
        },
        {
            path: "history",
            name: "edit history",
            component: ProjectHistoryPage,
        },
        { path: "tasks", name: "tasks", component: ProjectTasks },
        { path: "progress", name: "progress", component: ProjectProgressPage },
        {
            path: "soutenance-docs",
            name: "defense",
            component: ProjectDefensePage,
        },
        {
            path: "soutenance-plan",
            name: "defense plan",
            component: ProjectDefensePlanification,
        },
        {
            path: "soutenance-delibration",
            name: "soutenance-delibration",
            component: ProjectDefenseDelibration,
        },
    ],
};
