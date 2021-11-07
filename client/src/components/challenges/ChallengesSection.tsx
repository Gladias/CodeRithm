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

};

type IChallange = {
  [key: string]: string | number,
  title: string,
  description: string,
  author: string,
  rating: string,
  comments: number,
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Challenging',
  status: 'New' | 'In Progress' | 'Completed',
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

const ChallengesSection: React.FC<Props> = () => {
  const exampleChallange1: IChallange = {
    title: 'Find the odd int',
    description: 'Given an array of integers, find the one that appears an odd number of times. There will always be only one integer that appears an odd number of times.',
    author: 'Gladias',
    rating: '4.76',
    comments: 34,
    difficulty: 'Easy',
    status: 'New',
  };

  const exampleChallange2: IChallange = {
    title: 'Stack implementation',
    description: 'Given an array of integers, find the one that appears an odd number of times. There will always be only one integer that appears an odd number of times.',
    author: 'Maras',
    rating: '4.76',
    comments: 34,
    difficulty: 'Hard',
    status: 'Completed',
  };

  const exampleChallange3: IChallange = {
    title: 'Bubble sort',
    description: 'Given an array of integers, find the one that appears an odd number of times. There will always be only one integer that appears an odd number of times.',
    author: 'Myszek',
    rating: '2.76',
    comments: 55,
    difficulty: 'Medium',
    status: 'In Progress',
  };

  const [challanges, setChallanges] = React.useState<IChallange[]>(
    [exampleChallange1, exampleChallange2, exampleChallange3],
  );

  return (
    <StyledChallengesSection>
      <div className="header">
        <span>
          Found
          {' '}
          {challanges.length}
          {' '}
          challenges
        </span>
      </div>
      <div className="body">
        {challanges.map((challenge) => (
          <ChallengeCard {...challenge} />
        ))}
      </div>
    </StyledChallengesSection>
  );
};

export default ChallengesSection;
