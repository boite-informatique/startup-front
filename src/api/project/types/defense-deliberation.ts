import type { User } from "src/api/types/user-types";

export type Delibration = {
    id: number;
    project_id: number;
    status: DelibrationStatus;
};

export type DelibrationInput = {
    status: DelibrationStatus;
    evaluations: EvaluationInput[];
};

export type EvaluationInput = {
    member_id: number;
    note: number;
    appreciation: string;
};
export type PopulatedDelibration = Delibration & {
    evaluations: PopulatedEvaluation[];
    reservations: ProjectReserve;
};

export type DelibrationStatus =
    | "accepted_with_reservation"
    | "accepted"
    | "refused";

export type Evaluation = {
    id: number;
    member_id: number;
    delibration_id: number;
    note: number;
    appreciation: string;
};

export type PopulatedEvaluation = Evaluation & {
    member: User;
};

export type ProjectReserve = {
    id: number;
    project_id: number;
    delibration_id: number;
    description: string;
    documents: string[];
    reserveLifting: boolean;
};
