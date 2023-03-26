import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { Box, Paper, Typography } from "@mui/material";
import classNames from "classnames";
import FlowSheets from "./FlowSheets";

function FlowSheet(props) {
  const { classes } = props;

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Box style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}>
        <Typography variant="h6" component={"span"}>
          FlowSheets
        </Typography>
      </Box>
      <FlowSheets />
    </Paper>
  );
}

FlowSheet.propTypes = {
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

export default withStyles(styles)(FlowSheet);
