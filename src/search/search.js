import React from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './search.module.css';
import Proptypes from 'prop-types';

//Pass state and event handlers from the Home component to child search component
const Search = ({ searchPhrase, setSearchPhrase, setAreResultsEmpty, handleSearchSubmit}) => {

    const handleSearchPhraseChange = event => {
        setSearchPhrase(event.target.value);

        if (!event.target.value) {
            setAreResultsEmpty(false);
        }
    };

    return (<div className={styles.Container}>
                <form onSubmit={handleSearchSubmit} className={styles.Form}>
                    <TextField
                        className={styles.ContainerInput}
                        label="Search trademarks"
                        variant="outlined"
                        placeholder="Enter a brand name idea to see relevant trademark information"
                        //Update the search phrase state on every user key stroke
                        onChange={handleSearchPhraseChange}
                        //Bind the search phrase state to the search input
                        value={searchPhrase}
                        required
                        />
                    <Button type="submit" label="submit" className={styles.FormButton}>submit</Button>
                </form>
            </div>);
};

export default Search;

Search.propTypes = {
    searchPhrase: Proptypes.string,
    setSearchPhrase: Proptypes.func.isRequired,
    setAreResultsEmpty: Proptypes.func.isRequired,
    handleSearchSubmit: Proptypes.func.isRequired
};
