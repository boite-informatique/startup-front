import api from "../services/api";

export const forgotPasswordFirstStep = async (token: string) => {
    try {
        const response = await api.post("/users/activate", { token });
        return response;
    } catch (error) {
        console.error(error);
    }
};
