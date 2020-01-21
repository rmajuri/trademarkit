import React from 'react'
//Import the necessary Material UI components via tree shaking for better peformance
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'

const ResultsTable = ({ trademarks }) => {
    return ( trademarks && trademarks.length ?

        //Use the drop-shadow "Paper" Material UI component as the table's container
        <TableContainer component={Paper}>
            <Table aria-label="Trademark search results table">
                <TableHead>
                    <TableRow>
                        <TableCell>Wordmark</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Registration Date</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">State</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trademarks.map(tm => (
                        //use the serial number of the trademarks as the component keys since they're unique for each element
                        <TableRow key={tm.serialNumber}>
                            <TableCell component="th" scope="row">
                                {}
                            </TableCell>
                            <TableCell>{tm.wordmark}</TableCell>
                            <TableCell>{tm.description}</TableCell>
                            <TableCell>{tm.owner}</TableCell>
                            <TableCell>{tm.registrationdate}</TableCell>
                            <TableCell>{tm.city}</TableCell>
                            <TableCell>{tm.state}</TableCell>
                            <TableCell>{tm.status}</TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    : null);
};

export default ResultsTable;
