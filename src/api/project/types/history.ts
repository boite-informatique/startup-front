export type ProjectHistory = {
    id: number;
    project_id: number;
    user_id: number;
    field: string;
    old_value: string;
    new_value: string;
    changed_at: Date;
};
