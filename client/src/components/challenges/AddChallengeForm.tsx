/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import styled from 'styled-components';
import {
  Box, Button, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { CommonButton } from '../common';
import { IChallenge, IMultipleSelectOption } from '../types/types';

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

    font-family: 'Meedori BO';

    color: #EDEDED;
    background-color: #35373B;
    border: 1px solid black;
    border-radius: 0.5rem;

    .row {
        font-family: 'Meeralnimai RE';
        font-size: 1.4rem;
        display: flex;
        justify-content: center;
        width: 90%;

        .caption {
            width: 20%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
`;

const AddChallengeForm: React.FC<Props> = ({ availableLanguages, availableTags }) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [languages, setLanguages] = React.useState<string[]>([]);

  const handleLanguagesChange = (event: SelectChangeEvent<typeof languages>) => {
    const {
      target: { value },
    } = event;
    setLanguages(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <StyledAddChallengeForm>
      <div className="row">
        <div className="caption">
          Title
        </div>
        <TextField id="title" type="text" variant="outlined" required />
      </div>
      <div className="row">
        <div className="caption">
          Description
        </div>
        <TextField id="description" type="text" variant="outlined" multiline rows={4} required />
      </div>
      <div className="row">
        <div className="caption">
          Difficulty
        </div>
        <TextField
          id="language"
          size="small"
          select
        >
          <MenuItem key="easy" value="easy">
            Easy
          </MenuItem>
          <MenuItem key="medium" value="medium">
            Medium
          </MenuItem>
          <MenuItem key="hard" value="hard">
            Hard
          </MenuItem>
          <MenuItem key="challenging" value="challenging">
            Challenging
          </MenuItem>
        </TextField>
      </div>
      <div className="row">
        <div className="caption">
          Available Languages
        </div>
        <Select
          id="languages-select"
          multiple
          value={languages}
          onChange={handleLanguagesChange}
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
          id="tags-select"
          multiple
          value={tags}
          onChange={handleTagsChange}
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
        <TextField id="title" type="text" variant="outlined" required />
      </div>
      <div className="row">
        <div className="caption">
          Execution time limit[s]
        </div>
        <TextField id="title" type="text" variant="outlined" required />
      </div>
      <div className="tests">
        <div className="caption">
          Test data sets
        </div>
        <div className="tests-row">
          <div className="">
            Input
          </div>
          <div className="">
            Output
          </div>
        </div>
      </div>
    </StyledAddChallengeForm>
  );
};

export default AddChallengeForm;
