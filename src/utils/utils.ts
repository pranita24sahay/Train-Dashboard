// Utility to check if the train should leave (i.e., past its departure time)
export const hasTrainLeft = (departureTime: string) => {
    const now = new Date();
    const [departureHour, departureMinute] = departureTime.split(':').map(Number);

    const departure = new Date();
    departure.setHours(departureHour, departureMinute);

    return now > departure;
};

export const findEmptyPlatform = (platforms) => {
    for (let i = 0; i < platforms.length; i++) {
        if (platforms[i].train === null && platforms[i].departureTime === null) {
            return i; // Return the index of the empty platform
        }
    }
    return -1; // Return -1 if no platform is empty
}

export const getOrderedPlatforms = (platforms) => {
    return platforms.sort((a, b) => {
        // If 'a' has a train and 'b' doesn't, 'a' comes first
        if (a.train !== null && b.train === null) return -1;
        // If 'b' has a train and 'a' doesn't, 'b' comes first
        if (a.train === null && b.train !== null) return 1;
        // If both have or don't have trains, no change in order
        return 0;
    });
}
