import { useState, useEffect, useMemo, useCallback } from 'react';
import { parseCSV } from '../utils/csvParser';
import generateMockTrainData from '../utils/mockDataGenerator';
import { combineDateAndTime, sortTrainsByPriority } from "../utils/utils";
import TrainBoard from './TrainBoard';
import { PlatformContainer, PlatformLabel, TrainBox, Platform } from './styles';

const INITIAL_PLATFORMS = ['P1', 'P2', 'P3', 'P4', 'P5'];

const thStyle = {
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd'
};

const tdStyle = {
    padding: '8px 12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left'
};

const rowStyleEven = {
    backgroundColor: '#f9f9f9'
};

const rowStyleOdd = {
    backgroundColor: '#fff'
};

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
                {getUnallocatedArrivedTrains.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={thStyle}>Train Number</th>
                            <th style={thStyle}>Priority</th>
                            <th style={thStyle}>Arrival Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getUnallocatedArrivedTrains.map((train, index) => (
                            <tr key={index} style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}>
                                <td style={tdStyle}>{train.trainNumber}</td>
                                <td style={tdStyle}>{train.priority}</td>
                                <td style={tdStyle}>{train.arrivalTime}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ color: '#777', fontStyle: 'italic' }}>No waiting trains at the moment</p>
                )}
            </div>

        </div>
    );
};

export default TrainDashboard;
