import React from 'react';
import PropTypes from 'prop-types'; 
import {Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'; 

function DocDiagnosis(props) {
    const {data} = props;
    return(
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small" style={{margin:0}}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Diagnosis</TableCell>
                        <TableCell>Start Date/Year</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell>{row.start_date || row.year}</TableCell> 
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
DocDiagnosis.propTypes = {
    data: PropTypes.array.isRequired,
}
DocDiagnosis.defaultProps = {
    data: [],
}
export default DocDiagnosis;