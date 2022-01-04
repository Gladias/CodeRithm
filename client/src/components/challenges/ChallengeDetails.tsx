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
import { IChallenge } from '../types/types';

type Props = {
  handleAddRate: (rate: number) => void;
  onSwitchClick: React.MouseEventHandler<HTMLButtonElement>;
  challenge: IChallenge;
};

const StyledChallengeCard = styled.div`
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

    .difficulty-level {
      width: 100%;
      height: 5%;
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
      height: 15%;
      justify-content: center;

      .column {
        width: calc(100%/3);

        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.4rem;

        & > div {
          font-family: 'Meedori BO';
        }

        .MuiSvgIcon-root {
          font-size: 1.8rem;
        }
      }

      .stars {
        color: #FFC53A;
      }
    }

    .tags {
      display: flex;
      justify-content: space-evenly;
      width: 90%;
      height: 5%;

      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 100%;
        background-color: #C2CFB2;
        color: black;
        border: 1px solid black;
        border-radius: 0.5rem;
      }
    }

    .title {
      height: 15%;
      font-size: 3rem;
      display: flex;
      align-items: center;
      text-align: center;
      -webkit-text-fill-color: #EDEDED;
      -webkit-text-stroke-width: 0.1rem;
      -webkit-text-stroke-color: black;
      text-shadow: 4px 4px 6px rgba(0, 0, 0, 1);
    }

    .description {
      height: 30%;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      text-align: center;
      overflow: hidden;
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

    .star:hover {
      filter: brightness(70%);
      cursor: pointer;
    }
`;

const ChallengeDetails: React.FC<Props> = ({
  challenge: {
    title, description, author, averageRating, commentsNumber, difficultyLevel, tags,
  }, handleAddRate, onSwitchClick,
}) => {
  const a = 'a';

  const rateChallenge = (rate: number) => {
    handleAddRate(rate);
  };

  return (
    <StyledChallengeCard>
      <div className="difficulty-level">
        <div className={`${difficultyLevel.toLowerCase()} level`}>
          {difficultyLevel}
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
            <StarTwoToneIcon className="star" onClick={() => rateChallenge(1)} />
            <StarTwoToneIcon className="star" onClick={() => rateChallenge(2)} />
            <StarTwoToneIcon className="star" onClick={() => rateChallenge(3)} />
            <StarTwoToneIcon className="star" onClick={() => rateChallenge(4)} />
            <StarTwoToneIcon className="star" onClick={() => rateChallenge(5)} />
          </div>
          <div>
            {averageRating}
          </div>
        </div>
        <div className="column comments">
          <CommentIcon />
          <div>
            {commentsNumber}
          </div>
        </div>
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <div key={tag}>{tag}</div>
        ))}
      </div>
      <div className="title">
        {title}
      </div>
      <div className="description">
        {description}
      </div>
      <div className="comments">
        <CommonButton onClick={onSwitchClick} text="Switch to comments" backgroundcolor="#FFC53A" />
      </div>
    </StyledChallengeCard>
  );
};

export default ChallengeDetails;
