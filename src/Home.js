import React, { useState } from 'react';
import './Home.css';
import Search from './search/search'
import ResultsTable from './results-table/results-table'

const Home = () => {

  return (
    <div className="Home">
      <header className="Home-header">
        <h1>trademarkit</h1>
      </header>
      <Search />
      <ResultsTable trademarks={trademarks} />
    </div>
  );
};

export default Home;
