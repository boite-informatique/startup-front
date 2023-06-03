import { derived } from "svelte/store";
import { currentUserInfo } from "./currentUserInfo";
import { userPermissions } from "./userPermissions";
import routes from "src/config/routesList";

export const routesStore = derived(
    [currentUserInfo, userPermissions],
    ([$currentUserInfo, $userPermissions], set) => {
        let userIsAdmin = $userPermissions.some(
            (obj) => obj.name === "canManageAll"
        );
        let userIsStudent = $currentUserInfo?.type == "student";

        let userIsTeacher = $currentUserInfo?.type == "teacher";
        let userIsSc = $userPermissions.some((obj) => obj.name === "sc");
        let userIsRs = $userPermissions.some((obj) => obj.name === "rs"); // responsable de stage

        if (userIsSc) {
            set(routes.sc);
        } else if (userIsAdmin) {
            set(routes.admin);
        } else if (userIsTeacher) {
            set(routes.teacher);
        } else if (userIsStudent) {
            set(routes.student);
        } else if (userIsRs) {
            set(routes.rs);
        } else {
            set(routes.guest);
        }
    },
    []
);
