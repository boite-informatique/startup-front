import api from "src/services/api";
import type { AxiosResponse } from "axios";
import type {
    Delibration,
    DelibrationInput,
} from "./types/defense-deliberation";

export async function createDelibration(
    projectId: number,
    input: DelibrationInput
): Promise<AxiosResponse<Delibration>> {
    try {
        const response = await api.post(
            `/projects/${projectId}/delibration`,
            input
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}
