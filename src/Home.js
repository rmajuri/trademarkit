import React from 'react';
import { CircularProgress } from '@material-ui/core'
import './Home.css';
import Search from './search/search';
import ResultsTable from './results-table/results-table';
import Placeholder from './placeholder/placeholder';
import Layout from './layout/layout';
import { createBrowserHistory } from 'history';
import queryString from 'query-string';
import ShareInput from './share-input/share-input';

const Home = ({
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
}) => {
  console.log("NEW TRADEMARKS", trademarks)
  // const [trademarks, setTrademarks] = useState([]);
  // const [resultsCount, setResultsCount] = useState(0);
  // const [searchPhrase, setSearchPhrase] = useState('');
  // const [areResultsEmpty, setAreResultsEmpty] = useState(false);
  // const [page, setPage] = useState(0);
  // const [isLoadingState, setIsLoadingState] = useState(false);
  // const [isError, setIsError] = useState(false);

  const history = createBrowserHistory();

  const fetchSearchResults = (parsedQuery) => {
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

        window.localStorage.setItem(searchPhrase, JSON.stringify(searchResults.trademarks));
        setIsLoadingState(false);
      }
    })
    .catch((err) => {
      console.error(err);
      setIsLoadingState(false);
      setIsError(true);
    });
  };

//   const loadCachedSearchResults = () => {
//       setResultsCount(0);
//       setPage(0);
//       setTrademarks([]);
//       setIsLoadingState(true);
//       setIsError(false);

//     if (window.localStorage[cachedSearchPhrase]) {
//       console.log('RESULT IN LOAD FUNCTION', window.localStorage[cachedSearchPhrase])
//       const results = JSON.parse(window.localStorage[cachedSearchPhrase])
//       if (typeof results === 'string' && results === 'noresults') {
//         setAreResultsEmpty(true);
//         setTrademarks([]);
//       }

//       if (Array.isArray(results)) {
//         setTrademarks(results);
//         setResultsCount(results.length);
//         setAreResultsEmpty(false);
//       }
//     }
// };

  // useEffect(() => {
  //   if (history.location.search && !window.localStorage.hasOwnProperty(queryString.parse(window.location.search).searchphrase)) {
  //     const newSearchPhrase = queryString.parse(history.location.search).searchphrase;
      
  //     console.log("YOOOOOOOOOOOOO");
  //   }
  // }, []);

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
