import React, { useState, useEffect, useContext } from 'react';
import { Context } from './context';
import { CircularProgress } from '@material-ui/core'
import './Home.css';
import Search from './search/search';
import ResultsTable from './results-table/results-table';
import Placeholder from './placeholder/placeholder';
import Layout from './layout/layout';
import queryString from 'query-string';
import { createBrowserHistory } from 'history';
import ShareInput from './share-input/share-input';

const Home = () => {
  
  const [trademarks, setTrademarks] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [areResultsEmpty, setAreResultsEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isError, setIsError] = useState(false);

  const history = createBrowserHistory({forceRefresh: true});

  const fetchSearchResults = parsedQuery => {
    fetch(`/trademark/${encodeURI(parsedQuery.searchphrase)}/`)
    .then((res) => {
      setResultsCount(0);
      setPage(0);
      setTrademarks([]);
      setIsLoadingState(true);
      setIsError(false);
      return res.json();
    })
    .then((searchResults) => {

      if (searchResults.trademarks) {

        //If the results are empty, we want this information in state,
        //so that we can show the user a helpful message.
        if (typeof searchResults.trademarks === 'string' && searchResults.trademarks === 'noresults') {
          setAreResultsEmpty(true);
          setTrademarks([]);
        }

        //A response with no results yields a string in the trademarks field that says "no results".
        //Therefore, instead of merely checking for null, it's safe to also check if the value is also an array.
        if (Array.isArray(searchResults.trademarks)) {
          setTrademarks(searchResults.trademarks);
          //Even though the response data contains a "counts" property, the array of trademark data
          //more likely to be correct, since it is calculated
          setResultsCount(searchResults.trademarks.length);
          setAreResultsEmpty(false);
        }
        setIsLoadingState(false);
        context.dispatch({type: 'pushPath', payload: {[window.location]: searchResults.trademarks}});
        console.log(context.locationHistory)
      }
    })
    .catch((err) => {
      console.error(err);
      setIsLoadingState(false);
      setIsError(true);
    });
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
          popEventListenerAdded = true;
        }
    });

    if (history.location.search) {
      fetchSearchResults(queryString.parse(history.location.search));
      setSearchPhrase(queryString.parse(history.location.search).searchphrase);
    }
  }, []);

  const handleSearchSubmit = event => {
    event.preventDefault();

    history.push({
      search: `?searchphrase=${searchPhrase}`
    });

    fetchSearchResults(queryString.parse(history.location.search));
  }

  return (
    <Layout>
      <div className="Home">
          <Search
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            setAreResultsEmpty={setAreResultsEmpty}
            handleSearchSubmit={handleSearchSubmit} />
            { resultsCount ? (
              <h4>{resultsCount}{' '}results</h4>
            ) : null}
            {/* If there's no search data to render, show the user a placholder message */}
            { isLoadingState ? (
              <div className="LoadingState">
                <CircularProgress />
              </div>
            ) : trademarks.length ? (
              <>
                <ResultsTable trademarks={trademarks}  setPage={setPage} page={page} />
                <div className="ShareContainer">
                  <ShareInput history={history} />
                </div>
              </>
                                // Use empty results boolean state and search phrase length to determine
                                // what placeholder to show the user
              ) : (<Placeholder areResultsEmpty={areResultsEmpty} searchPhrase={searchPhrase} isError={isError} />)
            }
      </div>
    </Layout>
  );
};

export default Home;
