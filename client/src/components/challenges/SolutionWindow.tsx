/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import styled from 'styled-components';
import { Button, MenuItem, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { CommonButton } from '../common';

const StyledSolutionWindow = styled.div`
    width: 60%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #EDEDED;
    border: 1px solid black;
    border-radius: 0.5rem;

    font-family: 'Meedori BO';

    .MuiOutlinedInput-root {
      background-color: #C2CFB2;
      border-radius: 0.5rem;
      color: black;
      font-family: 'Meedori BO';
      text-align: center;
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #6AA31C;
    }
    
    .nav {
      height: 10%;
      width: 95%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 2.6rem;
      }

      .controls {
        width: 40%;
        display: flex;
        justify-content: space-between;

        .caption {
          font-size: 1.2rem;
          margin-right: 0.2rem;
        }

        .dropdown {
          display: flex;
          align-items: center;
        }
      }
    }

    .solution {
      height: 88%;
      width: 95%;

      background-color: #35373B;
    }
`;

const SolutionWindow: React.FC = () => {
  const languages = [
    {
      value: 'Any',
    },
    {
      value: 'Python',
    },
    {
      value: 'C++',
    },
    {
      value: 'Java',
    },
  ];

  return (
    <StyledSolutionWindow>
      <div className="nav">
        <div className="title">
          Solution
        </div>
        <div className="controls">
          <div className="dropdown">
            <span className="caption">
              Language
            </span>
            <TextField
              id="language"
              value="Python"
              size="small"
              select
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <CommonButton text="Submit" />
        </div>
      </div>
      <div className="solution">
      </div>
    </StyledSolutionWindow>
  );
};

export default SolutionWindow;
