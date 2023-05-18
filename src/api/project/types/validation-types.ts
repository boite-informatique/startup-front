import type { User } from "src/api/types/user-types";

export type CreateProjectValidation = {
    decision: ProjectValidationDecision;
    reservation?: ProjectValidationReservation;
    note: string;
};

export type ProjectValidation = {
    id: number;
    project_id: number;
    decision: ProjectValidationDecision;
    reservation: ProjectValidationReservation | null;
    note: string;
    created_at: Date;
    validator_id: number;
};

export type ProjectValidationDecision =
    | "favorable"
    | "unfavorable"
    | "accepted_with_reservation";

export type ProjectValidationReservation = "major" | "minor";

export type ProjectValidationWithUser = ProjectValidation & {
    validator: User;
};
