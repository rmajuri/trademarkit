import React, { useState } from 'react';
import './Home.css';
import Search from './search/search'
import ResultsTable from './results-table/results-table'

const Home = () => {
  const [trademarks, setTrademarks] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearchSubmit = event => {
    event.preventDefault()
    fetch(`/trademark/${encodeURI(searchPhrase)}/`)
      .then((res) => res.json())
      .then((searchResults) => {
        //A response with no results yields a string in the trademarks field that says "no results".
        //Therefore, instead of merely checking for null, it's safe to also check if the value is also an array.
        if (searchResults.trademarks && Array.isArray(searchResults.trademarks)) {
          console.log(searchResults.trademarks)
          setTrademarks(searchResults.trademarks)
        }
        if (searchResults.count > 0) {
          setResultsCount(searchResults.count)
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <h1>trademarket</h1>
      </header>
      <Search
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        handleSearchSubmit={handleSearchSubmit} />
        { resultsCount ? (
          <h4>{resultsCount}{' '}results</h4>
        ) : null}
      <ResultsTable trademarks={trademarks} />
    </div>
  );
};

export default Home;
