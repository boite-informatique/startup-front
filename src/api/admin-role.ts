import api from "../services/api";

type CreateRolePayload = {
    name: string;
    users: number[];
    permissions: number[];
};

type ModifyRolePayload = Partial<CreateRolePayload>;

export const createRole = async (payload: CreateRolePayload) => {
    // returns Role
    try {
        const response = await api.post("/roles", payload);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const fetchRoles = async () => {
    // returns RoleWithPermssions[]
    try {
        const response = await api.get("/roles");
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const fetchOneRole = async (roleId: number) => {
    // returns RoleWithPermssions
    try {
        const response = await api.get(`/roles/${roleId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const modifyOneRole = async (
    // returns RoleWithPermssions
    roleId: number,
    payload: ModifyRolePayload
) => {
    try {
        const response = await api.patch(`/roles/${roleId}`, payload);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const deleteOneRole = async (roleId: number) => {
    try {
        const response = await api.delete(`/roles/${roleId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};
