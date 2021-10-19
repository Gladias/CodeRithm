import React from 'react';
import styled from 'styled-components';
import { CommonButton } from '.';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8%;
  margin: 0 1rem;

  font-family: 'Meedori BO';
  border-bottom: 2px solid black;

  .logo {
    display: flex;
    justify-content: center;
    width: 30%;

    a {
      padding-top: 1rem;
      text-decoration: none;
      color: #6AA31C;

      span {
        font-size: 3.2rem;
      }

      &:hover {
        color: #517C15;
      }
    }
  }
  .navigation-buttons {
      display: flex;
      justify-content: space-around;
      width: 35%;
  }
  .auth-buttons {
      display: flex;
      justify-content: flex-end;
      width: 35%;
    }
`;

const Header: React.FC = () => (
  <StyledHeader>
    <div className="logo">
      <a href="/login">
        <span>COdeRithM</span>
      </a>
    </div>
    <div className="navigation-buttons">
      <CommonButton text="Browse Challenges" />
      <CommonButton text="Ranking" />
    </div>
    <div className="auth-buttons">
      <CommonButton text="Sign in" />
    </div>
  </StyledHeader>
);

export default Header;
