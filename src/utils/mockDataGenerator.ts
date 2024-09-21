const generateMockTrainDataForWaiting = () => {
    const currentTime = new Date();

    // Helper function to format time as HH:mm:ss // assuming it is only considering same day time slots
    const formatTime = (date: Date) => {
        return date.toTimeString().slice(0, 8); // returns the time in HH:mm:ss format
    };

    // Helper function to add seconds to a Date object
    const addSeconds = (date: Date, seconds: number) => {
        return new Date(date.getTime() + seconds * 1000);
    };

    // Generate 15 trains with overlapping arrival and departure times in seconds
    return [
        {
            trainNumber: "22001",
            arrivalTime: formatTime(currentTime), // Arrives now
            departureTime: formatTime(addSeconds(currentTime, 10)), // Leaves in 10 seconds
            priority: "P1"
        },
        {
            trainNumber: "22002",
            arrivalTime: formatTime(currentTime), // Arrives now
            departureTime: formatTime(addSeconds(currentTime, 25)), // Leaves in 15 seconds
            priority: "P2"
        },
        {
            trainNumber: "22003",
            arrivalTime: formatTime(currentTime), // Arrives now
            departureTime: formatTime(addSeconds(currentTime, 35)), // Leaves in 21 seconds
            priority: "P1"
        },
        {
            trainNumber: "22004",
            arrivalTime: formatTime(currentTime), // Arrives now
            departureTime: formatTime(addSeconds(currentTime, 500)), // Leaves in 50 seconds
            priority: "P3"
        },
        {
            trainNumber: "22005",
            arrivalTime: formatTime(currentTime), // Arrives now
            departureTime: formatTime(addSeconds(currentTime, 600)), // Leaves in 60 seconds
            priority: "P2"
        },
        {
            trainNumber: "22006",
            arrivalTime: formatTime(currentTime), // Arrives now
            departureTime: formatTime(addSeconds(currentTime, 179)), // Leaves in 70 seconds
            priority: "P1"
        },
        {
            trainNumber: "22007",
            arrivalTime: formatTime(addSeconds(currentTime, 10)), // Arrives in 10 seconds
            departureTime: formatTime(addSeconds(currentTime, 80)), // Leaves in 80 seconds
            priority: "P1"
        },
        {
            trainNumber: "22008",
            arrivalTime: formatTime(addSeconds(currentTime, 20)), // Arrives in 20 seconds
            departureTime: formatTime(addSeconds(currentTime, 90)), // Leaves in 90 seconds
            priority: "P2"
        },
        {
            trainNumber: "22009",
            arrivalTime: formatTime(addSeconds(currentTime, 20)), // Arrives in 20 seconds
            departureTime: formatTime(addSeconds(currentTime, 100)), // Leaves in 100 seconds
            priority: "P3"
        },
        {
            trainNumber: "22010",
            arrivalTime: formatTime(addSeconds(currentTime, 30)), // Arrives in 30 seconds
            departureTime: formatTime(addSeconds(currentTime, 110)), // Leaves in 110 seconds
            priority: "P1"
        },
        {
            trainNumber: "22011",
            arrivalTime: formatTime(addSeconds(currentTime, 30)), // Arrives in 30 seconds
            departureTime: formatTime(addSeconds(currentTime, 120)), // Leaves in 120 seconds
            priority: "P2"
        },
        {
            trainNumber: "22012",
            arrivalTime: formatTime(addSeconds(currentTime, 40)), // Arrives in 40 seconds
            departureTime: formatTime(addSeconds(currentTime, 130)), // Leaves in 130 seconds
            priority: "P1"
        },
        {
            trainNumber: "22013",
            arrivalTime: formatTime(addSeconds(currentTime, 40)), // Arrives in 40 seconds
            departureTime: formatTime(addSeconds(currentTime, 140)), // Leaves in 140 seconds
            priority: "P3"
        },
        {
            trainNumber: "22014",
            arrivalTime: formatTime(addSeconds(currentTime, 50)), // Arrives in 50 seconds
            departureTime: formatTime(addSeconds(currentTime, 150)), // Leaves in 150 seconds
            priority: "P2"
        },
        {
            trainNumber: "22015",
            arrivalTime: formatTime(addSeconds(currentTime, 50)), // Arrives in 50 seconds
            departureTime: formatTime(addSeconds(currentTime, 160)), // Leaves in 160 seconds
            priority: "P1"
        }
    ];
};

export default generateMockTrainDataForWaiting;
