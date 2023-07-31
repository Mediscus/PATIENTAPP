import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { Grid, Paper, Typography } from "@mui/material";
import { CustomSnackbar } from "dan-components";
import ChiefComplaintTable from "./ChiefComplaintTable/index";


function ChiefCompliant(props) {
  const { encounterData } = props;
  const [editData, setEditData] = useState(null);
  const [snackBar, setSnackBar] = useState({
    open: false,
    type: "",
    msg: "",
  });

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleMessage = (msg) => {
    if (msg === "success") {
      handleSnackBar(true, "success", "Data Added Successfully");
    } else if (msg === "update_success") {
      handleSnackBar(true, "success", "Data Updated Successfully");
    } else if (msg === "delete_success") {
      handleSnackBar(true, "success", "Data Deleted Successfully");
    } else if (msg === "clear_edit_data") {
      setEditData("");
    } else {
      handleSnackBar(true, "error", msg);
    }
  };

  return (
    <Grid item xs={12} md={12}>
      <ChiefComplaintTable
        encounterData={encounterData}
        setMessage={(msg) => handleMessage(msg)}
      />
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
    </Grid>
  );
}

ChiefCompliant.propTypes = {
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

export default withStyles(styles)(ChiefCompliant);
