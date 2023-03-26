import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import {
  Box,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import classNames from "classnames";
import AddMessages from "./AddMessages";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";
import { CustomSnackbar } from "dan-components";
import moment from "moment";

function Messages(props) {
  const patient = useParams();
  const doctorRef = localStorage.getItem('doctorRef');
  const { classes, add, shadow } = props;
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleMessage = (type, msg) => {
    handleSnackBar(true, type, msg);
  };


  return (
    <Paper className={classNames(classes.root)} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Messages
        </Typography>
        {add && (
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <AddCircleOutlineOutlined />
          </IconButton>
        )}
      </Box>
      <Divider />
      <Box p={1}>
        {apiData && apiData.length > 0 && apiData.map((data, index) => {
          return (
            <List key={index} component="nav" aria-label="main mailbox folders">
              <ListItem button className={classes.listStyle} classes={{ root: classes.listItemRoot }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="body2" style={{ fontSize: 14 }} color="primary">Message</Typography>
                  <Typography variant="body2" style={{ fontSize: 14 }} color="primary">{moment(data.created_at).format('DD-MM-YYYY')}</Typography>
                </Box>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {data.message}
                </Typography>
              </ListItem>
            </List>
          );
        })}
      </Box>
      {form.open && (
        <AddMessages
          open={form.open}
          data={form.data}
          type={form.type}
          closeForm={closeForm}
          setMessage={(type, msg) => handleMessage(type, msg)}
        />
      )}
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
    </Paper>
  );
}

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};
Messages.defaultProps = {
  add: true,
  shadow: 1,
};

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(3),

  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    padding: "5px 10px",
  },
  listStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemRoot: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "5px",
  },
});

export default withStyles(styles)(Messages);

const MessegeData = [
  {
    id: 1,
    name: "Heading",
    details: "Short Description",
  },
  {
    id: 2,
    name: "Heading",
    details: "Short Description",
  },
  {
    id: 3,
    name: "Heading",
    details: "Short Description",
  },
];
