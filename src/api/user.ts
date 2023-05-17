import type { AxiosResponse } from "axios";
import api from "../services/api";
import type {
    UserWithRelationsAndEstablishment,
    User,
} from "./types/user-types";
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

export async function modifyProfile(
    userId: number,
    input: {
        phone: string;
        password: string;
        avatar: string;
    }
): Promise<AxiosResponse<User>> {
    try {
        const response = await api.patch(`/users/${userId}`, input);
        return response;
    } catch (error) {
        console.error(error);
    }
}
