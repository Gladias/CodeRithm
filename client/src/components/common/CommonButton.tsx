/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

type Props = {
    text: string;
    type?: 'button' | 'submit';
    backgroundcolor?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const StyledButton = styled(Button)<{ backgroundcolor: string}>`
    background-color: ${(props) => props.backgroundcolor};
    color: black;
    font-size: 1.1rem;
    font-family: 'Meedori BO';
    text-transform: none;

    &:hover {
      background-color: ${(props) => props.backgroundcolor};
      filter: brightness(65%);
    }
`;

const CommonButton: React.FC<Props> = ({
  text, type = 'button', backgroundcolor = '#6AA31C', onClick,
}) => (
  <StyledButton size="large" variant="contained" type={type} backgroundcolor={backgroundcolor} onClick={onClick}>{text}</StyledButton>
);

export default CommonButton;
