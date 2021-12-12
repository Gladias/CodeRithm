/* eslint-disable react/self-closing-comp */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { IChallenge } from '../types/types';
import { ImageArea } from '../authentication';
import ranking from '../../assets/images/ranking.svg';
import RankingCard from './RankingCard';

const StyledRankingSection = styled.div`
  background-color: #252728;
  color: #EDEFEC;
  display: flex;
  align-items: center;
  height: 80%;
  width: 100%;

  .caption {
    font-size: 2.5rem;
    font-family: 'Meedori BO';
    text-align: center;
    color: #6AA31C;
  }
  
  .image-section {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;


    img {
      width: 90%;
      height: auto;
    }
  }

  .cards-section {
    width: 58%;
    height: 100%;
    
    .body {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      & > div {
        margin-top: 1rem;
        width: 30%;
      }
    }
  }
`;

const RankingSection: React.FC = () => {
  const history = useHistory();

  const handleCardClick = (challengeId: number) => {
    history.push(`/challenge/${challengeId}`);
  };

  const players = [
    {
      position: 1,
      user: 'Gladias',
      addedChallenges: 1,
      solutions: 2,
      comments: 3,
    },
    {
      position: 2,
      user: 'Admin',
      addedChallenges: 3,
      solutions: 4,
      comments: 5,
    },
    {
      position: 3,
      user: 'Admin',
      addedChallenges: 85,
      solutions: 21,
      comments: 62,
    },
    {
      position: 4,
      user: 'Admin',
      addedChallenges: 85,
      solutions: 21,
      comments: 62,
    },
  ];

  return (
    <StyledRankingSection>
      <div className="image-section">
        <div className="caption">
          <span>
            Your position: 24
          </span>
        </div>
        <div className="image">
          <img src={ranking} alt="" />
        </div>
      </div>
      <div className="cards-section">
        <div className="caption">
          <span>
            Found
            {' '}
            {41}
            {' '}
            players
          </span>
        </div>
        <div className="body">
          {players.map((player) => (
            <RankingCard {...player} key={player.position} />
          ))}
        </div>
      </div>
    </StyledRankingSection>
  );
};

export default RankingSection;
