import React, {ChangeEvent, useState, useEffect, useMemo, useCallback} from 'react';
import {TOTAL_PLATFORMS} from "../constants";
import {TrainType} from "../types";
import {parseCSV} from '../utils/csvParser';
import generateMockTrainData from '../utils/mockDataGenerator';
import {combineDateAndTime, sortTrainsByPriority, createArrayFromInput, adjustTrainTimesForDelay} from "../utils/utils";
import Platforms from "./Platforms";
import TrainBoard from './TrainBoard';
import HeaderActions from './Header';
import WaitingTrains from './WaitingTrains';
import {DashboardGrid} from './styles';

const INITIAL_PLATFORMS = createArrayFromInput(TOTAL_PLATFORMS);

interface StateUpdates {
    trains?: TrainType[];
    platforms?: string[];
    allottedTrains?: TrainType[];
    fileUploaded?: boolean;
    departingTrains?: string[];
}

interface State {
    trains: TrainType[];
    platforms: string[];
    allottedTrains: TrainType[];
    departingTrains: string[];
    fileUploaded: boolean;
}

const TrainDashboard = () => {
    const [state, setState] = useState<State>({
        trains: [],
        platforms: INITIAL_PLATFORMS,
        allottedTrains: [],
        departingTrains: [],
        fileUploaded: false,
    });

    const {trains, platforms, allottedTrains, departingTrains, fileUploaded} = state as State;

    const updateState = (updates: StateUpdates) => {
        setState((prevState) => ({...prevState, ...updates}));
    };

    const handleFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        parseCSV(file, (parsedTrains: TrainType[]) => updateState({trains: parsedTrains, fileUploaded: true}));
    }, []);

    const handleGenerateMockData = useCallback(() => {
        updateState({trains: adjustTrainTimesForDelay(generateMockTrainData())});
    }, []);

    const allocatePlatform = useCallback(() => {
        if (platforms.length && trains.length) {
            const sortedTrains = sortTrainsByPriority(trains);
            const trainToAllocate = sortedTrains[0];
            const platformToAssign = platforms[0];

            updateState({
                trains: trains.filter(train => train.trainNumber !== trainToAllocate.trainNumber),
                platforms: platforms.slice(1), // Remove assigned platform
                allottedTrains: [...allottedTrains, {...trainToAllocate, platform: platformToAssign}],
            });
        }
    }, [platforms, trains, allottedTrains]);

    const freePlatform = useCallback(() => {
        const now = new Date();
        let freedPlatforms = [];
        const remainingAllottedTrains = allottedTrains.filter(train => {
            if (!train.departureTime) {
                return true; // Or handle this case as needed (e.g., exclude from filtering)
            }
            const departureTime = combineDateAndTime(now, train.departureTime);
            if (departureTime && now >= departureTime) {
                triggerTrainDeparture(train.trainNumber, (train.platform as string));
                freedPlatforms.push(train.platform);
                return false;
            }
            return true;
        });

        updateState({allottedTrains: remainingAllottedTrains});
    }, [allottedTrains]);

    const triggerTrainDeparture = useCallback((trainNumber: string, platform: string) => {
        updateState({departingTrains: [...departingTrains, trainNumber]});

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
            const isArrived = trainArrivalTime ? now >= trainArrivalTime : false;
            const isPlatformAssigned = allottedTrains.some(allotted => allotted.trainNumber === train.trainNumber);
            return isArrived && !isPlatformAssigned;
        });
    }, [trains, allottedTrains]);

    // Periodically check and free platforms or allocate new trains
    useEffect(() => {
        const interval = setInterval(() => {
            if (allottedTrains.length) freePlatform();
            if (platforms.length && trains.length) allocatePlatform();
        }, 1000);

        return () => clearInterval(interval);
    }, [allocatePlatform, freePlatform, allottedTrains.length, platforms.length, trains.length]);

    useEffect(() => {
        if (fileUploaded) {
            alert("File successfully uploaded!");
        }
    }, [fileUploaded]);

    console.log({trains})

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Train Schedule Dashboard</h1>
            <HeaderActions
                handleFileUpload={handleFileUpload}
                handleGenerateMockData={handleGenerateMockData}
            />
            <Platforms INITIAL_PLATFORMS={INITIAL_PLATFORMS} allottedTrains={allottedTrains}/>
            <DashboardGrid>
                <TrainBoard trains={allottedTrains}/>
                <WaitingTrains getUnallocatedArrivedTrains={getUnallocatedArrivedTrains}/>
            </DashboardGrid>
        </div>
    )
};

export default TrainDashboard;
