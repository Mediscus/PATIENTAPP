import React from 'react';
import PropTypes from 'prop-types'; 
import {Typography, Box, Paper, List, ListItem, ListItemText} from '@mui/material'; 

function ChiefComplaints(props) {
    const {data, title} = props;

    const renderChildContent = (itemData) => {
        let output = []; 
        itemData.map((itm, index) => {
            let ItemText = itm.name || itm;
            output[index] = (<ListItem  key={'10000000'+index}>
                <ListItemText primary={ItemText} />
                {itm.data && renderChildContent(itm.data)}
            </ListItem>)
        });
        return output;
    }

    const renderContent = () => {
        let output = []; 
        data.map((itm, index) => {
            let ItemText = itm.name || itm;
            let styles = {backgroundColor: '#f4f4f4', marginBottom:10};
            output[index] = (<ListItem key={'100000'+index} style={styles}>
                <ListItemText primary={ItemText} />
                {itm.data && renderChildContent(itm.data)}
            </ListItem>)
        });
        return output;
    }

    return(
        <Box>
            <Typography variant='body2' style={{fontWeight:'bold', margin:'16px 0 8px'}}>{title || 'Chief Complaints'}</Typography>
            <List dense={true}>
                {renderContent(data, 1)}
            </List>
        </Box>
    )
}
ChiefComplaints.propTypes = {
    data: PropTypes.array.isRequired,
}
ChiefComplaints.defaultProps = {
    data: [],
}
export default ChiefComplaints;