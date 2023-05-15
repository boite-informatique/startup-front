import type { AxiosResponse } from "axios";
import api from "src/services/api";
import type {
    CreateTaskCompletionReport,
    TaskCompletionReport,
} from "./types/task-completion-report-types";

export async function CreateTaskCompletionReport(
    taskId: number,
    input: CreateTaskCompletionReport
): Promise<AxiosResponse<TaskCompletionReport>> {
    try {
        const response = await api.post(`/tasks/${taskId}/finished`, input);
        return response;
    } catch (error) {
        console.error(error);
    }
}
