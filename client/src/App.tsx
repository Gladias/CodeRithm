/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.scss';
import { StyledEngineProvider } from '@mui/material/styles';
import { Header } from './components/common';
import {
  BrowseChallenges, Challenge, Login, Register, NotFound, Profile, Ranking, Study,
} from './views';
import AddChallenge from './views/AddChallenge';

const App: React.FC = () => {
  const [token, setToken] = useState(Cookies.get('token'));

  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <Header token={token} setToken={setToken} />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/browseChallenges" component={BrowseChallenges} />
          <Route path="/addChallenge" component={AddChallenge} />
          <Route path="/challenge/:id" render={({ match }) => <Challenge id={match.params.id} />} />
          <Route path="/profile" component={Profile} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/study" component={Study} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </StyledEngineProvider>
  );
};

export default App;
