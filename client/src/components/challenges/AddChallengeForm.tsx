/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React, { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';
import {
  Box, Button, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { EditorChangeEvent } from 'react-codemirror2';
import { CommonButton } from '../common';
import {
  IAddChallengeInputs, IChallenge, IDataSet, IMultipleSelectOption,
} from '../types/types';

type Props = {
    availableLanguages: string[],
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

const AddChallengeForm: React.FC<Props> = ({ availableLanguages, availableTags }) => {
  const [inputs, setInputs] = React.useState<IAddChallengeInputs>({
    title: '',
    description: '',
    difficultyLevel: 'EASY',
    codeLineLimit: 120,
    executionTimeLimit: 3,
    languages: [],
    tags: [],
  });
  const [dataSets, setDataSets] = React.useState<IDataSet[]>([]);

  const inputHandler = (inputName:string, inputType: string, e: any) => {
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
    console.log({ dataSets });
  };
  /*
  const updateDataSet = (index: number, type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dataSets.find(dataset => dataset.{type} === value)
    setDataSets((prevState) => ({
      ...prevState,
      [inputName]: value,
    }));

    console.log(dataSets);
  };
*/
  return (
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
                <Chip id="shuja" key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {availableLanguages.map((language) => (
            <MenuItem
              key={language}
              value={language}
            >
              {language}
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
            <Box id="chuj" sx={{ display: 'flex', overflow: 'auto', gap: 0.5 }}>
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
              id="kurwiszcze"
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
        <TextField className="shortInputField" value={inputs.codeLineLimit} onChange={(e) => inputHandler('codeLineLimit', 'text', e)} id="codeLineLimit" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" variant="outlined" required />
      </div>
      <div className="row">
        <div className="caption">
          Execution time limit[s]
        </div>
        <TextField className="shortInputField" value={inputs.executionTimeLimit} onChange={(e) => inputHandler('executionTimeLimit', 'text', e)} id="executionTimeLimit" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" variant="outlined" required />
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
  );
};

export default AddChallengeForm;
