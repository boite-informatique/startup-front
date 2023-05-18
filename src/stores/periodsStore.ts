import { writable } from "svelte/store";

export const periods = writable({
    submission: "2023-05-07",
    validation: "2023-05-14",
    appeal: "2023-05-21",
    appealValidation: "2023-05-28",
    end: "2023-05-31",
});
