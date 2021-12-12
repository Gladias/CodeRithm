/* eslint-disable no-unused-vars */
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

const StyledRankingFilters = styled.div`
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
      width: 100%;
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
      display: flex;
      justify-content: space-around;

      .row {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .caption {
          width: 30%;
          display: flex;
          justify-content: flex-end;
        }

        .MuiSelect-select {
          padding: 0.5rem 2rem 0.5rem 0.5rem;
        }

        .search, .dropdown {
          display: flex;
          align-items: center;
          height: 70%;
        }
        
        .search {
          width: 30%;
        }
        
        .dropdown {
          margin-left: 3rem;
          width: 20%;
        }
      }
    }
`;

const RankingFilters: React.FC = () => {
  const [sortOption, setSortOption] = React.useState<string>('Most solutions');

  const sortOptions = [
    {
      value: 'Most solutions',
    },
    {
      value: 'Most challenges added',
    },
    {
      value: 'Most comments',
    },
  ];

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <StyledRankingFilters>
      <div className="header">
        <span>
          Ranking
        </span>
      </div>
      <div className="body">
        <div className="row">
          <div className="search">
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
        </div>

      </div>
    </StyledRankingFilters>
  );
};

export default RankingFilters;
