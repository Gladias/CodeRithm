/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../assets/styles/Challenge.scss';
import {
  ChallengeDetails, ChallengeTests, SolutionStatistics, SolutionWindow,
} from '../components/challenges';

type IChallenge = {
  [key: string]: string[] | string | number,
  id: number,
  title: string,
  description: string,
  author: string,
  averageRating: number,
  commentsNumber: number,
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD' | 'CHALLENGING',
  solutionStatus: 'New' | 'In Progress' | 'Completed',
  tags: string[];
}

const Challenge: React.FC = () => {
  // const [challenge, setChallenge] = React.useState<IChallenge>({
  const challenge:IChallenge = {
    id: 123,
    title: 'Find the odd int',
    description: 'Given an array of integers, find the one that appears an odd number of times. There will always be only one integer that appears an odd number of times.',
    author: 'Gladias',
    averageRating: 4.76,
    commentsNumber: 34,
    difficultyLevel: 'EASY',
    solutionStatus: 'New',
    tags: ['sorting', 'lists'],
  };

  return (
    <div className="container">
      <div className="row">
        <ChallengeDetails {...challenge} />
        <SolutionWindow />
      </div>
      <div className="row">
        <SolutionStatistics />
        <ChallengeTests />
      </div>
    </div>
  );
};

export default Challenge;
