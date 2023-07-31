import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import classNames from "classnames";
import FollowUpForm from "./FollowUpForm";
import ReferalForm from "./ReferalForm";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar } from "dan-components";

function FollowUp(props) {
  const { classes, encounterData } = props;
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const [followUpFieldData, setFollowUpFieldData] = useState({});
  const [referalFieldData, setReferalFieldData] = useState({});

  const followUpData = (data) => {
    setFollowUpFieldData(data);
  }

  const referalData = (data) => {
    setReferalFieldData(data);
  }

  const postFollowUpApi = async () => {
    await apiCall("ehr/follow-up", "post", followUpFieldData)
      .then((res) => {
        if (res && res.Data && res.Status === "Success") {
          handleSnackBar(true, "success", "Data saved successfully");
        }
      })
      .catch((Error) => {
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        handleSnackBar(true, "error", ErrorMessage);
      });
  };

  const postReferalApi = async () => {
    await apiCall("ehr/referral", "post", referalFieldData)
      .then((res) => {
        if (res && res.Data && res.Status === "Success") {
          handleSnackBar(true, "success", "Data saved successfully");
        }
      })
      .catch((Error) => {
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        handleSnackBar(true, "error", ErrorMessage);
      });
  };

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  return (
    <Grid item xs={12} md={12}>
      <Paper className={classNames(classes.root)} elevation={1}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 25,
          }}>
          <Typography variant="h6">Follow Up</Typography>
          <Button color="secondary" size="small" variant="contained" onClick={() => postFollowUpApi()}>
            Save
          </Button>
        </Box>
        <FollowUpForm callBackfollowUpData={followUpData} encounterData={encounterData} />
        <Grid
          item
          xs={12}
          md={12}
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Divider />
        </Grid>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant="h6">Referal</Typography>
          <Button color="secondary" size="small" variant="contained" onClick={() => postReferalApi()}>
            Save
          </Button>
        </Box>
        <ReferalForm callBackReferalData={referalData} encounterData={encounterData} />
      </Paper>
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
    </Grid>
  );
}

FollowUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },

  },
});

export default withStyles(styles)(FollowUp);
