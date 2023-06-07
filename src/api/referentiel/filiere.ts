import api from "../../services/api";

export const getFilieres = async (query: string) => {
    try {
        const response = await api.get(`/filiere/?search=${query}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};
