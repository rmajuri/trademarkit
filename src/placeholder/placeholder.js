import React from 'react';
import styles from './placeholder.module.css';

const Placeholder = ({areResultsEmpty, searchPhrase}) => ( areResultsEmpty && searchPhrase && searchPhrase.length  ?
    (<div className={styles.PlaceHolderEmptyResults}>
        Sorry - we've got nothin'.
     </div>
    ) :
    (
        <div className={styles.PlaceholderTM}>
            <span>&#8482;</span>
        </div>
    )
);

export default Placeholder;

