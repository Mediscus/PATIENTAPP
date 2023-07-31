import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Link, Paper, List, ListItem, ListItemText, TableRow, Table, TableCell, Button, TableBody } from '@mui/material';
import AdviseTable from '../../PatientEncounter/Advise/AdviseTable';

export function Diagnosis(props) {
    const { data } = props;
    return (
        <Typography component={"h1"} variant='body2'>{data.toString()}</Typography>
    )
}

export function Reports(props) {
    const { data, title } = props;
    const renderContent = () => {
        let output = [];
        if (data && data.length > 0) {
            data.map((report, ind) => {
                let key = new Date().getTime();
                output[ind] = <Typography variant='body2' key={key + 'reports' + ind}>
                    <Link href="#" onClick={(event) => event.preventDefault()}>
                        {report.name} / {report.date}
                    </Link>
                </Typography>
            })
        }
        return output;
    }
    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>{title || 'Reports'}</Typography>
            {renderContent()}
        </Box>
    )
}

export function FlowSheet(props) {
    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>Flow Sheet</Typography>
        </Box>
    )
}

export function Medications(props) {
    const { data, title } = props;
    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>{title || 'Medications'}</Typography>
            <List dense={true}>
                {data.map((itm, index) => {
                    return (<ListItem divider key={'10000' + index}>
                        <ListItemText primary={itm.name} />
                    </ListItem>)
                })}
            </List>
        </Box>
    )
}

export function InitialAssessment(props) {
    const { data, title } = props;

    const renderAssessmentCategoryChild = (child) => {
        let OutPutData = [];
        child.map((head, index) => {
            OutPutData[index] = (
                <TableRow key={head.key + index}>
                    <TableCell>{head.key}</TableCell>
                    <TableCell>{head.value}</TableCell>
                </TableRow>
            );
        });
        return OutPutData;
    };

    const renderAssessmentCategory = () => {
        if (data && data.length == 0) return null;
        let OutPutData = [];
        data.map((head, index) => {
            OutPutData[index] = (
                <>
                    <TableRow
                        style={{ backgroundColor: "#fafafa" }}
                        key={head.category_name + index}
                    >
                        <TableCell colSpan={2} variant="head"> {head.category_name} </TableCell>
                    </TableRow>
                    {renderAssessmentCategoryChild(head.data)}
                </>
            );
        });
        return OutPutData;
    };

    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>{title || 'Investigations'}</Typography>
            <Table style={{ margin: 0, tableLayout: "auto" }} size="small">
                <TableBody>{renderAssessmentCategory()}</TableBody>
            </Table>
        </Box>
    )
}

export function Investigations(props) {
    const { data, title } = props;
    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>{title || 'Investigations'}</Typography>
            <List dense={true}>
                {data.map((itm, index) => {
                    return (<ListItem divider key={'1002200' + index}>
                        <ListItemText primary={itm.name} />
                    </ListItem>)
                })}
            </List>
        </Box>
    )
}

export function AdviceComment(props) {
    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>Advice & Comment</Typography>
            <AdviseTable />
        </Box>
    )
}

export function FollowUp(props) {
    const { data } = props;
    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>Follow Up</Typography>
            <List dense={true}>
                <ListItem>
                    <ListItemText primary={"Next visit: " + data.next_visit} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Regular visit: " + data.regular_visit} />
                </ListItem>
                <ListItem divider>
                    <ListItemText secondary={"Message: " + data.message} />
                </ListItem>
            </List>
        </Box>
    )
}

export function Referral(props) {
    const { data } = props;
    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>Referral</Typography>
            <List dense={true}>
                <ListItem>
                    <ListItemText primary={"Doctor Name: " + data.doctor_name} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Speciality: " + data.speciality} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Priority: " + data.priority} />
                </ListItem>
                <ListItem divider>
                    <ListItemText secondary={"Comment: " + data.comment} />
                </ListItem>
            </List>
        </Box>
    )
}

export function MultiLineContent(props) {
    const { data, title } = props;
    if (data && data.length == 0) return null;
    let key = new Date().getTime();
    return (
        <Box>
            {title && <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>{title}</Typography>}
            {data.map((itm, index) => {
                return <Typography key={key + index} variant='body2'>{itm}</Typography>
            })}
        </Box>
    )
}
export function PatientDietExercise(props) {
    const { data, title } = props;
    const renderContent = () => {
        let output = [];
        data.map((itm, index) => {
            let ItemText = itm.name || itm;
            let styles = { backgroundColor: '#f4f4f4', marginBottom: 10 };
            output[index] = (<ListItem key={'100000' + index} style={styles}>
                <ListItemText primary={ItemText} />
            </ListItem>)
        });
        return output;
    }
    return (
        <Box>
            <Typography variant='body2' style={{ fontWeight: 'bold', margin: '16px 0 8px' }}>{title || 'Chief Complaints'}</Typography>
            <List dense={true}>
                {renderContent(data, 1)}
            </List>
        </Box>
    )
}