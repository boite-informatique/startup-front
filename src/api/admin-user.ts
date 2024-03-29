import api from "../services/api";

type FetchUsersQuery = {
    skip?: number;
    take?: number;
    first_name?: string;
    sex?: "Male" | "Female";
    type?: "Teacher" | "Student" | "Staff";
};

type ModifyUserPayload = {
    email?: string;
    password?: string;
    roles?: number[];
    activated?: boolean;
};

export const fetchUsers = async (query?: FetchUsersQuery) => {
    try {
        const response = await api.getWithQuery("/users", query);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const fetchOneUser = async (userId: number) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const modifyOneUser = async (
    userId: number,
    payload: ModifyUserPayload
) => {
    try {
        const response = await api.patch(`/users/${userId}`, payload);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const fetchUserRoles = async (userId: number) => {
    try {
        const response = await api.get(`/users/${userId}/roles`);
        return response;
    } catch (error) {
        console.error(error);
    }
};
