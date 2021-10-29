/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import { RegisterSpecificVariables, LoginSpecificVariables } from '../../utils';
import TextWithHeader from '../common/TextWithHeader';

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

const InputArea: React.FC<Props> = ({ purpose, children }) => {
  const usedVariables = purpose === 'register' ? RegisterSpecificVariables : LoginSpecificVariables;
  const {
    welcome, description, link, columnHeight,
  } = usedVariables;

  return (
    <StyledInputArea columnHeight={columnHeight}>
      <div className="outer-layer">
        <TextWithHeader
          welcome={welcome}
          header="COdeRithM"
          description={description}
          link={link}
          columnHeight={columnHeight}
        />
      </div>
      <div className="outer-layer">
        <div className="second-column">
          <form className="form">
            {children}
          </form>
        </div>
      </div>
    </StyledInputArea>
  );
};

export default InputArea;
