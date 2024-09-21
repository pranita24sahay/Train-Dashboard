import { useState, useEffect, useMemo, useCallback } from 'react';
import { parseCSV } from '../utils/csvParser';
import generateMockTrainData from '../utils/mockDataGenerator';
import { combineDateAndTime, sortTrainsByPriority } from "../utils/utils";
import TrainBoard from './TrainBoard';
import { PlatformContainer, PlatformLabel, TrainBox, Platform } from './styles';

const INITIAL_PLATFORMS = ['P1', 'P2', 'P3', 'P4', 'P5'];

const TrainDashboard = () => {
    const [state, setState] = useState({
        trains: [],
        platforms: INITIAL_PLATFORMS,
        allottedTrains: [],
        departingTrains: [],
    });

    const { trains, platforms, allottedTrains, departingTrains } = state;

    const updateState = (updates) => {
        setState((prevState) => ({ ...prevState, ...updates }));
    };

    const handleFileUpload = useCallback((e) => {
        const file = e.target.files[0];
        parseCSV(file, (parsedTrains) => updateState({ trains: parsedTrains }));
    }, []);

    const handleGenerateMockData = useCallback(() => {
        updateState({ trains: generateMockTrainData() });
    }, []);

    const allocatePlatform = useCallback(() => {
        if (platforms.length && trains.length) {
            const sortedTrains = sortTrainsByPriority(trains);
            const trainToAllocate = sortedTrains[0];
            const platformToAssign = platforms[0];

            updateState({
                trains: trains.filter(train => train.trainNumber !== trainToAllocate.trainNumber),
                platforms: platforms.slice(1), // Remove assigned platform
                allottedTrains: [...allottedTrains, { ...trainToAllocate, platform: platformToAssign }],
            });
        }
    }, [platforms, trains, allottedTrains]);

    const freePlatform = useCallback(() => {
        const now = new Date();

        const remainingAllottedTrains = allottedTrains.filter(train => {
            const departureTime = combineDateAndTime(now, train.departureTime);
            if (now >= departureTime) {
                triggerTrainDeparture(train.trainNumber, train.platform);
                return false;
            }
            return true;
        });

        updateState({ allottedTrains: remainingAllottedTrains });
    }, [allottedTrains]);

    const triggerTrainDeparture = useCallback((trainNumber, platform) => {
        updateState({ departingTrains: [...departingTrains, trainNumber] });

        setTimeout(() => {
            updateState({
                allottedTrains: allottedTrains.filter(train => train.trainNumber !== trainNumber),
                departingTrains: departingTrains.filter(train => train !== trainNumber),
                platforms: [...platforms, platform], // Free the platform
            });
        }, 2000);
    }, [allottedTrains, departingTrains, platforms]);

    const getUnallocatedArrivedTrains = useMemo(() => {
        const now = new Date();

        return trains.filter(train => {
            const trainArrivalTime = combineDateAndTime(now, train.arrivalTime);
            const isArrived = now >= trainArrivalTime;
            const isPlatformAssigned = allottedTrains.some(allotted => allotted.trainNumber === train.trainNumber);
            return isArrived && !isPlatformAssigned;
        });
    }, [trains, allottedTrains]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (allottedTrains.length) freePlatform();
            if (platforms.length && trains.length) allocatePlatform();
        }, 1000);

        return () => clearInterval(interval);
    }, [allocatePlatform, freePlatform, allottedTrains.length, platforms.length, trains.length]);

    return (
        <div>
            <h1>Train Schedule Dashboard</h1>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <button onClick={handleGenerateMockData}>Generate Mock Train Data</button>

            <PlatformContainer>
                {INITIAL_PLATFORMS.map((platform, index) => (
                    <Platform key={index}>
                        <PlatformLabel>Platform {platform}</PlatformLabel>
                        {allottedTrains
                            .filter(train => train.platform === platform)
                            .map(train =>
                                <TrainBox key={train.trainNumber}>
                                    {train.trainNumber}
                                </TrainBox>
                            )}
                    </Platform>
                ))}
            </PlatformContainer>

            <TrainBoard trains={allottedTrains} />

            <div>
                <h2>Waiting Trains</h2>
                {getUnallocatedArrivedTrains.map((train, index) => (
                    <div key={index}>{train.trainNumber} - Priority: {train.priority}</div>
                ))}
            </div>
        </div>
    );
};

export default TrainDashboard;
