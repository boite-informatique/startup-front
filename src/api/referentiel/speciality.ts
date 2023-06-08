import api from "../../services/api";

export const getSpecialities = async () => {
    try {
        const response = await api.get(`/speciality`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const createSpecialities = async (query: string) => {
    try {
        const response = await api.post(`/speciality`, { name: query });
        return response;
    } catch (error) {
        console.error(error);
    }
};
