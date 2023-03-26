import React from "react";
import PropTypes from "prop-types";
import brand from "dan-api/dummy/brand";
import { Helmet } from "react-helmet";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import styles from "./dashboard-jss";
import {
  CounterIconsWidget,
  PerformanceChartWidget,
  FirstClinicWidget,
  SecondClinicWidget,
  ThirdClinicWidget,
  MessageList,
} from "dan-components";

function PersonalDashboard(props) {
  const title = brand.name + " - Personal Dashboard";
  const description = brand.desc;
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { classes } = props;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      {/* {userDetails.user_type !== "admin" && <DetailsView />} */}

      {/* 1st Section */}
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={12} xs={12}>
          <CounterIconsWidget />
        </Grid>
      </Grid>

      {/* 2nd Section */}
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={4} xs={12}>
          <Divider className={classes.divider} />
          <FirstClinicWidget />
        </Grid>
        <Grid item md={4} xs={12}>
          <Divider className={classes.divider} />
          <SecondClinicWidget />
        </Grid>
        <Grid item md={4} xs={12}>
          <Divider className={classes.divider} />
          <ThirdClinicWidget />
        </Grid>
      </Grid>

      {/* 3rd Section */}

      <Grid container spacing={2} className={classes.root}>
        <Grid item md={8} xs={12}>
          <PerformanceChartWidget />
        </Grid>
        <Grid item md={4} xs={12}>
          <MessageList />
        </Grid>
      </Grid>
    </div>
  );
}

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalDashboard);
