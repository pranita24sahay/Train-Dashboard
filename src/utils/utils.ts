// Utility to check if the train should leave (i.e., past its departure time)
import {priorityMap} from "../constants";

// Sort trains by priority (P1 > P2 > P3)
export const sortTrainsByPriority = (trains) => {
    return [...trains].sort((a, b) => {
        const priorityA = priorityMap[a.priority];
        const priorityB = priorityMap[b.priority];

        if (priorityA === priorityB) {
            // Sortt by arrival time
            return new Date(a.arrivalTime) - new Date(b.arrivalTime);
        }

        return priorityA - priorityB; // Lower number means higher priority
    });
};


export const combineDateAndTime = (date, time) => {
    // Log inputs to debug undefined values

    // Check if time is undefined or not a string
    if (typeof time !== 'string') {
        console.error("Invalid time provided. Time must be a string in HH:mm:ss format.", { time });
        return null;  // Return null to indicate an invalid time
    }

    // Check if `time` is in the format "HH:mm:ss"
    const isTimeOnly = /^\d{2}:\d{2}:\d{2}$/.test(time);

    if (isTimeOnly) {
        // Get today's date and split the time
        const today = new Date();
        const [hours, minutes, seconds] = time.split(':');

        // Set today's date with the time values from the string
        today.setHours(hours);
        today.setMinutes(minutes);
        today.setSeconds(seconds);

        return today; // Return the combined Date object
    }

    // If date is a Date object, combine it with the time
    if (date instanceof Date) {
        const [hours, minutes, seconds] = time.split(':');
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
        return date; // Return the updated Date object
    }

    console.error("Invalid date or time provided", { date, time });
    return null;  // Return null in case of invalid input
};


export const createArrayFromInput = (total) => {
    return Array.from({ length: total }, (_, i) => `P${i + 1}`);
}
