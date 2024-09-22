import styled, { keyframes } from 'styled-components';

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledInput = styled.input`
  margin-right: 10px;
`;


// Keyframe for train arrival animation
export const arrive = keyframes`
  0% {
    left: -150px; /* Start position (offscreen) */
  }
  100% {
    left: 200px; /* Final position on the platform */
  }
`;

// Keyframe for train departure animation
export const depart = keyframes`
  0% {
    left: 200px; /* Start position on the platform */
  }
  100% {
    left: 150%; /* Move off-screen */
  }
`;

// Styled container for platforms
export const PlatformContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

// Styled div for each platform
export const Platform = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

// Platform label (e.g., "Platform P1")
export const PlatformLabel = styled.div`
  position: absolute;
  left: 10px;
  top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

// Train box that will be animated onto the platform
export const TrainBox = styled.div`
  position: absolute;
  height: 30px;
  width: 100px;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  top: 10px;
  left: ${({isDeparting}) => (isDeparting ? '20px' : '-450px')}; /* Starting position */
  animation: ${({isDeparting}) => (isDeparting ? depart : arrive)} 2s forwards;
\` ;
`;

export const DashboardGrid = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const DepartingTrainBox = styled(TrainBox)`
  background-color: red;
  color: white;
  font-weight: bold;
  animation: fadeOut 2s forwards;  // Ensure the animation lasts for 2 seconds

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
