import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import { StyledEngineProvider } from '@mui/material/styles';
import Login from './views/Login';
import { Header } from './components/common';

const App: React.FC = () => (
  <StyledEngineProvider injectFirst>
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  </StyledEngineProvider>
);

export default App;
