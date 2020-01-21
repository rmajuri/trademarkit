import React from 'react'
import { TextField } from '@material-ui/core'
import styles from './search.module.css'

const Search = () => (
    <div className={styles.Container}>
        <form>
            <TextField
                className={styles.ContainerInput}
                label="Search trademarks"
                variant="outlined"
                placeholder="Enter a brand name idea to see relevant trademark information" />
        </form>
    </div>
)

export default Search
