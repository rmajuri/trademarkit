import React from 'react'
import styles from './results-table.module.css'
import { startCase } from 'lodash'
//Import the necessary Material UI components via tree shaking for better peformance
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'

const ResultsTable = ({ trademarks }) => {
    return ( trademarks && trademarks.length ?
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
                    {trademarks.map(tm => (
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
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    : null);
};

export default ResultsTable;
