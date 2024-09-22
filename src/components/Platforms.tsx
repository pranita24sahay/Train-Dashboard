import {
    PlatformContainer,
    Platform,
    PlatformLabel,
    TrainDetails,
    TrainNumber,
    TrainStatus,
    TrainInfo
} from "./styles";
import Train from './Train';  // Import the Train component

const Platforms = ({ INITIAL_PLATFORMS, allottedTrains }) => {
    return (
        <PlatformContainer>
            {INITIAL_PLATFORMS.map((platform, index) => (
                <Platform key={index}>
                    <PlatformLabel>Platform {platform}</PlatformLabel>
                    {allottedTrains
                        .filter(train => train.platform === platform)
                        .map(train => (
                            <div key={train.trainNumber} style={{position:'relative',top:'-61px'}}>
                                <TrainDetails>
                                    <TrainNumber>{train.trainNumber}</TrainNumber>
                                    {train?.departing && <TrainStatus>(Departing)</TrainStatus>}
                                </TrainDetails>
                                {/*<TrainInfo>*/}
                                {/*    <span>Expected Time: {train.expectedTime}</span>*/}
                                {/*    {train?.departing && <span>Departure Time: {train.departureTime}</span>}*/}
                                {/*</TrainInfo>*/}
                                {/* Use the Train component with animation */}
                                <Train isArriving={!train.departing} />
                            </div>
                        ))}
                </Platform>
            ))}
        </PlatformContainer>
    );
};

export default Platforms;
