import type { User } from "src/api/types/user-types";

export type CreateProjectTask = {
    title: string;
    description: string;
    deadline: Date;
    resources: string[];
};

export type ProjectTask = {
    id: number;
    project_id: number;
    user_id: number;
    title: string;
    description: string;
    deadline: Date;
    resources: string[];
};

export type ProjectTaskWithUser = ProjectTask & {
    user: User;
};
