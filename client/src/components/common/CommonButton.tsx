import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

type Props = {
    text: string;
    type?: 'button' | 'submit';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

const CommonButton: React.FC<Props> = ({ text, type, onClick }) => (
  <StyledButton size="large" variant="contained" type={type} onClick={onClick}>{text}</StyledButton>
);

CommonButton.defaultProps = {
  type: 'button',
  onClick: undefined,
};

export default CommonButton;
