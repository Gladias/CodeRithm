/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Checkbox, FormControlLabel, TextField,
} from '@mui/material';

import React, { useState } from 'react';
import { ImageArea, InputArea } from '../components/authentication';
import '../assets/styles/Register.scss';
import profile from '../assets/images/profile.svg';
import { CommonButton } from '../components/common';
import { FunctionalArea } from '../components/profile';
import { RankingFilters, RankingSection } from '../components/ranking';
import '../assets/styles/Study.scss';
import { StudySection } from '../components/study';

const Study: React.FC = () => {
  const a = 'a';

  return (
    <div className="study-container">
      <StudySection />
    </div>
  );
};

export default Study;
