import api from "src/services/api";
import type { AxiosResponse } from "axios";
import type {
    DefenseAuthorization,
    DefenseDocuments,
    DefenseDocumentsInput,
} from "./types/defense";

export async function AuthorizeProjectDefense( // for supervisors
    projectId: number,
    file: string
): Promise<AxiosResponse<DefenseAuthorization>> {
    try {
        const response = await api.post(
            `/projects/${projectId}/defense-authorization`,
            {
                uploadedFile: file,
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function saveDefenseDocuments( // for project owners
    projectId: number,
    input: DefenseDocumentsInput
): Promise<AxiosResponse<DefenseDocuments>> {
    try {
        const response = await api.post(
            `/projects/${projectId}/defense-doc`,
            input
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}
