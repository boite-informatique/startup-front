import type { UserWithRelationsAndEstablishment } from "src/api/types/user-types";
import { writable } from "svelte/store";

export const currentUserInfo = writable<UserWithRelationsAndEstablishment>();
