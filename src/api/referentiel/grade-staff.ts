import api from "../../services/api";

export const getGradesForStaff = async (query: string) => {
    try {
        const response = await api.get(`/grade-staff/?search=${query}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const createGradesForStaff = async (query: string) => {
    try {
        const response = await api.post(`/grade-staff`, { name: query });
        return response;
    } catch (error) {
        console.error(error);
    }
};
