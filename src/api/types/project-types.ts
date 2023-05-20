import type { User } from "./user-types";

export type ProjectCreationInput = {
    resume: string;
    brand_name: string;
    product_name: string;
    logo?: string;
    type: "startup" | "patent";

    members: string[];
    supervisors: string[];
    co_supervisor?: string;
};

export type GetProjectOutput = {
    id: number;
    type: "startup" | "patent";
    resume: string;
    brand_name: string;
    product_name: string;
    logo?: string;
    created_at: Date;

    owner_id: number;
    owner: User;
    members: User[];
    supervisors: User[];

    validation: ProjectValidation;
    ProjectProgress: any;
    ProjectInvitees: any;
    history: any;
    DefensePlanification: any;
    DefenseAuthorization: any;
    ProjectTask: any[];
};

export type ProjectValidation = {
    id: number;
    project_id: number;
    decision: "favorable" | "unfavorable" | "accepted_with_reservation";
    reservation?: "major" | "minor";
    note: string;
    created_at: Date;
    validator_id: number;
};
