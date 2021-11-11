/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChallengeCard from './ChallengeCard';

type Props = {
  challenges: IChallenge[];
};

type IChallenge = {
  [key: string]: string | number,
  id: number,
  title: string,
  description: string,
  author: string,
  averageRating: number,
  commentsNumber: number,
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD' | 'CHALLENGING',
  solutionStatus: 'New' | 'In Progress' | 'Completed',
}

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
  }
`;

const ChallengesSection: React.FC<Props> = ({ challenges }) => {
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
          <ChallengeCard {...challenge} key={challenge.id} />
        ))}
      </div>
    </StyledChallengesSection>
  );
};

export default ChallengesSection;
