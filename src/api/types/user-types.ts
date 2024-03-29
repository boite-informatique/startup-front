import type { ReferentialItem } from "../referentiel/types";
import type { Role } from "./role-types";

export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    type: UserType;
    activated: boolean;
    phone: string;
    avatar: string | null;
};

export type UserType = "student" | "teacher" | "staff";

export type Student = {
    id: number;
    registration_num: string;
    establishment_id: number;
    filiere: string;
    specialty: string;
};

export type Teacher = {
    id: number;
    registration_num: string;
    establishment_id: number;
    grade: string;
    specialty: string;
};

export type Staff = {
    id: number;
    grade: string;
};

export type UserWithRelationsAndEstablishment = User & {
    student: Student & {
        establishment: ReferentialItem;
        filiere: ReferentialItem;
        speciality: ReferentialItem;
    };
    teacher: Teacher & {
        establishment: ReferentialItem;
        grade: ReferentialItem;
        speciality: ReferentialItem;
    };
    staff: Staff & {
        grade: ReferentialItem;
    };
    roles: Role[];
};
