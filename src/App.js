import React from 'react';
import { Provider } from './context';
import Route from 'react-router-dom/Route';
import { NoSsr } from '@material-ui/core';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    window.addEventListener("popstate", function () {
      console.log("CAT")
      window.location.reload();
    });
  }

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
