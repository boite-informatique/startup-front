import api from "../services/api";

export type GetEstablishmentsOutput = {
    id: number;
    name: string;
    location: string;
};
export const getEstablishments = async (query: string) => {
    try {
        const response = await api.get(`/establishments/?search=${query}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};
