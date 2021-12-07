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
      width: 80%;
      height: 10%;

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
          height: 70%;
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          
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

          .quantity {
            font-size: 1.3rem;
          }
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
`;

const FunctionalArea: React.FC = () => {
  const a = 'a';

  return (
    <StyledFunctionalArea>
      <div className="title">
        Account statistics
      </div>
      <div className="section difficulties">
        <div className="section-title">
          Completed challenges
        </div>
        <div className="columns">
          <div className="column">
            <div className="difficulty easy">
              Easy
            </div>
            <div className="quantity">
              1
            </div>
          </div>

          <div className="column">
            <div className="difficulty medium">
              Medium
            </div>
            <div className="quantity">
              2
            </div>
          </div>

          <div className="column">
            <div className="difficulty hard">
              Hard
            </div>
            <div className="quantity">
              3
            </div>
          </div>
          <div className="column">
            <div className="difficulty challenging">
              Challenging
            </div>
            <div className="quantity">
              4
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
              1
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
              2
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
              3
            </div>
          </div>
        </div>
      </div>
      <div className="section solutions">
        <div className="section-title">
          Challenges
        </div>
        <div className="columns">
          <div className="column">
            <div className="icon">

            </div>
            <div className="text">
              Python
            </div>
            <div className="quantity">
              1
            </div>
          </div>
          <div className="column">
            <div className="icon">

            </div>
            <div className="text">
              Java
            </div>
            <div className="quantity">
              2
            </div>
          </div>
          <div className="column">
            <div className="icon">

            </div>
            <div className="text">
              C++
            </div>
            <div className="quantity">
              3
            </div>
          </div>
        </div>
      </div>
      <div className="title">
        Change password
      </div>
      <div className="changePassword">
        <div className="inputs">
          <TextField id="login" label="Current password" type="password" variant="outlined" />
          <TextField id="login" label="New password" type="password" variant="outlined" />
        </div>
        <div>
          <CommonButton text="Submit" type="submit" />
        </div>
      </div>
    </StyledFunctionalArea>
  );
};

export default FunctionalArea;
