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
import ChallengeCard from './ChallengeCard';
import { IChallenge } from '../types/types';

type Props = {
  challenges: IChallenge[];
};

const StyledChallengesSection = styled.div`
  background-color: #252728;
  color: #EDEFEC;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 71%;
  width: 100%;

  .header {
    height: 10%;
    font-size: 2.6rem;
    font-family: 'Meedori BO';
    display: flex;
    align-items: center;
  }

  .body {
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: auto;
  }
`;

const ChallengesSection: React.FC<Props> = ({ challenges }) => {
  const history = useHistory();

  const handleCardClick = (challengeId: number) => {
    history.push(`/challenge/${challengeId}`);
  };

  return (
    <StyledChallengesSection>
      <div className="header">
        <span>
          Found
          {' '}
          {challenges.length}
          {' '}
          challenges
        </span>
      </div>
      <div className="body">
        {challenges.map((challenge) => (
          <ChallengeCard clickHandler={() => handleCardClick(challenge.id)} challenge={challenge} key={challenge.id} />
        ))}
      </div>
    </StyledChallengesSection>
  );
};

export default ChallengesSection;
