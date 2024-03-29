import type { AxiosResponse } from "axios";
import api from "src/services/api";
import type { CreateProjectTask, ProjectTask } from "./types/tasks-types";

export async function CreateProjectTask(
    projectId: number,
    input: CreateProjectTask
): Promise<AxiosResponse<ProjectTask>> {
    try {
        const response = await api.post(`/projects/${projectId}/tasks`, input);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function UpdateProjectTask(
    projectId: number,
    input: Partial<CreateProjectTask>
): Promise<AxiosResponse<ProjectTask>> {
    try {
        const response = await api.patch(`/tasks/${projectId}`, input);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function GetProjecTasks(
    projectId: number
): Promise<AxiosResponse<ProjectTask[]>> {
    try {
        const response = await api.get(`/projects/${projectId}/tasks`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function GetTask(
    taskId: number
): Promise<AxiosResponse<ProjectTask>> {
    try {
        const response = await api.get(`/tasks/${taskId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function markTaskFinished(
    taskId: number | string,
    description?: string,
    resources?: string[]
): Promise<AxiosResponse<any>> {
    try {
        const response = await api.post(`/tasks/${taskId}/finished`, {
            taskId,
            description,
            resources,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}
