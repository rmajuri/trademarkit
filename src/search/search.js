import React from 'react'
import { TextField } from '@material-ui/core'
import styles from './search.module.css'

//Pass state and event handlers from the Home component to child search component
const Search = ({ searchPhrase, setSearchPhrase, handleSearchSubmit}) => (
    <div className={styles.Container}>
        <form onSubmit={handleSearchSubmit}>
            <TextField
                className={styles.ContainerInput}
                label="Search trademarks"
                variant="outlined"
                placeholder="Enter a brand name idea to see relevant trademark information"
                //Update the search phrase state on every user key stroke
                onChange={event => setSearchPhrase(event.target.value)}
                //Bind the search phrase state to the search input
                value={searchPhrase}
                required
                />
        </form>
    </div>
);

export default Search;
