import React from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {

};

const StyledFilterSection = styled.div`
    background-color: #252728;
    color: #EDEFEC;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 20%;
    width: 100%;

    .header {
        height: 20%;
        font-size: 2.6rem;
        font-family: 'Meedori BO';
        display: flex;
        align-items: flex-end;
    }

    .caption {
      font-size: 1.4rem;
      color: #EDEFEC;
      margin-right: 0.4rem;
    }

    .MuiOutlinedInput-root {
      background-color: #C2CFB2;
      border-radius: 0.5rem;
      color: black;
      
    }

    .MuiInputAdornment-root {
      color: black;
    }

    .MuiFormControl-root {
      width: 100%;
      font-family: 'Meedori BO';
    }

    .MuiSelect-select {
      font-family: 'Meedori BO';
    }

    .MuiSelect-select {
      text-align: center;
    }

    .MuiOutlinedInput-input {
      border-color: #6AA31C;
      font-size: 1.1rem;
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #6AA31C;
    }

    .body {
        height: 80%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .inputs {
          display: flex;
          flex-direction: column;
          height: 50%;
          width: 25%;
          justify-content: space-between;

          .row {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .caption {
              width: 30%;
              display: flex;
              justify-content: flex-end;
            }

            .MuiOutlinedInput-root {
              width: 100%;
            }

            .MuiSelect-select {
              padding: 0.5rem 2rem 0.5rem 0.5rem;
            }

            .MuiBox-root {
              &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                border-radius: 0.2rem;
                background-color: #C2CFB2;
              }

              &::-webkit-scrollbar {
                height: 0.6rem;
                background-color: #C2CFB2;
              }

              &::-webkit-scrollbar-thumb {
                border-radius: 0.2rem;
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                background-color: #D1CAA1;
              }
            }

            .MuiChip-root {
              background-color: #6AA31C;
              border-radius: 0.5rem;
              font-size: 1rem;
              font-family: 'Meedori BO';
            }
          }
        }

        .difficulty {
          display: flex;
          align-items: center;
          height: 70%;

          .difficulty-column {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-around;
            
            button {
              color: black;
              border: 1px solid black;
              font-family: 'Meedori BO';
              font-size: 1.1rem;
              text-transform: none;
            }
            
            #easy {
              background-color: #6AA31C;
            }

            #medium {
              background-color: #FFC53A;
            }

            #hard {
              background-color: #CA3C25;
            }

            #challenging {
              background-color: #985F99;
            }

            .bright {
              filter: brightness(100%);
            }

            .darken {
              filter: brightness(50%);
            }
          }
        }

        .dropdown {
          display: flex;
          align-items: center;
          height: 70%;
          width: 15%;
        }

        .settings {
          display: flex;
          align-items: center;

          .settings-column {
            display: flex;
            flex-direction: column;

            .settings-checkbox {
              color: #6AA31C;
            }
          }
        }
    }
`;

type ITagsOptions = {
  [key: string]: boolean,
  easy: boolean,
  medium: boolean,
  hard: boolean,
  challenging: boolean,
}

const FilterSection: React.FC<Props> = () => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [language, setLanguage] = React.useState<string>('Any');
  const [sortOption, setSortOption] = React.useState<string>('Most solutions');
  const [difficulties, setDifficulties] = React.useState<ITagsOptions>({
    easy: true,
    medium: true,
    hard: true,
    challenging: true,
  });

  const languages = [
    {
      value: 'Any',
    },
    {
      value: 'Python',
    },
    {
      value: 'C++',
    },
    {
      value: 'Java',
    },
  ];

  const sortOptions = [
    {
      value: 'Most solutions',
    },
    {
      value: 'Least solutions',
    },
    {
      value: 'Rating',
    },
    {
      value: 'Most commented',
    },
  ];

  const availableTags = [
    'Sorting',
    'Lists',
    'Algorithm',
    'Threads',
  ];

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDifficultyChange = (selectedDifficulty: 'easy' | 'medium' | 'hard' | 'challenging') => {
    setDifficulties((prevState) => ({
      ...prevState,
      [selectedDifficulty]: !difficulties[selectedDifficulty],
    }));
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <StyledFilterSection>
      <div className="header">
        <span>
          Filters
        </span>
      </div>
      <div className="body">
        <div className="inputs">
          <div className="row">
            <div className="caption">
              <span>
                Search
              </span>
            </div>
            <OutlinedInput
              id="search"
              type="text"
              size="small"
              startAdornment={(
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
          )}
            />
          </div>
          <div className="row">
            <span className="caption">
              Tags
            </span>
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
        </div>
        <div className="difficulty">
          <span className="caption">
            Difficulty
          </span>
          <div className="difficulty-column">
            <Button className={difficulties.easy ? 'bright' : 'darken'} id="easy" variant="contained" type="button" onClick={() => handleDifficultyChange('easy')}>
              easy
            </Button>
            <Button className={difficulties.medium ? 'bright' : 'darken'} id="medium" variant="contained" type="button" onClick={() => handleDifficultyChange('medium')}>
              medium
            </Button>
            <Button className={difficulties.hard ? 'bright' : 'darken'} id="hard" variant="contained" type="button" onClick={() => handleDifficultyChange('hard')}>
              hard
            </Button>
            <Button className={difficulties.challenging ? 'bright' : 'darken'} id="challenging" variant="contained" type="button" onClick={() => handleDifficultyChange('challenging')}>
              challenging
            </Button>
          </div>
        </div>
        <div className="dropdown">
          <span className="caption">
            Language
          </span>
          <TextField
            id="language"
            value={language}
            onChange={handleLanguageChange}
            size="small"
            select
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="dropdown">
          <span className="caption">
            Sort
          </span>
          <TextField
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            size="small"
            select
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="settings">
          <span className="caption">
            Additional Settings
          </span>
          <div className="settings-column">
            <FormControlLabel
              control={(
                <Checkbox
                  id="hide-completed"
                  className="settings-checkbox"
                />
            )}
              label="Hide completed"
              labelPlacement="end"
            />
          </div>
        </div>
      </div>
    </StyledFilterSection>
  );
};

export default FilterSection;
