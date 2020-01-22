import React, { useState } from 'react';
import './Home.css';
import Search from './search/search'
import ResultsTable from './results-table/results-table'
import Placeholder from './placeholder/placeholder';

const Home = () => {
  const [trademarks, setTrademarks] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [areResultsEmpty, setAreResultsEmpty] = useState(false);

  const handleSearchSubmit = event => {
    event.preventDefault()
    fetch(`/trademark/${encodeURI(searchPhrase)}/`)
      .then((res) => res.json())
      .then((searchResults) => {

        if (searchResults.trademarks) {

          //If the results are empty, we want this information in state,
          //so tht we can show the user a helpful message.
          if (typeof searchResults.trademarks === 'string' && searchResults.trademarks === 'noresults') {
            setAreResultsEmpty(true);
            setTrademarks([]);
            setResultsCount(0);
          }

          //A response with no results yields a string in the trademarks field that says "no results".
          //Therefore, instead of merely checking for null, it's safe to also check if the value is also an array.
          if (Array.isArray(searchResults.trademarks)) {
            console.log(searchResults.trademarks)
            setTrademarks(searchResults.trademarks);
            //Even though the response data contains a "counts" property, the array of trademark data
            //more likely to be correct, since it is calculated
            setResultsCount(searchResults.trademarks.length);
            setAreResultsEmpty(false);
          }
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
        {trademarks.length ? (
          <ResultsTable trademarks={trademarks} />
          ) : (<Placeholder areResultsEmpty={areResultsEmpty} />)
        }
    </div>
  );
};

export default Home;
