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
};

export const fetchUsers = async (query?: FetchUsersQuery) => {
    //todo add query params to request
    try {
        const response = await api.get("/users");
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
