import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Typography, Box, AppBar, Tab, Tabs } from "@mui/material";
import AssessmentTabPanel from "./AssessmentTabPanel";
import { TabPanel, a11yProps } from "dan-components/panel/TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AssessmentHelper() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Assessment Template" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AssessmentTabPanel />
      </TabPanel>
    </div>
  );
}
