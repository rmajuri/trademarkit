import React from 'react';
import { Provider } from './context';
import Route from 'react-router-dom/Route';
import { NoSsr } from '@material-ui/core';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import './App.css';

// window.addEventListener( "popstate", function () {
//     console.log(window.location);
// });

class App extends React.Component {

  render() {
    return (
      <NoSsr>
        <Switch>
          <Route exact path="/" render={() => <Provider><Home /></Provider>} />
        </Switch>
      </NoSsr>
    );
  }
}

export default App;
