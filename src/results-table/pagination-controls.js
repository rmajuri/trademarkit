import React from 'react';
import Proptypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';
import styles from './pagination-controls.module.css';


const PaginationControls = props => {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = () => onChangePage(0);

    const handleBackButtonClick = () => onChangePage(page - 1);

    const handleNextButtonClick = () => onChangePage(page + 1);

    const handleLastPageButtonClick = () => onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));

    return (
        <div className={styles.Container}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                // Don't enable the option to go the first page if the user is already on it
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPage />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                // Don't enable the option to go back if there is only one page
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                // Don't enable the option to go to the next page if there isn't one
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                // Don't enable the option to go to the last page if the user is already on it
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPage />
            </IconButton>
        </div>
    );

};

export default PaginationControls;

PaginationControls.propTypes = {
    count: Proptypes.number.isRequired,
    page: Proptypes.number.isRequired,
    rowsPerPage: Proptypes.number.isRequired,
    onChangePage: Proptypes.func.isRequired
};
