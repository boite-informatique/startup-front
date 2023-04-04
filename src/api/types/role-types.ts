import type { Permissions } from "./permissions-types";

export type Role = {
    id: number;
    name: string;
};

export type RoleWithPermissions = Role & {
    permissions: Permissions[];
};
