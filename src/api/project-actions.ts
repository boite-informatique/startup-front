import api from "../services/api";

export const validateProject = async (email: string) => {
    try {
        const response = await api.post("/users/forget-password", { email });
        return response;
    } catch (error) {
        console.error(error);
    }
};
