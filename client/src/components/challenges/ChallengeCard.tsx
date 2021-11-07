/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

type Props = {
  title: string,
  description: string,
  author: string,
  rating: string,
  comments: number,
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Challenging',
  status: 'New' | 'In Progress' | 'Completed',
};

const StyledChallengeCard = styled.div`
    height: 25rem;
    width: 25rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Meedori BO';

    .main {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-around;

      color: #EDEDED;
      background-color: #35373B;
      border-width: 2px 2px 0 2px;
      border-color: black;
      border-style: solid;
      border-radius: 0.5rem 0.5rem 0 0;
    }

    .difficulty-level {
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      
      .level {
        width: 25%;
        height: 100%;

        color: black;
        border: 2px solid black;
        border-radius: 0.5rem;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .details-section {
      display: flex;
      width: 100%;
      justify-content: center;

      .column {
        width: calc(100%/3);
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .stars {
        color: #FFC53A;
      }
    }

    .title {
      font-size: 2.2rem;
      text-align: center;
      -webkit-text-fill-color: #EDEDED;
      -webkit-text-stroke-width: 0.1rem;
      -webkit-text-stroke-color: black;
      text-shadow: 4px 4px 6px rgba(0, 0, 0, 1);
    }

    .description {
      text-align: center;
      overflow: hidden;
    }

    .status {
      width: 100%;
      height: 15%;
      border: 2px solid black;
      border-radius: 0 0 0.5rem 0.5rem;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1.5rem;
      color: black;
    }

    .blue {
      background-color: #3DA5D9;
    }

    .white {
      background-color: #EDEDED;
    }

    .green, .Easy {
      background-color: #6AA31C;
    }

    .Medium {
      background-color: #FFC53A;
    }

    .Hard {
      background-color: #CA3C25;
    }

    .Challenging {
      background-color: #985F99;
    }
`;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'green';
    case 'In Progress':
      return 'blue';
    default:
      return 'white';
  }
};

const ChallengeCard: React.FC<Props> = ({
  title, description, author, rating, comments, difficulty, status,
}) => {
  const statusColor = getStatusColor(status);

  return (
    <StyledChallengeCard>
      <div className="main">
        <div className="difficulty-level">
          <div className={`${difficulty} level`}>
            {difficulty}
          </div>
        </div>
        <div className="details-section">
          <div className="column author">
            <PersonIcon />
            <div>
              {author}
            </div>
          </div>
          <div className="column rating">
            <div className="stars">
              <StarTwoToneIcon />
              <StarTwoToneIcon />
              <StarTwoToneIcon />
              <StarTwoToneIcon />
              <StarTwoToneIcon />
            </div>
            <div>
              {rating}
            </div>
          </div>
          <div className="column comments">
            <CommentIcon />
            <div>
              {comments}
            </div>
          </div>
        </div>
        <div className="title">
          {title}
        </div>
        <div className="description">
          {description}
        </div>
      </div>
      <div className={`${statusColor} status`}>
        {status}
      </div>
    </StyledChallengeCard>
  );
};

export default ChallengeCard;
