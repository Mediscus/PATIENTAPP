import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Grid from "@mui/material/Grid";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import colorfull from "dan-api/palette/colorfull";
import CounterWidget from "../Counter/CounterWidget";
import styles from "./widget-jss";

function CounterIconWidget(props) {
  const { classes } = props;
  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color={colorfull[0]}
            start={0}
            end={207}
            duration={3}
            title="Total Doctor"
          >
            <SupervisorAccount className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color={colorfull[1]}
            start={0}
            end={300}
            duration={3}
            title="Total Nurse"
          >
            <SupervisorAccount className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color={colorfull[2]}
            start={0}
            end={207}
            duration={3}
            title="Total Patient"
          >
            <SupervisorAccount className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color={colorfull[1]}
            start={0}
            end={300}
            duration={3}
            title="Active Patient"
          >
            <SupervisorAccount className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
      </Grid>
    </div>
  );
}

CounterIconWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CounterIconWidget);
