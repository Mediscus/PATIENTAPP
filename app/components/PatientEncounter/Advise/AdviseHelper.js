import React, { useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DietTabPanel from "./DietTabPanel";
import ExerciseTabPanel from "./ExerciseTabPanel";
import CommentTabPanel from "./CommentTabPanel";
import { TabPanel, a11yProps } from "dan-components/panel/TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AdviseHelper() {
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
          <Tab label="Diet" {...a11yProps(0)} />
          <Tab label="Exercise" {...a11yProps(1)} />
          <Tab label="Comment" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DietTabPanel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ExerciseTabPanel />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CommentTabPanel />
      </TabPanel>
    </div>
  );
}
