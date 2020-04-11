import React, { useEffect } from 'react';
import Route from 'react-router-dom/Route';
import { NoSsr } from '@material-ui/core';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import './App.css';

const App = () => {

  useEffect(() => {
    window.addEventListener('popstate', function () {
      window.location.reload();
    });
  })

  return (
    <NoSsr>
      <Switch>
        <Route
        exact
        path="/" render={() => <Home />} />
      </Switch>
    </NoSsr>
  );
}

export default App;
