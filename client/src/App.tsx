import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import { StyledEngineProvider } from '@mui/material/styles';
import { Header } from './components/common';
import { Login, Register, NotFound } from './views';

const App: React.FC = () => (
  <StyledEngineProvider injectFirst>
    <Router>
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/404" component={NotFound} />
      </Switch>
    </Router>
  </StyledEngineProvider>
);

export default App;
