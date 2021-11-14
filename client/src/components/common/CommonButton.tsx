/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

type Props = {
    text: string;
    type?: 'button' | 'submit';
    backgroundcolor?: string,
    hovercolor?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const StyledButton = styled(Button)<{ backgroundcolor: string, hovercolor: string }>`
    background-color: ${(props) => props.backgroundcolor};
    color: black;
    font-size: 1.1rem;
    font-family: 'Meedori BO';
    text-transform: none;
    :hover {
      background-color: ${(props) => props.hovercolor};
    }
`;

const CommonButton: React.FC<Props> = ({
  text, type = 'button', backgroundcolor = '#6AA31C', hovercolor = '#517C15', onClick,
}) => (
  <StyledButton size="large" variant="contained" type={type} backgroundcolor={backgroundcolor} hovercolor={hovercolor} onClick={onClick}>{text}</StyledButton>
);

export default CommonButton;
