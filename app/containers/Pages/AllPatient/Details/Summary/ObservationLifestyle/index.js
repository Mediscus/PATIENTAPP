import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CustomSnackbar } from "dan-components";
import apiCall from "dan-redux/apiInterface";
import AddPersonalHistoryForm from "./ObservationLifestyle";
import { Edit } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../List-jss";

function PersonalHistory(props) {
  const patient = useParams();
  const { classes, add, shadow } = props;
  const [apiData, setApiData] = useState({});
  const [form, setForm] = useState({ open: false, data: null });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });
  const openForm = () =>
    setForm({ ...form, ["open"]: true, ["data"]: apiData });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getPersonalHistory();
    return () => {
      setApiData({});
    };
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getPersonalHistory();
    }
  };

  async function getPersonalHistory() {
    if (Object.keys(patient).length > 0) {
      await apiCall("ehr/personal-history", "get", patient)
        .then((res) => {
          if (res && res.Data && res.Status === "Success") {
            let data = res.Data;
            setApiData(data);
          }
        })
        .catch((Error) => {
          let ErrorMessage = Error.ErrorMessage;
          if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
            ErrorMessage = Error.ErrorMessage.join("\n");
          }
          handleSnackBar(true, "error", ErrorMessage);
        });
    }
  }

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
          Observation Life Style
        </Typography> 
        {add && (
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <Edit fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Divider />
      <Box p={1}>
        {apiData && (
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              className={classes.listStyle}
              classes={{
                root: classes.listItemRoot,
              }}
            >
              <Typography
                variant="body2"
                style={{ fontSize: 14 }}
                color="primary"
              >
                value
              </Typography>
              <Typography variant="body2" style={{ fontSize: 12 }}>
                {apiData.value}
              </Typography>
            </ListItem>
            <Divider className={classes.dividerSpace} />
          </List>
        )}
      </Box>
      {form.open && (
        <AddPersonalHistoryForm
          open={form.open}
          data={form.data}
          callBack={callBackResponse}
          setMessage={(type, msg) => handleMessage(type, msg)}
          closeForm={closeForm}
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

PersonalHistory.propTypes = {
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};
PersonalHistory.defaultProps = {
  add: true,
  shadow: 1,
};

export default withStyles(styles)(PersonalHistory);
