import styled, { keyframes } from 'styled-components';

// Styled component for the header actions (file input and button)
export const HeaderActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

// Styled component for the file input
export const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

// Styled component for the button
export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Styled component for the container holding all platforms
export const PlatformContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

// Styled component for each individual platform
export const Platform = styled.div`
  width: 90%;
  max-height: 40px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

// Styled component for the platform label
export const PlatformLabel = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 8px;
  margin-top: 8px;
  text-align: center;
  font-weight: bold;
`;

// Keyframes for arriving train animation
const arrive = keyframes`
  0% {
    left: -450px; /* Off the platform */
  }
  100% {
    left: 20px; /* Final position on the platform */
  }
`;

// Keyframes for departing train animation
const depart = keyframes`
  0% {
    left: 20px; /* Starting from the platform */
  }
  100% {
    left: 450px; /* Moving off the platform */
  }
`;

// Train box that will be animated onto the platform
export const TrainBox = styled.div`
  position: relative;
  height: 30px;
  width: 100px;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  top: -30px;
  left: ${({ isDeparting }) => (isDeparting ? '20px' : '-450px')}; /* Initial position */
  animation: ${({ isDeparting }) => (isDeparting ? depart : arrive)} 2s forwards;
`;

// Styled component for departing train boxes
export const DepartingTrainBox = styled(TrainBox)`
  background-color: #FFD700; /* Highlight departing trains */
`;

// Dashboard layout container
export const DashboardGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 16px;
`;

// Styled component for train details (name and status row)
export const TrainDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Styled component for additional train info (e.g., times)
export const TrainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #555;
`;

// Styled component for the train number
export const TrainNumber = styled.span`
  color: #333;
`;

// Styled component for the train status (e.g., departing)
export const TrainStatus = styled.span`
  color: red;
  font-weight: bold;
`;
