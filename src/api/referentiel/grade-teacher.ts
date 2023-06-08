import api from "../../services/api";

export const getGradesForTeachers = async (query: string) => {
    try {
        const response = await api.get(`/grade-teacher/?search=${query}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const createGradesForTeachers = async (query: string) => {
    try {
        const response = await api.post(`/grade-teacher`, { name: query });
        return response;
    } catch (error) {
        console.error(error);
    }
};
