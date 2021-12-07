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

const Profile: React.FC = () => {
  const a = 'a';

  return (
    <div className="register-container">
      <ImageArea caption="hi, gladias!" image={profile} />
      <FunctionalArea />
    </div>
  );
};

export default Profile;
