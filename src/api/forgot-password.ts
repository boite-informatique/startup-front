import api from "../services/api";

export const forgotPasswordFirstStep = async (email: string) => {
    try {
        const response = await api.post("/users/forget-password", { email });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const ChangePassword = async (
    email: string,
    password: string,
    token: string
) => {
    try {
        const response = await api.patch(`/users/reset-password/`, {
            email,
            password,
            token,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
