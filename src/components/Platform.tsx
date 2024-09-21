import React from 'react';
import styled from 'styled-components';
import Train from './Train';


// Container for each platform
const PlatformContainer = styled.div`
  margin: 20px;
  border: 2px solid #007bff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// Title for each platform
const PlatformTitle = styled.h2`
  font-size: 24px;
  color: #007bff;
  margin-bottom: 15px;
`;




// Define the type for the Train object
interface TrainType {
    trainNumber: string;
    arrivalTime: string;
    departureTime: string;
    priority: string;
}

// Define the props for Platform component
interface PlatformProps {
    platformNumber: number;
    trains: TrainType[];
}

const Platform = ({ platformNumber, trains } : PlatformProps) => {
    return (
        <PlatformContainer>
            <PlatformTitle>Platform {platformNumber}</PlatformTitle>
            {trains.map((train, index) => (
                <Train
                    key={index}
                    trainNumber={train.trainNumber}
                    arrivalTime={train.arrivalTime}
                    departureTime={train.departureTime}
                    priority={train.priority}
                />
            ))}
        </PlatformContainer>
    );
};

export default Platform;
