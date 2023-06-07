import api from "../../services/api";

export const getGradesForStaff = async (query: string) => {
    try {
        const response = await api.get(`/grade-staff/?search=${query}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};
