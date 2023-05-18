import type { User } from "src/api/types/user-types";

export type ProjectProgress = {
    id: number;
    project_id: number;
    user_id: number;
    percentage: number;
    note: string;
    created_at: Date;
};

export type CreateProjectProgress = {
    percentage: number;
    note: string;
};

export type ProjectProgressWithUser = ProjectProgress & {
    user: User;
};
