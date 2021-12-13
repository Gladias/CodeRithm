/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, MenuItem, TextField } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import CodeIcon from '@mui/icons-material/Code';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AddIcon from '@mui/icons-material/Add';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import CommentIcon from '@mui/icons-material/Comment';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { CommonButton } from '../common';
import cpp from '../../assets/images/thumbnails/cpp.png';
import java from '../../assets/images/thumbnails/java.png';
import python from '../../assets/images/thumbnails/python.png';
import algorithms from '../../assets/images/thumbnails/algorithms.png';
import PythonNotes from '../../assets/pdfs/PythonNotes.pdf';

const StyledStudySection = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    background-color: #252728;
    border: 1px solid black;
    border-radius: 0.5rem;

    font-family: 'Meedori BO';
    color: #EDEFEC;

    .title {
      font-size: 2rem;
    }

    .body {
      height: 85%;
      width: 100%;
      display: flex;

      .documents {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
          height: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .thumbnails {
          max-height: 80%;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }

        .thumbnails > img {
          margin-top: 1rem;
          max-width: 35%;
          max-height: 45%;
          border: 1px solid black;
          border-radius: 1rem;

          &:hover {
            filter: brightness(50%);
            cursor: pointer;
          }
        }
      }

      .pdf {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .page-number {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 20%;
        }

        .document {
          display: flex;
          align-items: center;

          .react-pdf__Page__annotations {
            display: none;
          }
        }
      }
    }
`;

const StudySection: React.FC = () => {
  const [document, setDocument] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const changePageNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPageNumber(parseInt(value, 10));
  };

  const changeDocument = (selected: string) => {
    switch (selected) {
      case 'algorithms':
        setDocument(PythonNotes);
        break;
      default:
        console.log('error');
    }
  };

  return (
    <StyledStudySection>
      <div className="title">
        Study section
      </div>
      <div className="body">
        <div className="documents section">
          <div className="title">
            Available documents
          </div>
          <div className="thumbnails">
            <img onClick={() => changeDocument('algorithms')} src={algorithms} alt="Algorithms" />
            <img src={python} alt="Python" />
            <img src={cpp} alt="C++" />
            <img src={java} alt="Java" />
          </div>
        </div>
        <div className="pdf section">
          <div className="title page-number">
            Page number
            <TextField value={pageNumber} onChange={changePageNumber} id="pageNumberInput" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" variant="outlined" />
          </div>
          <Document className="document" file={document}>
            <Page height={600} scale={1.5} pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    </StyledStudySection>
  );
};

export default StudySection;
