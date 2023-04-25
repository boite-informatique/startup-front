import api from "../services/api";

interface RegistrationInput {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    type: "student" | "teacher" | "staff";
    activated?: boolean;
    phone: string;
    avatar?: string;
    roles: any[];
    info: StudentInfo | TeacherInfo | StaffInfo;
}

interface StudentInfo {
    registration_num: string;
    establishment: string;
    filiere: string;
    specialty: string;
}

interface TeacherInfo {
    registration_num: string;
    establishment: string;
    grade: string;
    specialty: string;
}

interface StaffInfo {
    grade: string;
}

export const register = async (input: RegistrationInput) => {
    try {
        const response = await api.post("/users/", { input });
        return response;
    } catch (error) {
        console.error(error);
    }
};