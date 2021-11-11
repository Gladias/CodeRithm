/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/BrowseChallenges.scss';
import { ChallengesSection } from '../components/challenges';
import FilterSection from '../components/challenges/FilterSection';

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

const BrowseChallenges: React.FC = () => {
  const [challenges, setChallenges] = React.useState<IChallenge[]>([]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = () => {
    axios.get('http://127.0.0.1:3000/api/challenge/get')
      .then((response) => {
        setChallenges(response.data.content);
      });
  };

  return (
    <>
      <FilterSection />
      <ChallengesSection challenges={challenges} />
    </>
  );
};

export default BrowseChallenges;
