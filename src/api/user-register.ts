import api from "../services/api";

interface registrationInput {
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
    info: any;
}

export const register = async (input: registrationInput) => {
    try {
        const response = await api.post("/users/", { input });
        return response;
    } catch (error) {
        console.error(error);
    }
};
