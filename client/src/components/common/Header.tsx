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
  width: 100%;

  font-family: 'Meedori BO';
  border-bottom: 2px solid black;

  .logo {
    display: flex;
    justify-content: center;
    width: 20%;

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
      width: 50%;
      height: 50%;
      overflow: hidden;
  }
  .auth-buttons {
      display: flex;
      justify-content: flex-end;
      width: 20%;
      height: 50%;

      & > button {
        margin-right: 2rem;
      }
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
        {
          token
            && <CommonButton backgroundcolor="#FFC53A" text="Add challenge" onClick={() => redirect('/addChallenge')} />
        }
        <CommonButton text="Browse Challenges" onClick={() => redirect('/browseChallenges')} />
        <CommonButton text="Ranking" onClick={() => redirect('/ranking')} />
        <CommonButton text="Study" onClick={() => redirect('/study')} />
      </div>
      <div className="auth-buttons">
        {
          token
            ? (
              <>
                <CommonButton text="Profile" onClick={() => redirect('/profile')} />
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
