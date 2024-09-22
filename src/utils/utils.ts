// Utility to check if the train should leave (i.e., past its departure time)
import {priorityMap} from "../constants";
import {TrainType} from "../types";

export const sortTrainsByPriority = (trains: TrainType[]): TrainType[] => {
    return [...trains].sort((a, b) => {
        if (!a.priority || !b.priority) {
            throw new Error('Invalid priority value'); // Handle undefined priority
        }

        const priorityA = priorityMap[a.priority];
        const priorityB = priorityMap[b.priority];

        if (priorityA === priorityB) {
            return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime();
        }

        return priorityA - priorityB; // Lower number means higher priority
    });
};
// Format time to HH:mm:ss
const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};


export const adjustTrainTimesForDelay = (trains: TrainType[]): TrainType[] => {
    return trains.map(train => {
        if (train.delayed) {
            debugger
            const delayInMs = train.delayed * 60 * 1000; // Convert minutes to milliseconds
            const arrivalDate = formatDate(train.arrivalTime);
            const departureDate = formatDate(train.departureTime)
            arrivalDate.setTime(arrivalDate.getTime() + delayInMs);
            departureDate.setTime(departureDate.getTime() + delayInMs);
            console.log({arrivalDate, departureDate})
            return {
                ...train,
                arrivalTime: formatTime(arrivalDate),
                departureTime: formatTime(departureDate),
            };
        }
        return train; // Return the train unmodified if no delay
    });
};

export const combineDateAndTime = (date: any, time: any) => {
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

    console.error("Invalid date or time provided", {date, time});
    return null;  // Return null in case of invalid input
};


export const createArrayFromInput = (total: number): string[] => {
    return Array.from({length: total}, (_, i) => `P${i + 1}`);
};

const formatDate = (input: string): Date => {
    const today = new Date();
    const [hours, minutes, seconds] = input.split(':').map(Number);

    // Set today's date with the time values from the string
    today.setHours(hours);
    today.setMinutes(minutes);
    today.setSeconds(seconds);

    return today; // Return the combined Date object
}
