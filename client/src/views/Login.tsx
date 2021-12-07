/* eslint-disable import/no-extraneous-dependencies */
import {
  Checkbox, FormControlLabel, TextField,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import { ImageArea, InputArea } from '../components/authentication';
import '../assets/styles/Login.scss';
import signIn from '../assets/images/login.svg';
import { CommonButton } from '../components/common';

type Props = {
  setToken: Dispatch<SetStateAction<string | undefined>>,
}

const Login: React.FC<Props> = ({ setToken }) => {
  const [credentials, setCredentials] = useState({
    login: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    sendForm();
  };

  const sendForm = () => {
    axios.post('http://localhost:8080/api/auth/login', credentials)
      .then(() => {
        setToken(Cookies.get('token'));
        console.log(Cookies.get('token'));
        history.push('/');
      });
  };

  return (
    <div className="login-container">
      <InputArea purpose="login">
        <TextField id="login" label="Login" type="text" variant="outlined" onChange={handleChange} required value={credentials.login} />
        <TextField id="password" label="Password" type="password" variant="outlined" onChange={handleChange} required />
        <FormControlLabel
          control={(
            <Checkbox
              id="rememberMe"
              className="terms-checkbox"
              required
            />
            )}
          label="Remember me"
          labelPlacement="start"
        />
        <CommonButton text="Sign in" type="submit" onClick={handleSubmitClick} />
      </InputArea>
      <ImageArea caption="Sign In" image={signIn} />
    </div>
  );
};

export default Login;
