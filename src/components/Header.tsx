import React from 'react';
import {StyledButton, StyledInput, HeaderActions as HeaderWrapper} from './styles';

const HeaderActions = ({ handleFileUpload, handleGenerateMockData }) => (
    <HeaderWrapper>
        <StyledInput type="file" accept=".csv" onChange={handleFileUpload}/>
        <StyledButton onClick={handleGenerateMockData}>Generate Mock Train Data</StyledButton>
    </HeaderWrapper>
);

export default HeaderActions;
