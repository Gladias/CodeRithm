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
import { IChallengeTests, ISolutionRequest } from '../types/types';

const StyledChallengeTests = styled.div`
    height: 100%;
    width: 60%;

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

    .table {
      width: 90%;
      height: 85%;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;

        .header {
          height: 15%;
          font-size: 1.5rem;
          font-family: 'Meedori BO';
        }

        .row {
          width: 90%;
          height: 15%;
          color: white;
          display: flex;
          justify-content: flex-start;
          width: 100%;
          font-family: 'Meeralnimai RE';
          font-size: 1.3rem;

          .cell {
            width: calc(100%/3);
          }
        }

        .correct {
          color: #6AA31C;
        }

        .wrong {
          color: #CA3C25;
        }

      .line-number {
        color: #C2CFB2;
      }
    }
`;

const ChallengeTests: React.FC<IChallengeTests> = ({ testCases }) => {
  const languages = 1;

  return (
    <StyledChallengeTests>
      <div className="title">
        Sample tests
      </div>
      <div className="table">
        <div className="row">
          <div className="header cell">
            Input
          </div>
          <div className="header cell">
            Expected output
          </div>
          <div className="header ">
            {'Your\'s output'}
          </div>
        </div>
        {testCases.map((test) => (
          <div className={`row ${test.output === test.userOutput ? 'correct' : 'wrong'}`}>
            <div className="cell">
              {test.input}
            </div>
            <div className="cell">
              {test.output}
            </div>
            <div className="cell">
              {test.userOutput}
            </div>
          </div>
        ))}
      </div>
    </StyledChallengeTests>
  );
};

export default ChallengeTests;
