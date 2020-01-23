import React from 'react';
import styles from './placeholder.module.css';
import { Typography } from '@material-ui/core'
import Proptypes from 'prop-types';

const Placeholder = ({areResultsEmpty, searchPhrase}) => ( areResultsEmpty && searchPhrase && searchPhrase.length  ?
    (<div className={styles.PlaceHolderEmptyResults}>
        <Typography variant="h5">
            Sorry - we've got nothin'.
        </Typography>
     </div>
    ) :
    (
        <div className={styles.PlaceholderTM}>
            <span>&#8482;</span>
        </div>
    )
);

export default Placeholder;

Placeholder.propTypes = {
    areResultsEmpty: Proptypes.bool.isRequired,
    searchPhrase: Proptypes.string.isRequired
};
