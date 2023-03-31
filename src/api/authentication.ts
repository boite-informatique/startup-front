import api from "../services/api";

const authenticateUser = async (email: string, password: string) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default authenticateUser;
