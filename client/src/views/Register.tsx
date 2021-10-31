/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Checkbox, FormControlLabel, TextField,
} from '@mui/material';
import * as yup from 'yup';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { ImageArea, InputArea } from '../components/authentication';
import '../assets/styles/Register.scss';
import profile from '../assets/images/profile.svg';
import { CommonButton } from '../components/common';

const RegistarionValidationSchema = yup.object().shape({
  login: yup.string()
    .required('Login is required')
    .min(6, 'Login must be at least 6 characters')
    .max(20, 'Login must not exceed 20 characters'),
  email: yup.string()
    .required('E-mail is required')
    .email('E-mail is invalid'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  passwordConfirm: yup.string()
    .required('Password confirm is required')
    .oneOf([yup.ref('password'), null], 'Passwords does not match'),
  acceptTerms: yup.bool().oneOf([true], 'You must accept terms of service'),
});

interface IValidationErrors {
  [key: string]: string[];
  login: string[],
  password: string[],
  passwordConfirm: string[],
  email: string[],
  acceptTerms: string[],
}

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState({
    login: '',
    password: '',
    passwordConfirm: '',
    email: '',
    acceptTerms: false,
  });

  const [validationErrors, setValidationErrors] = useState<IValidationErrors>({
    login: [],
    password: [],
    passwordConfirm: [],
    email: [],
    acceptTerms: [],
  });

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setValidationErrors((prevState) => ({
      ...prevState,
      [id]: [],
    }));

    updateCredentials(id, value);
  };

  const updateCredentials = (id: any, value: any) => {
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    ifFormValidThenSend();
  };

  const ifFormValidThenSend = () => {
    RegistarionValidationSchema.validate({
      login: credentials.login,
      email: credentials.email,
      password: credentials.password,
      passwordConfirm: credentials.passwordConfirm,
      acceptTerms: credentials.acceptTerms,
    }, { abortEarly: false })
      .then(() => sendForm())
      .catch((e) => {
        console.log({ e });
        handleValidationErrors(e);
      });
  };

  const sendForm = () => {
    axios.post('http://127.0.0.1:3000/api/auth/register', credentials)
      .then(() => {
        history.push('/');
      });
  };

  const handleValidationErrors = (e: yup.ValidationError) => {
    e.inner.forEach((error) => {
      if (!validationErrors[error.path!].includes(error.message)) {
        setValidationErrors((prevState) => ({
          ...prevState,
          [error.path!]: [...prevState[error.path!], error.message],
        }));
      }
    });
  };

  return (
    <div className="container">
      <ImageArea caption="Account Creation" image={profile} />
      <InputArea purpose="register">
        <TextField id="login" label="Login" type="text" variant="outlined" onChange={handleChange} required value={credentials.login} error={validationErrors.login.length > 0} helperText={validationErrors.login.join('. ')} />
        <TextField id="email" label="E-mail" type="text" variant="outlined" onChange={handleChange} required error={validationErrors.email.length > 0} helperText={validationErrors.email.join('. ')} />
        <TextField id="password" label="Password" type="password" variant="outlined" onChange={handleChange} required error={validationErrors.password.length > 0} helperText={validationErrors.password.join('. ')} />
        <TextField id="passwordConfirm" label="Confirm password" type="password" variant="outlined" onChange={handleChange} required error={validationErrors.passwordConfirm.length > 0} helperText={validationErrors.passwordConfirm.join('. ')} />
        <FormControlLabel
          control={(
            <Checkbox
              id="acceptTerms"
              className="terms-checkbox"
              onClick={() => updateCredentials('acceptTerms', !credentials.acceptTerms)}
              required
            />
            )}
          label="I agree to the terms of service"
          labelPlacement="start"
        />
        <CommonButton text="Sign up" type="submit" onClick={handleSubmitClick} />
      </InputArea>
    </div>
  );
};

export default Register;
