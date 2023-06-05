import type { AxiosResponse } from "axios";
import api from "../services/api";
import { currentUserInfo } from "src/stores/currentUserInfo";
import type {
    Announcement,
    CreateAnnouncementInput,
} from "./types/announcement-types";

export async function getAnnouncements(admin : string): Promise<
    AxiosResponse<Announcement[]>
> {
    try {
        const response = await api.get(`/announcement/?admin=${admin == "admin"}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function createAnnouncement(
    input: CreateAnnouncementInput
): Promise<AxiosResponse<Announcement>> {
    try {
        const response = await api.post(`/announcement/`, input);
        return response;
    } catch (error) {
        console.error(error);
    }
}
