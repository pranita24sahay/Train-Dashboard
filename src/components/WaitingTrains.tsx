import React from 'react';
import styled from 'styled-components';
import { TrainType } from '../types';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    padding: 10px;
    text-align: left;
    font-weight: bold;
    border-bottom: 2px solid #ddd;
    background-color: #f5f5f5;
`;

const Td = styled.td`
    padding: 8px 12px;
    border-bottom: 1px solid #ddd;
    text-align: left;
`;

const Tr = styled.tr<{ isEven: boolean }>`
    background-color: ${({ isEven }) => (isEven ? '#f9f9f9' : '#fff')};
`;

const NoTrainsMessage = styled.p`
    color: #777;
    font-style: italic;
`;

interface WaitingTrainsProps {
    getUnallocatedArrivedTrains: TrainType[];
}

const WaitingTrains = ({ getUnallocatedArrivedTrains }: WaitingTrainsProps) => (
    <div>
        <h2>Waiting Trains</h2>
        {getUnallocatedArrivedTrains.length > 0 ? (
            <Table>
                <thead>
                <tr>
                    <Th>Train Number</Th>
                    <Th>Priority</Th>
                    <Th>Arrival Time</Th>
                </tr>
                </thead>
                <tbody>
                {getUnallocatedArrivedTrains.map((train, index) => (
                    <Tr key={index} isEven={index % 2 === 0}>
                        <Td>{train.trainNumber}</Td>
                        <Td>{train.priority}</Td>
                        <Td>{train.arrivalTime}</Td>
                    </Tr>
                ))}
                </tbody>
            </Table>
        ) : (
            <NoTrainsMessage>No waiting trains at the moment</NoTrainsMessage>
        )}
    </div>
);

export default WaitingTrains;
