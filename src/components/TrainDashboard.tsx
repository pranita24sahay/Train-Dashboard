import { useState, useEffect, useCallback } from 'react';
import {priorityMap} from "../constants";
import { parseCSV } from '../utils/csvParser';
import generateMockTrainData from '../utils/mockDataGenerator';
import TrainBoard from './TrainBoard'; // Adjust the path

// Utility to check if the current time is between arrival and departure times
const isTrainAtPlatform = (arrivalTime: string, departureTime: string) => {
    const now = new Date();
    const [arrivalHour, arrivalMinute, arrivalSecond] = arrivalTime.split(':').map(Number);
    const [departureHour, departureMinute, departureSecond] = departureTime.split(':').map(Number);

    const arrival = new Date();
    arrival.setHours(arrivalHour, arrivalMinute, arrivalSecond);

    const departure = new Date();
    departure.setHours(departureHour, departureMinute, departureSecond);

    return now >= arrival && now <= departure;
};

// Sort trains by priority (P1 > P2 > P3)
const sortTrainsByPriority = (trains) => {
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

const TrainDashboard = () => {
    const [trains, setTrains] = useState([]);  // Trains holding platform and schedule info
    // const [waitingTrains, setWaitingTrains] = useState([]);  // Waiting list
    const [platforms,setPlatforms] = useState(['P1','P2','P3','P4','P5']);
    const [allottedTrains,setAllottedTrains] = useState([])

    // Priority map for string-based priority levels
    const priorityMap = {
        "P1": 1,  // Highest priority
        "P2": 2,  // Lower priority
        // Add more mappings as needed
    };

    // Handle CSV upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        parseCSV(file, setTrains);
    };

    // Handle mock data generation
    const handleGenerateMockData = () => {
        const mockData = generateMockTrainData();  // Generate mock train data
        setTrains(mockData);  // Set mock data to the trainData state
    };

    // Platform allocation logic, called every second
    const allocatePlatform = () => {
        if (platforms.length > 0 && trains.length > 0) {

            // Sort trains by priority (highest priority first) and then by arrival time
            const sortedTrains = sortTrainsByPriority(trains);

            // Get the first available platform and the first sorted train
            const trainToAllocate = sortedTrains[0];
            const platformToAssign = platforms[0];

            // Create new platform list without the first platform
            const updatedPlatforms = platforms.filter((platform) => platform !== platformToAssign);

            // Create a new allotted train with platform assigned
            const trainWithPlatform = { ...trainToAllocate, platform: platformToAssign };

            setTrains((prevTrains) => prevTrains.filter(train => train.trainNumber !== trainToAllocate.trainNumber)); //remooving train from trains data so to not consider for future iterations
            setPlatforms(updatedPlatforms);
            setAllottedTrains((prevAllottedTrains) => [...prevAllottedTrains, trainWithPlatform]);
        }
    };

    const freePlatform = () => {
        const now = new Date();

        // Filter out trains that have already departed
        const remainingAllottedTrains = allottedTrains.filter(train => {
            const departureTime = new Date(`1970-01-01T${train.departureTime}Z`); // Assuming you are storing only time
            const hasDeparted = now >= departureTime;

            if (hasDeparted) {
                // Add the platform back to available platforms
                setPlatforms(prevPlatforms => [...prevPlatforms, train.platform]);
            }

            return !hasDeparted; // Keep trains that haven't departed yet
        });

        // Update the allottedTrains array with the remaining trains
        setAllottedTrains(remainingAllottedTrains);

        // Allocate the freed platform to a waiting train, if possible
        allocatePlatform();
    };

    // Show trains that have arrived but are not yet assigned a platform
    const getUnallocatedArrivedTrains = () => {
        const now = new Date(); // Current time

        return trains.filter(train => {
            const trainArrivalTime = new Date(`1970-01-01T${train.arrivalTime}Z`); // using this because date is being lost , as i am just using time
            const isArrived = now >= trainArrivalTime;
            const isPlatformAssigned = allottedTrains.some(allotted => allotted.trainNumber === train.trainNumber);
            return isArrived && !isPlatformAssigned;
        });
    };

    useEffect(() => {
        // Call allocatePlatform every second
        const interval = setInterval(() => {
            // Only call freePlatform if there are trains on platforms
            if (allottedTrains.length > 0) {
                freePlatform();
            }

            // Only call allocatePlatform if there are free platforms and waiting trains
            if (platforms.length > 0 && trains.length > 0) {
                allocatePlatform();
            }
        }, 1000);

        return () => clearInterval(interval); //to stop the repeated execution of the allocatePlatform (memory leaks prevent)
    }, [trains, platforms]);

    console.log({ trains , platforms,allottedTrains})

    return (
        <div>
            <h1>Train Schedule Dashboard</h1>
            {/* CSV Upload */}
            <input type="file" accept=".csv" onChange={handleFileUpload} />

            {/* Button to generate mock data */}
            <button onClick={handleGenerateMockData}>Generate Mock Train Data</button>

            {/* Display the Train Board */}
            <TrainBoard trains={allottedTrains} />

            <div>
                <h2>Waiting Trains</h2>
                {getUnallocatedArrivedTrains().map((train, index) => (
                    <div key={index}>{train.trainNumber} - Priority: {train.priority}</div>
                ))}
            </div>
        </div>
    );
}

export default TrainDashboard;
