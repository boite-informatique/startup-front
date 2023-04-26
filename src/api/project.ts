import api from "../services/api";

export const getProjects = async () => {
    // this returns an array of the projects that the user has access to, if he is supervisor he will get all projects he supervises, if he is project holder he will get an array of only on project, admin will get all projects
    try {
        const response = await api.get(`/projects`);
        return response;
    } catch (error) {
        console.error(error);
    }
};
