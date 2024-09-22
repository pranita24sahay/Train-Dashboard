import {TrainType} from "../types";

const generateMockTrainDataForWaiting = (): TrainType[] => {
    const currentTime = new Date();

    const formatTime = (date: Date) => date.toTimeString().slice(0, 8);
    const addSeconds = (date: Date, seconds: number) => new Date(date.getTime() + seconds * 1000);

    return [
        {
            trainNumber: "22001",
            arrivalTime: formatTime(addSeconds(currentTime, 10)),
            departureTime: formatTime(addSeconds(currentTime, 120)),
            priority: "P1",
            delayed: 1
        },
        {
            trainNumber: "22002",
            arrivalTime: formatTime(currentTime),
            departureTime: formatTime(addSeconds(currentTime, 25)),
            priority: "P2",
            delayed: 50
        },
        {
            trainNumber: "22003",
            arrivalTime: formatTime(currentTime),
            departureTime: formatTime(addSeconds(currentTime, 35)),
            priority: "P1"
        },
        {
            trainNumber: "22004",
            arrivalTime: formatTime(currentTime),
            departureTime: formatTime(addSeconds(currentTime, 50)),
            priority: "P3"
        },
        {
            trainNumber: "22005",
            arrivalTime: formatTime(currentTime),
            departureTime: formatTime(addSeconds(currentTime, 60)),
            priority: "P2"
        },
        {
            trainNumber: "22006",
            arrivalTime: formatTime(currentTime),
            departureTime: formatTime(addSeconds(currentTime, 70)),
            priority: "P1"
        },
        {
            trainNumber: "22007",
            arrivalTime: formatTime(addSeconds(currentTime, 10)),
            departureTime: formatTime(addSeconds(currentTime, 80)),
            priority: "P1"
        },
        {
            trainNumber: "22008",
            arrivalTime: formatTime(addSeconds(currentTime, 20)),
            departureTime: formatTime(addSeconds(currentTime, 90)),
            priority: "P2"
        },
        {
            trainNumber: "22009",
            arrivalTime: formatTime(addSeconds(currentTime, 20)),
            departureTime: formatTime(addSeconds(currentTime, 100)),
            priority: "P3"
        },
        {
            trainNumber: "22010",
            arrivalTime: formatTime(addSeconds(currentTime, 30)),
            departureTime: formatTime(addSeconds(currentTime, 110)),
            priority: "P1"
        },
        {
            trainNumber: "22011",
            arrivalTime: formatTime(addSeconds(currentTime, 30)),
            departureTime: formatTime(addSeconds(currentTime, 120)),
            priority: "P2"
        },
        {
            trainNumber: "22012",
            arrivalTime: formatTime(addSeconds(currentTime, 40)),
            departureTime: formatTime(addSeconds(currentTime, 130)),
            priority: "P1"
        },
        {
            trainNumber: "22013",
            arrivalTime: formatTime(addSeconds(currentTime, 40)),
            departureTime: formatTime(addSeconds(currentTime, 140)),
            priority: "P3"
        },
        {
            trainNumber: "22014",
            arrivalTime: formatTime(addSeconds(currentTime, 50)),
            departureTime: formatTime(addSeconds(currentTime, 150)),
            priority: "P2"
        },
        {
            trainNumber: "22015",
            arrivalTime: formatTime(addSeconds(currentTime, 50)),
            departureTime: formatTime(addSeconds(currentTime, 160)),
            priority: "P1"
        },
    ];
};

export default generateMockTrainDataForWaiting;
