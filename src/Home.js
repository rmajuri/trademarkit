import React, { useState } from 'react';
import './Home.css';
import Search from './search/search'
import ResultsTable from './results-table/results-table'

const Home = () => {
  const [trademarks, setTrademarks] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearchSubmit = event => {
    event.preventDefault()
    fetch(`https://markerapi.com/api/v2/trademarks/trademark/${encodeURI(searchPhrase)}/status/all/start/1/username/merman/password/7xRdLjM2Bh`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <h1>trademarkit</h1>
      </header>
      <Search
      searchPhrase={searchPhrase}
      setSearchPhrase={setSearchPhrase}
      handleSearchSubmit={handleSearchSubmit} />
      <ResultsTable trademarks={trademarks} />
    </div>
  );
};

export default Home;
