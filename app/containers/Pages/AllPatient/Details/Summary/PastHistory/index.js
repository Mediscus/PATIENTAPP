import React from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";
import HospitalizationHistory from "./HospitalizationHistory";
import SurgeryHistory from "./SurgeryHistory";
import BloodTransfusionHistory from "./BloodTransfusionHistory";
import styles from "../List-jss";
import { withStyles } from "@mui/styles";

function PastHistory(props) {
  const { classes, add, shadow } = props;

  return (
    <Paper className={classes.root} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Past History
        </Typography>
      </Box>
      <HospitalizationHistory add={add} />
      <SurgeryHistory add={add} />
      <BloodTransfusionHistory add={add} />
    </Paper>
  );
}

PastHistory.propTypes = {
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};
PastHistory.defaultProps = {
  add: true,
  shadow: 1,
};

export default withStyles(styles)(PastHistory);