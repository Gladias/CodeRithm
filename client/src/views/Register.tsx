import React from 'react';
import { ImageArea, InputArea } from '../components/authentication';
import '../assets/styles/Register.scss';
import profile from '../assets/images/profile.svg';

const Register: React.FC = () => (
  <div className="container">
    <ImageArea caption="Account Creation" image={profile} />
    <InputArea purpose="register" />
  </div>
);

export default Register;
