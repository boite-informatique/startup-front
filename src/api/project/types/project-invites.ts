export type ProjectInvitees = {
    id: number;
    project_id: number;
    type: ProjectInvitationType;
    email: string;
    token: string;
};

type ProjectInvitationType = "supervisor" | "member" | "co_supervisor";
