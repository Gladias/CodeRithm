import {
  Checkbox, FormControlLabel, FormGroup, TextField,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { CommonButton } from '../common';
import { RegisterSpecificVariables, LoginSpecificVariables } from '../../utils';

type Props = {
  purpose: 'register' | 'login';
}

const StyledInputArea = styled.div<{ columnHeight: string }>`
  width: calc(100% / 3 * 2);
  background-color: #252728;
  display: flex;

  .outer-layer {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-family: 'Meeralnimai RE';
    color: #EDEFEC;

    .column {
      height: ${(props) => props.columnHeight || '40%'};
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .welcome {
        height: 10%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      .coderithm {
        height: 20%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        color: #6AA31C;
        font-size: 3.2rem;
        font-family: 'Meedori BO';
      }

      .description {
        height: 40%;
        line-height: 130%;
        border-bottom: 4px dotted #EDEFEC;
      }

      .redirection-link {
        height: 20%;
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        a {
            color: #EDEFEC;
        }
      }
    }

    .second-column {
      height: ${(props) => props.columnHeight || '40%'};
      width: 80%;
      display: flex;
      flex-direction: column;

      .form {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        
        .MuiInputLabel-root {
          color: #EDEFEC;
        }

        .MuiOutlinedInput-root {
          background-color: #35373B;
          border-radius: 4;
          color: #EDEFEC;
        }

        .MuiOutlinedInput-input {
          border-color: #6AA31C;
          font-size: 1.3rem;
        }

        .Mui-focused {
          border: 0;

          fieldset {
            border-color: #6AA31C;
          }
        }

        .terms-checkbox {
          color: #6AA31C;
        }
      }
    }
  }
`;

const InputArea: React.FC<Props> = ({ purpose }: Props) => {
  const usedVariables = purpose === 'register' ? RegisterSpecificVariables : LoginSpecificVariables;
  const {
    welcome, description, link, checkboxCaption, submitCaption,
  } = usedVariables;

  return (
    <StyledInputArea columnHeight={purpose === 'register' ? '40%' : '25%'}>
      <div className="outer-layer">
        <div className="column">
          <span className="welcome">
            {welcome}
          </span>
          <span className="coderithm">
            COdeRithM
          </span>
          <span className="description">
            {description}
          </span>
          <span className="redirection-link">
            <a href={purpose === 'register' ? '/login' : 'register'}>
              {link}
            </a>
          </span>
        </div>
      </div>
      <div className="outer-layer">
        <div className="second-column">
          <FormGroup className="form">
            <TextField id="login" label="Login" type="text" variant="outlined" required />
            <TextField id="password" label="Password" type="password" variant="outlined" required />
            {purpose === 'register'
              && <TextField id="confirmPassword" label="Confirm password" type="password" variant="outlined" required />}
            <FormControlLabel
              control={
                <Checkbox className="terms-checkbox" />
          }
              label={checkboxCaption}
              labelPlacement="start"
            />
            <CommonButton text={submitCaption} />
          </FormGroup>
        </div>
      </div>
    </StyledInputArea>
  );
};

export default InputArea;
