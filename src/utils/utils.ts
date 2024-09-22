// Utility to check if the train should leave (i.e., past its departure time)
import {priorityMap} from "../constants";
import {TrainType} from "../types";


export const sortTrainsByPriority = (trains: TrainType[]): TrainType[] => {
    return [...trains].sort((a, b) => {
        if(a.priority == undefined || b.priority == undefined) return;
        const priorityA = priorityMap[a.priority]; // No more error here
        const priorityB = priorityMap[b.priority]; // No more error here

        if (priorityA === priorityB) {
            return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime();
        }

        return priorityA - priorityB; // Lower number means higher priority
    });
};



export const combineDateAndTime = (date:any, time:any) => {
    // Log inputs to debug undefined values

    // Check if time is undefined or not a string
    if (typeof time !== 'string') {
        return null;  // Return null to indicate an invalid time
    }

    // Check if `time` is in the format "HH:mm:ss"
    const isTimeOnly = /^\d{2}:\d{2}:\d{2}$/.test(time);

    if (isTimeOnly) {
        // Get today's date and split the time
        const today = new Date();
        const [hours, minutes, seconds] = time.split(':').map(Number);

        // Set today's date with the time values from the string
        today.setHours(hours);
        today.setMinutes(minutes);
        today.setSeconds(seconds);

        return today; // Return the combined Date object
    }

    // If date is a Date object, combine it with the time
    if (date instanceof Date) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
        return date; // Return the updated Date object
    }

    console.error("Invalid date or time provided", { date, time });
    return null;  // Return null in case of invalid input
};


export const createArrayFromInput = (total: number): string[] => {
    return Array.from({ length: total }, (_, i) => `P${i + 1}`);
};

