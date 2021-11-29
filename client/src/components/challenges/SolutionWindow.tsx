/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import styled from 'styled-components';
import { MenuItem, TextField } from '@mui/material';
import { Controlled as CodeMirror } from 'react-codemirror2';
import AceEditor from 'react-ace';
import { CommonButton } from '../common';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/java';
import 'ace-builds/src-noconflict/ext-language_tools';
import { ISolutionRequest, ISolutionWindow } from '../types/types';

const StyledSolutionWindow = styled.div`
    width: 60%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #EDEDED;
    border: 1px solid black;
    border-radius: 0.5rem;

    font-family: 'Meedori BO';

    #aceEditor {
        width: 100% !important;
        height: 100% !important;
        font-size: 1.2rem !important;
    }

    .MuiOutlinedInput-root {
      background-color: #C2CFB2;
      border-radius: 0.5rem;
      color: black;
      font-family: 'Meedori BO';
      text-align: center;
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #6AA31C;
    }
    
    .nav {
      height: 10%;
      width: 95%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 2.6rem;
      }

      .controls {
        width: 40%;
        display: flex;
        justify-content: space-between;

        .caption {
          font-size: 1.2rem;
          margin-right: 0.2rem;
        }

        .dropdown {
          display: flex;
          align-items: center;
        }
      }
    }

    .solution {
      height: 88%;
      width: 95%;

      background-color: #35373B;
    }
`;

const SolutionWindow: React.FC<ISolutionWindow> = ({ handleSubmit, availableLanguages }) => {
  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (value: string, event?: any) => {
    setCode(value);
  };

  const javaSnippet = `
    public static void main (String[] args) {
      /* code */
    }
  `;

  const pythonSnippet = `
    def main():
      pass
  `;

  return (
    <StyledSolutionWindow>
      <div className="nav">
        <div className="title">
          Solution
        </div>
        <div className="controls">
          <div className="dropdown">
            <span className="caption">
              Language
            </span>
            <TextField
              id="language"
              value={language}
              size="small"
              select
              onChange={handleLanguageChange}
            >
              {availableLanguages.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <CommonButton text="Submit" type="submit" onClick={() => handleSubmit(language, code)} />
        </div>
      </div>
      <div className="solution">
        <AceEditor
          placeholder="Placeholder Text"
          mode={language}
          theme="monokai"
          name="aceEditor"
          showPrintMargin
          showGutter
          highlightActiveLine
          value={code}
          onChange={handleCodeChange}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </StyledSolutionWindow>
  );
};

export default SolutionWindow;
