import type { AxiosResponse } from "axios";
import api from "../services/api";
import { currentUserInfo } from "src/stores/currentUserInfo";
import type { Announcement } from "./types/announcement-types";

export async function getAnnouncements(): Promise<
    AxiosResponse<Announcement[]>
> {
    try {
        const response = await api.get(`/announcement/`);
        return response;
    } catch (error) {
        console.error(error);
    }
}
