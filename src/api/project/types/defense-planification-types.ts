export type DefensePlanification = {
    id: number;
    project_id: number;
    jury_president: number;
    date: Date;
    establishement_id: number;
    mode: DefenseMode;
    nature: DefenseNature;
};

export type DefenseMode = "onsite" | "online";

export type DefenseNature = "public" | "private";

export type DefensePlanificationInput = {
    jury_president: string;
    jury_members: string[];
    jury_invities: string[];
    location?: string;
    date: Date;
    mode: DefenseMode;
    nature: DefenseNature;
};
