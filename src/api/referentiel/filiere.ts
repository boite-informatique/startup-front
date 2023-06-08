import api from "../../services/api";

export const getFilieres = async () => {
    try {
        const response = await api.get(`/filiere`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const createFilieres = async (query: string) => {
    try {
        const response = await api.post(`/filiere`, { name: query });
        return response;
    } catch (error) {
        console.error(error);
    }
};
