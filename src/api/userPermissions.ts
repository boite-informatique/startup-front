// This module fetches the current user's permissions and adds them to a Svelte store.
// This is useful for conditionally rendering UI elements based on the user's permissions.
import api from "../services/api";
import { userPermissions } from "../stores/userPermissions";

const fetchUserPermissions = async () => {
    try {
        const response = await api.get("/users/permissions");
        if (response.status >= 200 && response.status < 300) {
            userPermissions.set(response.data);
        }
    } catch (error) {
        console.error(error);
    }
};

export default fetchUserPermissions;
