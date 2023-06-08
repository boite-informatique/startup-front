import api from "../../services/api";

export const getEstablishments = async () => {
    try {
        const response = await api.get(`/establishments`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const createEstablishments = async (query: string) => {
    try {
        const response = await api.post(`/establishments`, { name: query });
        return response;
    } catch (error) {
        console.error(error);
    }
};
