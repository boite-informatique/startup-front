import type { PopulatedProject } from "src/api/project/types/project-types";
import type { UserWithRelationsAndEstablishment } from "src/api/types/user-types";

export type UserType =
    | "owner"
    | "supervisor"
    | "sc"
    | "rs"
    | "member"
    | "jury-president";

// returns user type relative to this project
export const getUserType = (
    project: PopulatedProject,
    currentUser: UserWithRelationsAndEstablishment,
    userPermissions: any
): UserType => {
    if (project?.owner_id == currentUser?.id) {
        return "owner";
    }

    if (project?.DefensePlanification?.jury_president_id == currentUser?.id) {
        return "jury-president";
    }
    if (
        project.supervisors.some((s) => s?.id == currentUser?.id) ||
        project?.co_supervisor?.id == currentUser?.id
    ) {
        return "supervisor";
    }

    if (userPermissions.some((obj) => obj.name === "sc")) {
        return "sc";
    }

    if (userPermissions.some((obj) => obj.name === "rs")) {
        return "rs";
    }

    return "member";
};
