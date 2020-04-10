import React, { useState } from 'react';
import Route from 'react-router-dom/Route';
import { NoSsr } from '@material-ui/core';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import './App.css';



const App = () => {
  const [cachedPath, setCachedPath] = useState('');

  window.addEventListener('popstate', function() {

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
