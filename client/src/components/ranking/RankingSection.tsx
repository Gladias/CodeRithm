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
import { IChallenge, IProfile } from '../types/types';
import { ImageArea } from '../authentication';
import ranking from '../../assets/images/ranking.svg';
import RankingCard from './RankingCard';

type Props = {
  players: IProfile[];
};

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

const RankingSection: React.FC<Props> = ({ players }) => {
  const history = useHistory();

  const handleCardClick = (playerId: number) => {
    history.push(`/profile/${playerId}`);
  };

  return (
    <StyledRankingSection>
      <div className="image-section">
        <div className="caption">
        </div>
        <div className="image">
          <img src={ranking} alt="" />
        </div>
      </div>
      <div className="cards-section">
        <div className="caption">
          <span>
            {`Found ${players.length} players`}
          </span>
        </div>
        <div className="body">
          {players.map((player) => (
            <RankingCard clickHandler={() => handleCardClick(player.id)} player={player} key={player.id} />
          ))}
        </div>
      </div>
    </StyledRankingSection>
  );
};

export default RankingSection;
