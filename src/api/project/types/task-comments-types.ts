import type { User } from "src/api/types/user-types";

export type TaskComment = {
    id: number;
    task_id: number;
    author_id: number;
    body: string;
    created_at: Date;
    updated_at: Date;
};

export type TaskCommentWithAuthor = TaskComment & {
    author: User;
};

export type CreateTaskComment = {
    body: string;
};
