import {TrainType} from "./types";

export const priorityMap: { [key in TrainType['priority']]: number } = {
    P1: 1,
    P2: 2,
    P3: 3,
};

export const TOTAL_PLATFORMS = 3;  // Example input
