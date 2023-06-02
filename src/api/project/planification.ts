import api from "src/services/api";
import type {
    CreateProjectProgress,
    ProjectProgress,
} from "./types/ProjectProgress";
import type { AxiosResponse } from "axios";
import type { DefensePlanificationInput } from "./types/defense-planification-types";

export async function planSoutenance(
    projectId: number,
    input: DefensePlanificationInput
): Promise<AxiosResponse<ProjectProgress>> {
    try {
        const response = await api.post(
            `/projects/${projectId}/defense-planification`,
            input
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}
