import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { Box, Paper, Typography } from "@mui/material";
import classNames from "classnames";

function MainCard(props) {
  const { classes, children, title, noMargin, stateData } = props;

  return (
    <Paper
      className={classNames(classes.root, noMargin && classes.noMargin)}
      elevation={1}
    >
      {(title || stateData) && (
        <Box className={classes.header}>
          <Typography variant="h6" component="h2" className={classes.title}>
            {title}
          </Typography>
          <Box className={classes.statetitle}>
            <Typography variant="h6">{stateData}</Typography>
          </Box>
        </Box>
      )}
      {children}
    </Paper>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  noMargin: PropTypes.bool,
};

MainCard.defaultProps = {
  noMargin: false,
  title: "",
  stateData: "",
};

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  title: {
    position: "relative",
    textTransform: "capitalize",
    fontSize: 24,
    fontWeight: 400,
    marginBottom: theme.spacing(1),
    color:
      theme.palette.type === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.dark,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontWeight: 600,
      marginBottom: theme.spacing(2),
    },
  },
  header: {
    display: "flex",
    alignItem: "center",
    justifyContent: "space-between",
  },
  statetitle: {
    display: "flex",
    alignItem: "center",
    justifyContent: "flex-start",
  },
  noMargin: {},
});

export default withStyles(styles)(MainCard);
