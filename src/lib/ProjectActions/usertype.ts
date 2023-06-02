import type { PopulatedProject } from "src/api/project/types/project-types";
import type { UserWithRelationsAndEstablishment } from "src/api/types/user-types";

export type UserType = "owner" | "supervisor" | "sc" | "member";

// returns user type relative to this project
export const getUserType = (
    project: PopulatedProject,
    currentUser: UserWithRelationsAndEstablishment,
    userPermissions: any
): UserType => {
    if (project.owner_id == currentUser.id) {
        return "owner";
    }

    if (
        project.supervisors.some((s) => s.id == currentUser.id) ||
        project?.co_supervisor?.id == currentUser.id
    ) {
        return "supervisor";
    }

    if (userPermissions.some((obj) => obj.name === "sc")) {
        return "sc";
    }

    return "member";
};
