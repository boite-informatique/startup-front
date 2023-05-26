import type { User } from "src/api/types/user-types";
import type { ProjectValidationWithUser } from "./validation-types";
import type { ProjectProgressWithUser } from "./ProjectProgress";
import type { ProjectTaskWithUser } from "./tasks-types";
import type { ProjectHistoryWithUser } from "./history";
import type { DefenseAuthorizationWithUser, DefenseDocuments } from "./defense";
import type { DefensePlanification } from "./defense-planification-types";
import type { ProjectInvitees } from "./project-invites";

export type Project = {
    id: number;
    type: ProjectType;
    resume: string;
    brand_name: string;
    product_name: string;
    logo?: string | null;
    created_at: Date;
    owner_id: number;
};

export type ProjectType = "startup" | "patent";

export type PopulatedProject = Project & {
    owner: User;
    members: User[];
    supervisors: User[];
    co_supervisor: User;
    validation: ProjectValidationWithUser[];
    ProjectProgress: ProjectProgressWithUser[];
    ProjectTask: ProjectTaskWithUser[];
    history: ProjectHistoryWithUser[];
    DefenseAuthorization: DefenseAuthorizationWithUser;
    DefenseDocument: DefenseDocuments;
    DefensePlanification: DefensePlanification;
    ProjectInvitees: ProjectInvitees[];
};
