import { writable } from "svelte/store";

export const periods = writable<PeriodsType>({
    submission: { start: "2023-05-01", end: "2023-05-07" },
    validation: { start: "2023-05-08", end: "2023-05-14" },
    appeal: { start: "2023-05-15", end: "2023-05-21" },
    appealValidation: { start: "2023-05-22", end: "2023-05-28" },
});

export type PeriodsType = {
    submission: Period;
    validation: Period;
    appeal: Period;
    appealValidation: Period;
};

export type Period = { start: string; end: string };
