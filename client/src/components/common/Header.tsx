/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { CommonButton } from '.';

type Props = {
  token: string | undefined,
  setToken: Dispatch<SetStateAction<string | undefined>>
}

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
      font-size: 3.2rem;

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

const Header: React.FC<Props> = ({ token, setToken }) => {
  const history = useHistory();

  const redirect = (page: string) => {
    history.push(page);
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(Cookies.get('token'));
    redirect('/login');
  };

  return (
    <StyledHeader>
      <div className="logo">
        <a href="/login">
          COdeRithM
        </a>
      </div>
      <div className="navigation-buttons">
        <CommonButton text="Browse Challenges" onClick={() => redirect('/browseChallenges')} />
        <CommonButton text="Ranking" onClick={() => redirect('/404')} />
      </div>
      <div className="auth-buttons">
        {
          token
            ? (
              <>
                <CommonButton text="Profile" onClick={() => redirect('/404')} />
                <CommonButton text="Log out" onClick={logout} />
              </>
            )
            : <CommonButton text="Sign in" onClick={() => redirect('/login')} />
        }
      </div>
    </StyledHeader>
  );
};

export default Header;
