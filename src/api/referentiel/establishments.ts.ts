import api from "../../services/api";

export const getEstablishments = async (query: string) => {
    try {
        const response = await api.get(`/establishments/?search=${query}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};
