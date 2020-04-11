import React, { useState, useEffect } from 'react';
import Route from 'react-router-dom/Route';
import { NoSsr } from '@material-ui/core';
import queryString from 'query-string';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import './App.css';

const App = () => {
  const [popEventListenerAdded, setPopEventListenerAdded] = useState(false);
  const [cachedSearchPhrase, setCachedSearchPhrase] = useState('');
  const [trademarks, setTrademarks] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [areResultsEmpty, setAreResultsEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadCachedSearchResults = () => {

      console.log(cachedSearchPhrase)
      console.log('RESULT IN LOAD FUNCTION', window.localStorage[cachedSearchPhrase])
      const results = window.localStorage[cachedSearchPhrase]
      if (typeof results === 'string' && results === 'noresults') {
        setAreResultsEmpty(true);
        console.log("YOUR RESULTS IS A STRING")
        setTrademarks([]);
      }

      if (Array.isArray(results)) {
        setTrademarks(results);
        console.log("YOUR RESULTS IS NOT A STRING:", results)
        setResultsCount(results.length);
        setAreResultsEmpty(false);
      }
};

  useEffect(() => {
    window.addEventListener('popstate', function () {
      setCachedSearchPhrase('');
      console.log('CURRENT SEARCH PHRASE', queryString.parse(window.location.search).searchphrase)

        if (!popEventListenerAdded && window.localStorage.hasOwnProperty(queryString.parse(window.location.search).searchphrase)) {
          console.log('CACHED RESULTS', window.localStorage[queryString.parse(window.location.search).searchphrase]);
          const parsedPhrase = queryString.parse(window.location.search).searchphrase;
          setCachedSearchPhrase(parsedPhrase);
          setSearchPhrase(parsedPhrase);
          loadCachedSearchResults();
          setPopEventListenerAdded(true);

        }
    });
  }, [])

  return (
    <NoSsr>
      <Switch>
        <Route
        exact
        path="/" render={() => {
        return (
        <Home
        {...{
          cachedSearchPhrase,
          trademarks,
          setTrademarks,
          searchPhrase,
          setSearchPhrase,
          resultsCount,
          setResultsCount,
          areResultsEmpty,
          setAreResultsEmpty,
          isLoadingState,
          setIsLoadingState,
          page,
          setPage,
          isError,
          setIsError
        }}
        />
        )
        }} />
      </Switch>
    </NoSsr>
  );
}

export default App;
