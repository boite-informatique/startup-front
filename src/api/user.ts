import type { AxiosResponse } from "axios";
import api from "../services/api";
import type { UserWithRelationsAndEstablishment } from "./types/user-types";
import { currentUserInfo } from "src/stores/currentUserInfo";

export async function getCurrentUserInfoAndStore(): Promise<
    AxiosResponse<UserWithRelationsAndEstablishment>
> {
    try {
        const response = await api.get(`/users/me`);
        if (response.status == 200) {
            currentUserInfo.set(response.data);
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}
