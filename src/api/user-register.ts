import api from "../services/api";
import type { RegistrationInput } from "./types/registration-types";

export const register = async (
    input: RegistrationInput,
    invitation: boolean = false
) => {
    try {
        const response = await api.post(
            `/users/?invitation=${invitation}`,
            input
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};
