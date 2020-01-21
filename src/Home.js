import React, { useState } from 'react';
import './Home.css';
import Search from './search/search'
import ResultsTable from './results-table/results-table'

const Home = () => {
  const [trademarks, setTrademarks] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  return (
    <div className="Home">
      <header className="Home-header">
        <h1>trademarkit</h1>
      </header>
      <Search searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}  />
      <ResultsTable trademarks={trademarks} />
    </div>
  );
};

export default Home;
