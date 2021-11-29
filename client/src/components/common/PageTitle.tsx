/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { CommonButton } from '.';

type Props = {
  text: string
}

const StyledPageTitle = styled.div`
    font-size: 2.6rem;
    font-family: 'Meedori BO';
    color: #EDEFEC;
`;

const PageTitle: React.FC<Props> = ({ text }) => {
  const a = 'a';

  return (
    <StyledPageTitle>
      <span>
        {text}
      </span>
    </StyledPageTitle>
  );
};

export default PageTitle;
