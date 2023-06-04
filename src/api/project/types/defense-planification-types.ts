import type { User } from "src/api/types/user-types";

export type DefensePlanification = {
    id: number;
    project_id: number;
    jury_president_id: number | null;
    president: User;
    jury_members: User[];
    jury_invities: User[];
    date: Date;
    location: string | null;
    mode: DefenseMode;
    nature: DefenseNature;
    DefenseInvitees: DefenseInvitees[];
};

export type DefenseInvitees = {
    id: number;
    defensePlan_id: number;
    type: DefenseInvitationType;
    email: string;
};

export type DefenseInvitationType = "member" | "president" | "invite";

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
