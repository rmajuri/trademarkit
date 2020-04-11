import React from 'react';
import Route, { useEffect } from 'react-router-dom/Route';
import { NoSsr } from '@material-ui/core';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import './App.css';

const App = () => {

  useEffect(() => {
    window.onpopstate = () => window.location.reload();
  });

  return (
    <NoSsr>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </NoSsr>
  );
}

export default App;
