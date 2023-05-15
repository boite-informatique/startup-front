import type { AxiosResponse } from "axios";
import api from "src/services/api";
import type { ProjectValidation } from "../types/project-types";
import type { CreateProjectValidation } from "./types/validation-types";

export async function createValidation(
    projectId: number,
    input: CreateProjectValidation
): Promise<AxiosResponse<ProjectValidation>> {
    try {
        const response = await api.post(
            `/projects/${projectId}/validate`,
            input
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}
