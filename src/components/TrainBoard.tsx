import React from 'react';
import styled from 'styled-components';

// Styled Components for the glowing red effect
const TrainBoardContainer = styled.div`
  background-color: black;
  padding: 20px;
  width: 500px;
  border-radius: 10px;
`;

const TrainTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TrainRow = styled.tr`
  color: #ff4500;
  font-family: 'Courier New', Courier, monospace;
  font-size: 18px;
  text-align: left;
`;

const TrainHeader = styled.th`
  color: #ffffff;
  background-color: black;
  padding: 10px;
`;

const TrainCell = styled.td`
  padding: 10px;
  color: #ff4500;
  background-color: black;
  text-shadow: 0px 0px 5px rgba(255, 0, 0, 0.75);
`;

const TrainBoard = ({ trains }) => {
    return (
        <div>
        <h2>Train Board</h2><TrainBoardContainer>
            <TrainTable>
                <thead>
                <TrainRow>
                    <TrainHeader>Train No.</TrainHeader>
                    <TrainHeader>Expt. Time</TrainHeader>
                    <TrainHeader>Dept. Time</TrainHeader>
                    <TrainHeader>PF No.</TrainHeader>
                </TrainRow>
                </thead>
                <tbody>
                {trains.map((train, index) => (
                    <TrainRow key={index}>
                        <TrainCell>{train.trainNumber}</TrainCell>
                        <TrainCell>{train.arrivalTime}</TrainCell>
                        <TrainCell>{train.departureTime}</TrainCell>
                        <TrainCell>{train.platform}</TrainCell>
                    </TrainRow>
                ))}
                </tbody>
            </TrainTable>
        </TrainBoardContainer>
        </div>
    );
};

export default TrainBoard;
