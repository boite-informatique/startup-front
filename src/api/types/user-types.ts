import type { Role } from "./role-types";

export type User = {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    date_of_birth: Date;
    location_of_birth: string;
    sex: "Male" | "Female";
    type: "Student" | "Teacher" | "Staff";
};

export type UserWithRelations = User & {
    roles: Role[];
    teacher?: Teacher;
    student?: Student;
};

type Teacher = {
    id: number;
    user_id: number;
    domain: string;
    academic_rank: string;
    establishement: number;
};

type Student = {
    id: number;
    user_id: number;
    domain: string;
    establishement: number;
    faculty: string | null;
    departement: string;
    filiere: string;
    level: number;
    section: string;
    group: number;
};
