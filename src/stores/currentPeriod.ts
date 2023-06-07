import { derived, writable } from "svelte/store";
import { periods, type PeriodsType } from "./periodsStore";

export const currentPeriod = derived<typeof periods, CurrentPeriodType>(
    periods,
    ($periods, set) => {
        console.log("[PERIODS]", JSON.stringify($periods));
        const currentDate = new Date();
        if (currentDate < new Date($periods.submission.start)) {
            set("Platform is not open yet");
        } else if (currentDate <= new Date($periods.submission.end)) {
            set("Within submission phase");
        } else if (currentDate < new Date($periods.validation.start)) {
            set("Submission phase is closed");
        } else if (currentDate <= new Date($periods.validation.end)) {
            set("Within validation phase");
        } else if (currentDate < new Date($periods.appeal.start)) {
            set("First validation phase is closed");
        } else if (currentDate <= new Date($periods.appeal.end)) {
            set("Within appeal phase");
        } else if (currentDate < new Date($periods.appealValidation.start)) {
            set("Appeal phase is closed");
        } else if (currentDate <= new Date($periods.appealValidation.end)) {
            set("Within appeal validation phase");
        } else {
            set("Platform is closed");
        }
    }
);

export type CurrentPeriodType =
    | "Platform is not open yet"
    | "Within submission phase"
    | "Submission phase is closed"
    | "Within validation phase"
    | "First validation phase is closed"
    | "Within appeal phase"
    | "Appeal phase is closed"
    | "Within appeal validation phase"
    | "Platform is closed";
