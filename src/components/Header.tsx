import React,{ChangeEvent} from 'react';
import {StyledButton, StyledInput, HeaderActions as HeaderWrapper} from './styles';

interface HeaderActionsProps {
    handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    handleGenerateMockData: () => void;
}

const HeaderActions = ({ handleFileUpload, handleGenerateMockData } : HeaderActionsProps) => (
    <HeaderWrapper>
        <StyledInput type="file" accept=".csv" onChange={handleFileUpload}/>
        <StyledButton onClick={handleGenerateMockData}>Generate Mock Train Data</StyledButton>
    </HeaderWrapper>
);

export default HeaderActions;
