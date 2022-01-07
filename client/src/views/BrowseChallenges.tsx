/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/BrowseChallenges.scss';
import { ChallengesSection } from '../components/challenges';
import FilterSection from '../components/challenges/FilterSection';
import { IChallenge, ILanguage } from '../components/types/types';

const BrowseChallenges: React.FC = () => {
  const [challenges, setChallenges] = React.useState<IChallenge[]>([]);
  const [languages, setLanguages] = React.useState<ILanguage[]>([
    {
      name: 'Any',
      version: 'Any',
    },
  ]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [sortingOptions, setSortingOptions] = React.useState<string[]>(['Any']);

  useEffect(() => {
    fetchTagsAndLanguagesAndSortingOptions();
  }, []);

  /*
  const fetchChallenges = () => {
    axios.get('http://localhost:8080/api/challenge/getAll')
      .then((response) => {
        setChallenges(response.data);
      });
  }; */

  const fetchingHandler = (title: string, selectedTags: string[], language: string, sortingOption: string) => {
    if (language === 'Any') {
      axios.get('http://localhost:8080/api/challenge/getAll', {
        params: {
          title,
          tags: selectedTags,
          sortingOption,
        },
      })
        .then((response) => {
          setChallenges(response.data);
        });
    } else {
      axios.get('http://localhost:8080/api/challenge/getAll', {
        params: {
          title,
          tags: selectedTags,
          language,
          sortingOption,
        },
      })
        .then((response) => {
          setChallenges(response.data);
        });
    }
  };

  const fetchTagsAndLanguagesAndSortingOptions = () => {
    axios.get('http://localhost:8080/api/challenge/tagsAndLanguagesAndSortingOptions')
      .then((response) => {
        const lan = languages;
        lan.push(...response.data.languages);
        setLanguages(lan);

        setTags(response.data.tags);

        const sor = sortingOptions;
        sor.push(...response.data.sortingOptions);
        setSortingOptions(sor);
      });
  };

  return (
    <>
      <FilterSection languages={languages} tags={tags} sortingOptions={sortingOptions} fetchingHandler={fetchingHandler} />
      <ChallengesSection challenges={challenges} />
    </>
  );
};

export default BrowseChallenges;
