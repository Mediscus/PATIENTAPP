import React, { useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import useWindowDimensions from "dan-utils/useWindowDimensions";
import {
  AppBar,
  Tab,
  Tabs,
} from "@mui/material";
import { TabPanel, a11yProps } from "dan-components/panel/TabPanel";
import DiagnosisTemplate from "./DiagnosisTemplate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DiagnosisHelper(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { height, width } = useWindowDimensions();

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
          <Tab label="Frequently used diagnosis" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        style={{ height: height - 120, overflow: "auto" }}
      >
        <DiagnosisTemplate />
      </TabPanel>
    </div>
  );
}
