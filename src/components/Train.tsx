import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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

const TrainContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  ${({ isArriving }) =>
          isArriving
                  ? css`
                    animation: ${arriveAnimation} 1s ease-out forwards;
                  `
                  : css`
                    animation: ${departAnimation} 1s ease-in forwards;
                  `}
`;

const Engine = styled.div`
  width: 60px;
  height: 38px;
  background-color: #2c3e50;
  position: relative;
  border-radius: 3px;
`;

const Chimney = styled.div`
  width: 10px;
  height: 12px;
  background-color: #34495e;
  position: absolute;
  top: -12px;
  left: 5px;
  border-radius: 3px 3px 0 0;
`;

const EngineWheel = styled.div`
  width: 12px;
  height: 12px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  bottom: -8px;
  left: 20px;
`;

const Car = styled.div`
  width: 60px;
  height: 38px;
  background-color: #3498db;
  position: relative;
  border-radius: 3px;
`;

const CarWheel = styled.div`
  width: 12px;
  height: 12px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  bottom: -8px;
  left: 20px;
`;

const Train = ({ isArriving }) => {
    return (
        <TrainContainer isArriving={isArriving}>
            <Car>
                <CarWheel />
            </Car>
            <Car>
                <CarWheel />
            </Car>
            <Engine>
                <Chimney />
                <EngineWheel />
            </Engine>
        </TrainContainer>
    );
};

export default Train;
