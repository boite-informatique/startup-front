import api from "src/services/api";
import type {
    CreateProjectProgress,
    ProjectProgress,
} from "./types/ProjectProgress";
import type { AxiosResponse } from "axios";

export async function CreateProjectProgress(
    projectId: number,
    input: CreateProjectProgress
): Promise<AxiosResponse<ProjectProgress>> {
    try {
        const response = await api.post(
            `/projects/${projectId}/progress`,
            input
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}
