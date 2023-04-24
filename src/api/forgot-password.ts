import api from "../services/api";

export const forgotPasswordFirstStep = async (email: string) => {
    try {
        const response = await api.post("/users/forgotpassword", { email });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const ChangePassword = async (newPassword: string, token: string) => {
    try {
        const response = await api.post(`/users/forgotpassword/${token}`, {
            password: newPassword,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
