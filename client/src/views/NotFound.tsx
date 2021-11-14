/* eslint-disable no-unused-vars */
import React from 'react';
import '../assets/styles/NotFound.scss';
import { TextField } from '@mui/material';
import notFound from '../assets/images/not_found.svg';
import TextWithHeader from '../components/common/TextWithHeader';
import { NotFoundSpecificVariables } from '../utils';

const NotFound: React.FC = () => {
  const {
    header, description, link, columnHeight,
  } = NotFoundSpecificVariables;

  return (
    <div className="notfound-container">
      <div className="column">
        <TextWithHeader
          header={header}
          description={description}
          link={link}
          columnHeight={columnHeight}
        />
      </div>
      <div className="column">
        <img src={notFound} alt="Page not found icon" />
      </div>
    </div>
  );
};

export default NotFound;
