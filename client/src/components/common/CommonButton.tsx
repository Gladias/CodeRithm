import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

type Props = {
    text: string;
};

const StyledButton = styled(Button)`
    background-color: #6AA31C;
    color: black;
    font-size: 1.1rem;
    font-family: 'Meedori BO';
    :hover {
        background-color: #517C15;
    }
`;

const CommonButton: React.FC<Props> = ({ text }) => (
  <StyledButton size="large" variant="contained">{text}</StyledButton>
);

export default CommonButton;
