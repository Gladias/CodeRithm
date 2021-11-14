/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import styled from 'styled-components';
import { Button, MenuItem, TextField } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import CodeIcon from '@mui/icons-material/Code';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { CommonButton } from '../common';

const StyledSolutionStatistics = styled.div`
    height: 100%;
    width: 34%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    background-color: #35373B;
    border: 1px solid black;
    border-radius: 0.5rem;

    font-family: 'Meedori BO';

    .title {
      height: 10%;

      display: flex;
      align-items: center;
      text-align: center;

      font-size: 2rem;
      -webkit-text-fill-color: #EDEDED;
      -webkit-text-stroke-width: 0.1rem;
      -webkit-text-stroke-color: black;
      text-shadow: 4px 4px 6px rgba(0, 0, 0, 1);
    }

    .statistics {
      display: flex;
      align-items: center;
      height: 85%;
      width: 90%;

      .column {
        height: 60%;
        width: calc(100%/3);

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        text-align: center;
        align-items: center;

        font-family: 'Meedori BO';
        color: #EDEFEC;

        .caption {
          font-size: 0.8rem;
        }

        .MuiSvgIcon-root {
          font-size: 3rem;
        }

        .value {
          color: #6AA31C;
          font-size: 1.2rem;
        }
      }
    }
`;

const SolutionStatistics: React.FC = () => {
  const languages = 1;

  return (
    <StyledSolutionStatistics>
      <div className="title">
        Last run statistics
      </div>
      <div className="statistics">
        <div className="column tests">
          <div className="caption">
            Tests passed
          </div>
          <AssignmentTurnedInOutlinedIcon />
          <div className="value">
            3 / 5
          </div>
        </div>
        <div className="column lines">
          <div className="caption">
            Code lines
          </div>
          <CodeIcon />
          <div className="value">
            108 / 120
          </div>
        </div>
        <div className="column time">
          <div className="caption">
            Execution time
          </div>
          <TimerIcon />
          <div className="value">
            12.3 / 30 s
          </div>
        </div>
      </div>
    </StyledSolutionStatistics>
  );
};

export default SolutionStatistics;
