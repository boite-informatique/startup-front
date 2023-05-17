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
