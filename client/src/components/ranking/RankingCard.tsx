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
import AddIcon from '@mui/icons-material/Add';
import TaskIcon from '@mui/icons-material/Task';
import { IChallenge, IProfile } from '../types/types';

type Props = {
  player: IProfile;
  clickHandler: React.MouseEventHandler<HTMLDivElement>,
};

const StyledRankingCard = styled.div`
    height: 15rem;
    width: 25rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Meedori BO';

    .MuiSvgIcon-root {
      font-size: 2rem;
    }

    :hover {
      filter: brightness(70%);
      cursor: pointer;
    }

    .main {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-around;

      color: #EDEDED;
      background-color: #35373B;
      border-width: 2px 2px 2px 2px;
      border-color: black;
      border-style: solid;
      border-radius: 0.5rem 0.5rem 0 0;
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

        & > div {
          font-family: 'Meedori BO';
          font-size: 1.2rem;
        }
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

    .position {
      width: 100%;
      height: 15%;
      border: 2px solid black;
      border-radius: 0 0 0.5rem 0.5rem;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1.5rem;
      color: black;
      background-color:#ffc70d;
    }
`;

const RankingCard: React.FC<Props> = ({
  player: {
    username, position, generalStats, challengesByDifficulty,
  }, clickHandler,
}) => {
  const completedChallenges = challengesByDifficulty.EASY + challengesByDifficulty.MEDIUM
    + challengesByDifficulty.HARD + challengesByDifficulty.CHALLENGING;

  return (
    <StyledRankingCard onClick={clickHandler}>
      <div className="main">
        <div className="title">
          <PersonIcon />
          <div>
            {username}
          </div>
        </div>
        <div className="details-section">
          <div className="column">
            <div className="icon">
              <AddIcon />
            </div>
            <div className="quantity">
              {generalStats.added}
            </div>
          </div>
          <div className="column">
            <div className="icon">
              <TaskIcon />
            </div>
            <div className="quantity">
              {completedChallenges}
            </div>
          </div>
          <div className="column">
            <div className="icon">
              <CommentIcon />
            </div>
            <div>
              {generalStats.commented}
            </div>
          </div>
        </div>
      </div>
      <div className="position">
        {position}
      </div>
    </StyledRankingCard>
  );
};

export default RankingCard;
