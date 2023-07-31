import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  IconButton,
  ListItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import classNames from "classnames";
// project imports
import { CustomSnackbar } from "dan-components";
import apiCall from "dan-redux/apiInterface";
import { Edit } from "@mui/icons-material";
import NotFound from "../NotFound";
import BasicInfoForm from "./BasicInfoForm";
import styles from "../patientProfile-jss";

function BasicInfo(props) {
  const { classes } = props;
  const patient = useParams();
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['data']: apiData });
  const closeForm = () => [setForm({ ...form, ["open"]: false, ['data']: null })];

  useEffect(() => {
    getBasicInfo();
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getBasicInfo();
    }
  }

  async function getBasicInfo() {
    if (Object.keys(patient).length > 0) {
      await apiCall('patient/basic-info', "get", patient)
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
  };

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleMessage = (msg) => {
    handleSnackBar(true, "success", msg);
  };

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Basic Information
        </Typography>
        <IconButton onClick={() => openForm()} color="secondary" size="large">
          <Edit />
        </IconButton>
      </Box>
      <Divider />

      {apiData ? (
        <Box p={1}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4} sm={2}>
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
                  First Name
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["first_name"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Middle Name
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["middle_name"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Last Name
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["last_name"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Date Of Birth
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["dob"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Email
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["email"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Gender
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["gender"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Country Code
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["dial_country_code"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Phone Number
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["phone"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Addhar Number
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["uidai_card_number"]}
                </Typography>
              </ListItem>
            </Grid>

            <Grid item xs={4} sm={2}>
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
                  Marriage Status
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {apiData["marriage_status"]}
                </Typography>
              </ListItem>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <NotFound />
      )}

      {form.open && (
        <BasicInfoForm
          open={form.open}
          data={form.data}
          closeForm={closeForm}
          callBack={callBackResponse}
          setMessage={(msg) => handleMessage(msg)}
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

BasicInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicInfo);
