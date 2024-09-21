// Utility to check if the train should leave (i.e., past its departure time)
import {priorityMap} from "../constants";

export const hasTrainLeft = (departureTime: string) => {
    const now = new Date();
    const [departureHour, departureMinute] = departureTime.split(':').map(Number);

    const departure = new Date();
    departure.setHours(departureHour, departureMinute);

    return now > departure;
};

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

// Helper function to combine today's date with a time string (HH:mm:ss)
export const combineDateAndTime = (date, timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, seconds, 0); // Set the time on the current date
    return newDate;
};
