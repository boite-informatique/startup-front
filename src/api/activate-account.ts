import api from "../services/api";

export const requestActivation = async (email: string) => {
    try {
        const response = await api.post("/users/request-activation", { email });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const activateAccount = async (email: string, token: string) => {
    try {
        const response = await api.patch(`/users/activate-account`, {
            email,
            token,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
