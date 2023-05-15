export type TaskCompletionReport = {
    id: number;
    task_id: number;
    description: string;
    resources: string[];
};

export type CreateTaskCompletionReport = {
    description: string;
    resources: string[];
};
