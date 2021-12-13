/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/BrowseChallenges.scss';
import { Button } from '@mui/material';
import { AddChallengeForm, ChallengesSection } from '../components/challenges';
import FilterSection from '../components/challenges/FilterSection';
import { IChallenge, ILanguage, IMultipleSelectOption } from '../components/types/types';
import { PageTitle } from '../components/common';
import '../assets/styles/AddChallenge.scss';

const AddChallenge: React.FC = () => {
  const [availableLanguages, setAvailableLanguages] = React.useState<ILanguage[]>([]);
  const [availableTags, setAvailableTags] = React.useState<string[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/challenge/tagsAndLanguages')
      .then((response) => {
        console.log(response);
        setAvailableLanguages(response.data.languages);
        setAvailableTags(response.data.tags);
      });
  }, []);

  return (
    <div className="addChallenge-container">
      <PageTitle text="Add Challenge" />
      <AddChallengeForm availableLanguages={availableLanguages} availableTags={availableTags} />
    </div>
  );
};

export default AddChallenge;
