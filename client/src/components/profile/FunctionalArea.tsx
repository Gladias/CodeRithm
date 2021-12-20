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
import AddIcon from '@mui/icons-material/Add';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import CommentIcon from '@mui/icons-material/Comment';
import { CommonButton } from '../common';
import csharp from '../../assets/images/csharp.svg';
import javascript from '../../assets/images/javascript.svg';
import java from '../../assets/images/java.svg';
import python from '../../assets/images/python.svg';
import { IProfile } from '../types/types';

const StyledFunctionalArea = styled.div`
    height: 100%;
    width: calc(200% / 3);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    background-color: #252728;
    border: 1px solid black;
    border-radius: 0.5rem;

    font-family: 'Meedori BO';
    color: #EDEFEC;

    .title {
      font-size: 2rem;
    }

    .section {
      width: 90%;
      height: 15%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      background-color: #35373B;

      .section-title {
        height: 20%;
      }

      .columns {
        height: 75%;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;        
        
        .column {
          height: 90%;
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          
          .difficulty {
            width: 80%;

            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.4rem;

            color: black;
            border: 2px solid black;
            border-radius: 0.5rem;
          }

          .icon, .text, .quantity {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .quantity {
            font-size: 1.3rem;
          }

          .icon {
            height: 30%;
            font-size: 1.5rem;
          }
        }
      }
    }

    .changePassword {
      width: 50%;
      height: 20%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .inputs {
        display: flex;
        justify-content: space-between;
        width: 100%;
        
        .input {
          width: 45%;
          color: white;
        }
      }
    }

    .easy {
      background-color: #6AA31C;
    }

    .medium {
      background-color: #FFC53A;
    }

    .hard {
      background-color: #CA3C25;
    }

    .challenging {
      background-color: #985F99;
    }

    .MuiInputLabel-root {
      color: #EDEFEC;
    }

    .MuiOutlinedInput-root {
          background-color: #35373B;
          border-radius: 4;
          color: #EDEFEC;
        }

    .MuiOutlinedInput-input {
      border-color: #6AA31C;
      font-size: 1.3rem;
    }

    .Mui-focused {
      border: 0;

      fieldset {
        border-color: #6AA31C !important;
      }
    }
`;

const FunctionalArea: React.FC<IProfile> = ({
  challengesByDifficulty, generalStats, challengesByLanguage,
}) => {
  const a = 'a';

  return (
    <StyledFunctionalArea>
      <div className="title">
        Account statistics
      </div>
      <div className="section difficulties">
        <div className="section-title">
          Completed challenges by difficulty level
        </div>
        <div className="columns">
          <div className="column">
            <div className="difficulty easy">
              Easy
            </div>
            <div className="quantity">
              {challengesByDifficulty.EASY}
            </div>
          </div>

          <div className="column">
            <div className="difficulty medium">
              Medium
            </div>
            <div className="quantity">
              {challengesByDifficulty.MEDIUM}
            </div>
          </div>

          <div className="column">
            <div className="difficulty hard">
              Hard
            </div>
            <div className="quantity">
              {challengesByDifficulty.HARD}
            </div>
          </div>
          <div className="column">
            <div className="difficulty challenging">
              Challenging
            </div>
            <div className="quantity">
              {challengesByDifficulty.CHALLENGING}
            </div>
          </div>
        </div>
      </div>
      <div className="section challenges">
        <div className="section-title">
          Challenges
        </div>
        <div className="columns">
          <div className="column">
            <div className="icon">
              <AddIcon />
            </div>
            <div className="text">
              Added
            </div>
            <div className="quantity">
              {generalStats.added}
            </div>
          </div>
          <div className="column">
            <div className="icon">
              <StarBorderRoundedIcon />
            </div>
            <div className="text">
              Rated
            </div>
            <div className="quantity">
              {generalStats.rated}
            </div>
          </div>
          <div className="column">
            <div className="icon">
              <CommentIcon />
            </div>
            <div className="text">
              Commented
            </div>
            <div className="quantity">
              {generalStats.commented}
            </div>
          </div>
        </div>
      </div>
      <div className="section solutions">
        <div className="section-title">
          Completed challenges by language
        </div>
        <div className="columns">
          <div className="column">
            <div className="icon">
              <img src={python} alt="" />
            </div>
            <div className="text">
              Python
            </div>
            <div className="quantity">
              {challengesByLanguage.python}
            </div>
          </div>
          <div className="column">
            <img className="icon" src={java} alt="" />
            <div className="text">
              Java
            </div>
            <div className="quantity">
              {challengesByLanguage.java}
            </div>
          </div>
          <div className="column">
            <img className="icon" src={javascript} alt="" />
            <div className="text">
              JavaScript
            </div>
            <div className="quantity">
              {challengesByLanguage.javascript}
            </div>
          </div>
          <div className="column">
            <img className="icon" src={csharp} alt="" />
            <div className="text">
              C#
            </div>
            <div className="quantity">
              {challengesByLanguage.csharp}
            </div>
          </div>
        </div>
      </div>
      <div className="title">
        Change password
      </div>
      <div className="changePassword">
        <div className="inputs">
          <TextField className="input" id="currentPassword" label="Current password" type="password" variant="outlined" />
          <TextField className="input" id="newPassword" label="New password" type="password" variant="outlined" />
        </div>
        <div className="button">
          <CommonButton text="Submit" type="submit" />
        </div>
      </div>
    </StyledFunctionalArea>
  );
};

export default FunctionalArea;
