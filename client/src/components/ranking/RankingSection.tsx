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

const StyledRankingSection = styled.div`
  background-color: #252728;
  color: #EDEFEC;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 71%;
  width: 100%;
`;

const RankingSection: React.FC = () => {
  const history = useHistory();

  const handleCardClick = (challengeId: number) => {
    history.push(`/challenge/${challengeId}`);
  };

  return (
    <StyledRankingSection>
    </StyledRankingSection>
  );
};

export default RankingSection;
