/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/BrowseChallenges.scss';
import { ChallengesSection } from '../components/challenges';
import FilterSection from '../components/challenges/FilterSection';
import { IChallenge } from '../components/types/types';

const BrowseChallenges: React.FC = () => {
  const [challenges, setChallenges] = React.useState<IChallenge[]>([]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = () => {
    axios.get('http://127.0.0.1:8080/api/challenge/getAll')
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
