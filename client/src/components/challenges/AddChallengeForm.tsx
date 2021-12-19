/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import styled from 'styled-components';
import {
  Box, Button, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { EditorChangeEvent } from 'react-codemirror2';
import { useHistory } from 'react-router';
import axios from 'axios';
import { CommonButton } from '../common';
import {
  IAddChallengeInputs, IChallenge, IDataSet, ILanguage, IMultipleSelectOption,
} from '../types/types';

type Props = {
    availableLanguages: ILanguage[],
    availableTags: string[],
}

const StyledAddChallengeForm = styled.div`
    height: 80%;
    width: 60%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;


    color: #EDEDED;
    background-color: #35373B;
    border: 1px solid black;
    border-radius: 0.5rem;

    font-family: 'Meeralnimai RE';
    font-size: 1.4rem;

    .MuiOutlinedInput-root, .MuiChip-root {
      color: #EDEDED;
      border: 1px solid black;
    } 

    .row {
        display: flex;
        justify-content: flex-start;
        width: 90%;

        .caption {
            width: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .inputField, .shortInputField {
          background-color: #252728;

          input {
            color: #EDEDED;
          }
        }

        .inputField {
          width: 50%;
        }
    }

    .tests {
      width: 60%;
      display: flex;
      flex-direction: column;
      font-size: 1.4rem;

      .caption {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .tests-row {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .input, .output {
          display: flex;
          justify-content: center;
          width: 50%;
        }
      }

      .addDiv {
        display: flex;
        width: 100%;
        justify-content: center;

        #addTestButton {
          background-color: #6AA31C;
          border: 1px solid black;
          color: black;
          font-size: 1rem;
          width: 25%;

          &:hover {
            filter: brightness(70%);
          }
        }
      }
    }
`;

const defaultInputs = () => ({
  title: '',
  description: '',
  difficultyLevel: 'EASY',
  linesLimit: 120,
  executionTimeLimitInSeconds: 3,
  languages: [],
  tags: [],
});

const AddChallengeForm: React.FC<Props> = ({ availableLanguages, availableTags }) => {
  const [inputs, setInputs] = React.useState<IAddChallengeInputs>(defaultInputs);
  const [dataSets, setDataSets] = React.useState<IDataSet[]>([]);
  const [formNotFilled, setFormNotFilled] = React.useState(true);

  const inputHandler = (inputName:string, inputType: string, e: any) => {
    console.log(inputs);
    if (inputType === 'text') {
      textInputHandler(inputName, e);
    } else if (inputType === 'chip') {
      chipInputHandler(inputName, e);
    } else if (inputType === 'select') {
      selectInputHandler(inputName, e);
    }
  };

  const textInputHandler = (inputName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateInputs(inputName, value);
  };

  const selectInputHandler = (inputName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    updateInputs(inputName, value);
  };

  const chipInputHandler = (inputName: string, e: SelectChangeEvent<string[]>) => {
    const { target: { value } } = e;
    updateInputs(inputName, value);
  };

  const updateInputs = (inputName: string, value: string | string[]) => {
    setInputs((prevState) => ({
      ...prevState,
      [inputName]: value,
    }));
  };

  const addDataSet = () => {
    const emptyDataSet:IDataSet = {
      input: '',
      output: '',
    };

    setDataSets([...dataSets, emptyDataSet]);
  };

  const updateDataSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputId = e.target.id;

    const dataSetId = parseInt(inputId.substring(0, inputId.indexOf('-')), 10);
    const dataSetType = inputId.substring(inputId.lastIndexOf('-') + 1, inputId.length);

    const dataSetsCopy = [...dataSets];
    const selectedDataSet = dataSets[dataSetId];
    selectedDataSet[dataSetType] = value;
    dataSetsCopy[dataSetId] = selectedDataSet;

    setDataSets([...dataSetsCopy]);
  };

  useEffect(() => {
    isFormFilled();
  }, [inputs, dataSets]);

  const isFormFilled = () => {
    if (inputs.title.length > 0
      && inputs.description.length > 0
      && inputs.languages.length > 0
      && inputs.tags.length > 0
      && dataSets.length > 0) {
      setFormNotFilled(false);
    } else {
      setFormNotFilled(true);
    }
  };

  const history = useHistory();

  const clearForm = () => {
    setInputs(defaultInputs);
    setDataSets([]);
  };

  const sendForm = () => {
    if (formNotFilled === false) {
      const request = {
        ...inputs,
        dataSets,
      };

      axios.post('http://localhost:8080/api/challenge/add', {
        ...request,
      })
        .then((response) => {
          history.push(`/challenge/${response.data.challengeId}`);
        });
    }
  };

  return (
    <>
      <StyledAddChallengeForm>
        <div className="row">
          <div className="caption">
            Title
          </div>
          <TextField value={inputs.title} onChange={(e) => inputHandler('title', 'text', e)} className="inputField" id="title" type="text" variant="outlined" required />
        </div>
        <div className="row">
          <div className="caption">
            Description
          </div>
          <TextField value={inputs.description} onChange={(e) => inputHandler('description', 'text', e)} className="inputField" id="description" type="text" variant="outlined" multiline rows={4} required />
        </div>
        <div className="row">
          <div className="caption">
            Difficulty
          </div>
          <TextField
            className="inputField"
            id="difficulty"
            size="small"
            value={inputs.difficultyLevel}
            onChange={(e) => inputHandler('difficultyLevel', 'select', e)}
            select
          >
            <MenuItem key="easy" value="EASY">
              Easy
            </MenuItem>
            <MenuItem key="medium" value="MEDIUM">
              Medium
            </MenuItem>
            <MenuItem key="hard" value="HARD">
              Hard
            </MenuItem>
            <MenuItem key="challenging" value="CHALLENGING">
              Challenging
            </MenuItem>
          </TextField>
        </div>
        <div className="row">
          <div className="caption">
            Available Languages
          </div>
          <Select
            className="inputField"
            id="languages-select"
            multiple
            value={inputs.languages}
            onChange={(e) => inputHandler('languages', 'chip', e)}
            input={<OutlinedInput id="languages-select-inner" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', overflow: 'auto', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {availableLanguages.map((language) => (
              <MenuItem
                key={language.name}
                value={language.name}
              >
                {language.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="row">
          <div className="caption">
            Tags
          </div>
          <Select
            className="inputField"
            id="tags-select"
            multiple
            value={inputs.tags}
            onChange={(e) => inputHandler('tags', 'chip', e)}
            input={<OutlinedInput id="tags-select-inner" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', overflow: 'auto', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {availableTags.map((tag) => (
              <MenuItem
                key={tag}
                value={tag}
              >
                {tag}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="row">
          <div className="caption">
            Code lines limit
          </div>
          <TextField className="shortInputField" value={inputs.linesLimit} onChange={(e) => inputHandler('linesLimit', 'text', e)} id="linesLimit" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" variant="outlined" required />
        </div>
        <div className="row">
          <div className="caption">
            Execution time limit[s]
          </div>
          <TextField className="shortInputField" value={inputs.executionTimeLimitInSeconds} onChange={(e) => inputHandler('executionTimeLimitInSeconds', 'text', e)} id="executionTimeLimitInSeconds" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" variant="outlined" required />
        </div>
        <div className="tests">
          <div className="caption">
            Test data sets
          </div>
          <div className="tests-row">
            <div className="input">
              Input
            </div>
            <div className="output">
              Output
            </div>
          </div>
          {dataSets.map((dataSet, index) => (
            <div className="tests-row" key={index}>
              <div className="input">
                <TextField id={`${index}-test-input`} value={dataSet.input} onChange={updateDataSet} type="text" variant="outlined" required />
              </div>
              <div className="output">
                <TextField id={`${index}-test-output`} value={dataSet.output} onChange={updateDataSet} type="text" variant="outlined" required />
              </div>
            </div>
          ))}
          <div className="addDiv">
            <Button id="addTestButton" onClick={addDataSet} variant="outlined" startIcon={<AddIcon />}>
              Add test
            </Button>
          </div>
        </div>
      </StyledAddChallengeForm>
      <div className="control-buttons">
        <Button id="cancel" variant="contained" type="button" onClick={clearForm}>
          Clear
        </Button>
        <Button disabled={formNotFilled} id="submit" variant="contained" type="button" onClick={sendForm}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddChallengeForm;
