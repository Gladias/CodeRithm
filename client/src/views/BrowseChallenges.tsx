/* eslint-disable no-unused-vars */
import React from 'react';
import '../assets/styles/BrowseChallenges.scss';
import { ChallengesSection } from '../components/challenges';
import FilterSection from '../components/challenges/FilterSection';

const BrowseChallenges: React.FC = () => (
  <>
    <FilterSection />
    <ChallengesSection />
  </>
);

export default BrowseChallenges;
