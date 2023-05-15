import type { AxiosResponse } from "axios";
import api from "src/services/api";
import type {
    CreateTaskComment,
    TaskComment,
} from "./types/task-comments-types";

export async function CreateTaskComment(
    taskId: number,
    input: CreateTaskComment
): Promise<AxiosResponse<TaskComment>> {
    try {
        const response = await api.post(`/tasks/${taskId}/comments`, input);
        return response;
    } catch (error) {
        console.error(error);
    }
}
