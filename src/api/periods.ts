// This module fetches the periods settings and adds them to a Svelte store.
// This is useful for conditionally rendering UI elements based on the period we're in.
import api from "../services/api";
import { periods } from "../stores/periodsStore";

export type ModifyPeriodsInput = {
    submission: string;
    validation: string;
    appeal: string;
    appealValidation: string;
    end: string;
};
const fetchPeriods = async () => {
    try {
        const response = await api.get("/projects/settings");
        if (response.status >= 200 && response.status < 300) {
            periods.set(response.data);
        }
    } catch (error) {
        console.error(error);
    }
};

export const ModifyPeriods = async (input: ModifyPeriodsInput) => {
    try {
        const response = await api.put("/projects/settings", input);
        if (response.status >= 200 && response.status < 300) {
            periods.set(response.data);
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};
export default fetchPeriods;
