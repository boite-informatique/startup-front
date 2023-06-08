import api from "../../services/api";

export const getGradesForStaff = async () => {
    try {
        const response = await api.get(`/grade-staff`);
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
