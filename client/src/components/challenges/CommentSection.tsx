/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { CommonButton } from '../common';
import { IComment } from '../types/types';

type Props = {
  comments: IComment[],
  onSwitchClick: React.MouseEventHandler<HTMLButtonElement>;
};

const StyledCommentSection = styled.div`
    height: 100%;
    width: 34%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    font-family: 'Meedori BO';

    color: #EDEDED;
    background-color: #35373B;
    border: 1px solid black;
    border-radius: 0.5rem;

    .title {
      font-size: 2rem;
      -webkit-text-fill-color: #EDEDED;
      -webkit-text-stroke-width: 0.1rem;
      -webkit-text-stroke-color: black;
      text-shadow: 4px 4px 6px rgba(0, 0, 0, 1);
    }

    .comment-section {
      height: 80%;
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;

      .comment {
        width: 90%;
        height: auto;
        padding: 1rem;
        margin-bottom: 1rem;

        display: flex;
        flex-direction: column;
        justify-content: center;

        .date {
          height: 15%;

          display: flex;
          justify-content: flex-end;
        }

        .row {
          height: 85%;
          display: flex;
          justify-content: space-between;

          .author {
            width: 20%;
            font-size: 1rem;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .MuiSvgIcon-root {
              font-size: 1.8rem;
            }
          }

          .text {
            width: 70%;
            font-size: 1.2rem;
            padding: 1rem;

            background-color: #252728;

            border: 1px solid black;
            border-radius: 1rem;

            font-family: 'Meeralnimai RE';
          }
        }
      }
    }
`;

const CommentSection: React.FC<Props> = ({ comments, onSwitchClick }) => {
  const commentContent = 'Given an array of integers, find the one that appears an odd number of times. There will always be only one integer that appears an odd number of times.';
  console.log({ comments });

  const formatDate = (date: Date) => `${date.getDay}/${date.getMonth}/${date.getFullYear}`;

  return (
    <StyledCommentSection>
      <div className="title">
        Posted Comments:
        {' '}
        {comments.length}
      </div>
      <div className="comment-section">
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            {console.log(() => formatDate(new Date(comment.creationTime)))}
            <div className="date">
              {() => formatDate(new Date(comment.creationTime))}
            </div>
            <div className="row">
              <div className="author">
                <PersonIcon />
                <div>
                  {comment.author}
                </div>
              </div>
              <div className="text">
                {comment.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="challenge">
        <CommonButton onClick={onSwitchClick} text="Switch to challenge" backgroundcolor="#FFC53A" />
      </div>
    </StyledCommentSection>
  );
};

export default CommentSection;
