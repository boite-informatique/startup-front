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

type DefenseNature = "public" | "private";
