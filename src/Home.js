import React from 'react';
import './Home.css';
import Search from './search/search'

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <h1>trademarkit</h1>
        </header>
        <Search />
      </div>
    );
  }
}

export default Home;
