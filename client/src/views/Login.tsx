import React from 'react';
import { ImageArea, InputArea } from '../components/authentication';
import '../assets/styles/Login.scss';
import signIn from '../assets/images/sign_in.svg';

const Login: React.FC = () => (
  <div className="container">
    <InputArea purpose="login" />
    <ImageArea caption="Sign In" image={signIn} />
  </div>
);

export default Login;
