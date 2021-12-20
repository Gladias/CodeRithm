/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Checkbox, FormControlLabel, TextField,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ImageArea, InputArea } from '../components/authentication';
import '../assets/styles/Register.scss';
import profile from '../assets/images/profile.svg';
import { CommonButton } from '../components/common';
import { FunctionalArea } from '../components/profile';
import { RankingFilters, RankingSection } from '../components/ranking';
import '../assets/styles/Ranking.scss';
import { IProfile } from '../components/types/types';

const Ranking: React.FC = () => {
  const [players, setPlayers] = React.useState<IProfile[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/profile/getAll')
      .then((response) => {
        setPlayers(response.data.content);
      });
  }, []);

  return (
    <div className="ranking-container">
      <RankingFilters />
      <RankingSection players={players} />
    </div>
  );
};

export default Ranking;
