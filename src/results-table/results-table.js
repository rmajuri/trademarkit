import React, { useState } from 'react';
import styles from './results-table.module.css';
import { startCase } from 'lodash';
import PaginationControls from './pagination-controls'
//Import the necessary Material UI components via tree shaking for better peformance
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter} from '@material-ui/core';


const ResultsTable = ({ trademarks }) => {
    //Always start pagination at page 0
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerpage] = useState(5);

    //Calculation to use to fill the appropriate amount of space if the row count falls short of the minimum
    const emptyRowFiller = rowsPerPage - Math.min(rowsPerPage, trademarks.length - page * rowsPerPage);

    const handleChangePage = newPage => setPage(newPage);

    const handleChangeRowsPerPage = event => {
        setRowsPerpage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (trademarks && trademarks.length ? (
        <div className={styles.Container}>
        {/* Use the drop-shadow "Paper" Material UI component as the table's container */}
        <TableContainer component={Paper}>
            <Table aria-label="Trademark search results table">
                <TableHead>
                    <TableRow>
                        <TableCell>Wordmark</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Owner</TableCell>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Render out data for only the number of results the user has specified */}
                    {(rowsPerPage > 0 ? trademarks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : trademarks).map(tm => (
                        //use the serial number of the trademarks as the component keys since they're unique for each element
                        <TableRow key={tm.serialnumber}>
                            <TableCell component="th" scope="row">
                                {tm.wordmark}
                            </TableCell>
                            <TableCell>{tm.description}</TableCell>
                            <TableCell>{tm.owner}</TableCell>
                            <TableCell>{startCase(tm.city.toLowerCase())}</TableCell>
                            <TableCell>{tm.state}</TableCell>
                            <TableCell>{tm.status}</TableCell>
                        </TableRow>
                    ))
                    }
                    {/* Render out filler rows if we need them */}
                    {emptyRowFiller > 0 ? (
                        <TableRow style={{height: 53 * emptyRowFiller}}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    ) : null}
                </TableBody>
                <TableFooter>
                    <TableRow >
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20, {label: 'All', value: -1}]}
                            colSpan={6}
                            count={trademarks.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            //Use the browser's native component for the select component for mobile compatibility
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page' },
                                native: true
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={PaginationControls}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        </div>) : null);
};

export default ResultsTable;
