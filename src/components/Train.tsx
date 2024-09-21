import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const arriveAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const departAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

// Container for each train's details
const TrainContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

// Row layout for the train information
const TrainInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

// Information for each train
const TrainInfoLabel = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const TrainInfoValue = styled.span`
  font-size: 14px;
  color: #333;
`;

// Button for train details
const TrainButton = styled.button`
  padding: 5px 12px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// Define props for the Train component
interface TrainProps {
    trainNumber: string;
    arrivalTime: string;
    departureTime: string;
    priority: string;
    isArriving: boolean;
}

const Train = ({
                                         trainNumber,
                                         arrivalTime,
                                         departureTime,
                                         priority,
                                         isArriving,
                                     }:TrainProps) => {
    return (
        <TrainContainer>
            <TrainInfoRow>
                <TrainInfoLabel>Train No:</TrainInfoLabel>
                <TrainInfoValue>{trainNumber}</TrainInfoValue>
            </TrainInfoRow>
            <TrainInfoRow>
                <TrainInfoLabel>Arrives:</TrainInfoLabel>
                <TrainInfoValue>{arrivalTime}</TrainInfoValue>
            </TrainInfoRow>
            <TrainInfoRow>
                <TrainInfoLabel>Departs:</TrainInfoLabel>
                <TrainInfoValue>{departureTime}</TrainInfoValue>
            </TrainInfoRow>
            <TrainInfoRow>
                <TrainInfoLabel>Priority:</TrainInfoLabel>
                <TrainInfoValue>{priority}</TrainInfoValue>
            </TrainInfoRow>
            <TrainButton>Details</TrainButton>
        </TrainContainer>
    );
};

export default Train;
