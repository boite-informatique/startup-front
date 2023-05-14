export interface RegistrationInput {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    type: "student" | "teacher" | "staff";
    phone: string;
    avatar?: string;
    info: StudentInfo | TeacherInfo | StaffInfo;
    invitation?: InvitationType;
}

export interface StudentInfo {
    registration_num: string;
    establishment_id: number;
    filiere: string;
    specialty: string;
}

export interface StaffInfo {
    grade: string;
}

export interface TeacherInfo {
    registration_num: string;
    establishment_id: number;
    grade: string;
    specialty: string;
}

export interface InvitationType {
    projectId: number;
    token: string;
}
