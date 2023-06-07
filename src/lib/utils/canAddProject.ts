import { currentUserInfo } from "src/stores/currentUserInfo";
import { get } from "svelte/store";

export const canAddProject = (hasProjects: boolean, queryType: string) => {
    const currentUserType = get(currentUserInfo)?.type;

    if (queryType != "my") return false;
    if (currentUserType == "student" && hasProjects) {
        return false;
    } else {
        return true;
    }
};
