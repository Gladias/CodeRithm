/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, MenuItem, TextField } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import CodeIcon from '@mui/icons-material/Code';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { CommonButton } from '../common';

const StyledAddComment = styled.div`
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

    .header {
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      text-align: center;

      .title {
        font-size: 2rem;
        -webkit-text-fill-color: #EDEDED;
        -webkit-text-stroke-width: 0.1rem;
        -webkit-text-stroke-color: black;
        text-shadow: 4px 4px 6px rgba(0, 0, 0, 1);
      }

      .rules {
        font-size: 1.1rem;
        color: #CA3C25;
        text-shadow: 4px 4px 6px rgba(0, 0, 0, 1);
      }
    }

    .comment-section {
      height: 65%;
      width: 90%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .comment {
        width: 80%;
        height: 80%;

        .MuiOutlinedInput-root {
          font-size: 1.4rem;
          color: #F1F1F1;
          background-color: #252728;
          border: 1px solid black;
          border-radius: 0.5rem;
        }

        .Mui-focused {
          border: 0;

          fieldset {
            border-color: #6AA31C;
          }
        }
      }

      .buttons {
        width: 15%;
        height: 45%;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .add, .clear {
          width: 100%;

          color: black;
          border: 1px solid black;
          font-family: 'Meedori BO';
          font-size: 1.1rem;
          text-transform: none;

          &:hover {
            filter: brightness(50%);
          }
        }
        
        .add {
          background-color: #6AA31C;
        }
        
        .clear {
          background-color: #CA3C25;
        }
      }
    }
`;

const AddComment: React.FC = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <StyledAddComment>
      <div className="header">
        <div className="title">
          Add comment
        </div>
        <div className="rules">
          Rules: 1. Don’t Post spoilers 2. Swear words not allowed
        </div>
      </div>
      <div className="comment-section">
        <TextField className="comment" value={comment} onChange={handleCommentChange} multiline rows={5} placeholder="Enter comment" />
        <div className="buttons">
          <Button className="add" variant="contained" type="button">
            Add
          </Button>
          <Button className="clear" variant="contained" type="button">
            Clear
          </Button>
        </div>
      </div>
    </StyledAddComment>
  );
};

export default AddComment;
