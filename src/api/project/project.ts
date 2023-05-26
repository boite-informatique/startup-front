import type { AxiosResponse } from "axios";
import api from "../../services/api";
import type {
    GetProjectOutput,
    ProjectCreationInput,
} from "../types/project-types";
import type { PopulatedProject } from "./types/project-types";
import type { ProjectModificationInput } from "./types/project-modify";

export const getProjects = async (
    query
): Promise<AxiosResponse<GetProjectOutput[]>> => {
    try {
        const response: AxiosResponse<GetProjectOutput[]> = (await api.get(
            `/projects?type=${query}`
        )) as unknown as AxiosResponse<GetProjectOutput[]>;
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getProjectByID = async (
    ID: string
): Promise<AxiosResponse<PopulatedProject>> => {
    try {
        const response: AxiosResponse<PopulatedProject> = await api.get(
            `/projects/${ID}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const register = async (input: ProjectCreationInput) => {
    try {
        const response = await api.post("/projects/", input);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const updateProject = async (
    projectId: number,
    input: ProjectModificationInput
) => {
    try {
        const response = await api.patch(`/projects/${projectId}`, input);
        return response;
    } catch (error) {
        console.error(error);
    }
};
