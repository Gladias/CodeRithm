/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Checkbox, FormControlLabel, TextField,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { ImageArea, InputArea } from '../components/authentication';
import '../assets/styles/Profile.scss';
import profile from '../assets/images/profile.svg';
import { CommonButton } from '../components/common';
import { FunctionalArea } from '../components/profile';
import { IProfile } from '../components/types/types';
import axios from 'axios';

const defaultProfileData: IProfile = {
  username: '',
  challengesByDifficulty: {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
    CHALLENGING: 0,
  },
  generalStats: {
    added: 0,
    rated: 0,
    commented: 0,
  },
  challengesByLanguage: {
    python: 0,
    java: 0,
    csharp: 0,
    javascript: 0,
  },
};

const Profile: React.FC = () => {
  const [profileData, setProfileData] = React.useState<IProfile>(defaultProfileData);

  useEffect(() => {
    axios.get('http://localhost:8080/api/profile/getByToken')
      .then((response) => {
        console.log(response);
        setProfileData(response.data);
      });
  }, []);

  return (
    <div className="profile-container">
      <ImageArea caption={`hi, ${profileData.username}!`} image={profile} />
      <FunctionalArea {...profileData} />
    </div>
  );
};

export default Profile;
