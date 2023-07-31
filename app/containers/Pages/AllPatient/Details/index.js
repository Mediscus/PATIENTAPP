import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import Paper from "@mui/material/Paper";
import styles from "./settings-jss";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Summary from "./Summary";
import TimeLine from "./Timeline";
import PatientProfile from "./PatientProfile";
import Encounter from "./Encounter";
import Chip from "@mui/material/Chip";
import { Tab, TabPanel, a11yProps } from "dan-components";
import { Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PatientCard from "./patientCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEncounter,
  removeEncounter,
} from "../../../../redux/actions/encounterActions";

function Settings(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const encounters = useSelector((state) => state.encounters.encounters);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (encounters.length > 0) {
      setValue(encounters.length + 2);
    } else {
      setValue(0);
    }
  }, [encounters.length]);

  useEffect(() => {
    return () => {
      dispatch(clearEncounter());
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const title = brand.name;
  const description = brand.desc;
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
      <Paper className={classes.paperStyled} elevation={0}>
        <PatientCard />
        <Box>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Action
          </Button>
        </Box>
      </Paper>
      {/* Content */}
      <Box>
        <AppBar position="static" style={{ borderRadius: "5px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="Timeline" {...a11yProps(1)} />
            <Tab label="Profile" {...a11yProps(2)} />
            {encounters.length > 0 &&
              encounters.map((tab, index) => {
                return (
                  <Tab
                    key={index}
                    label={
                      <Chip
                        sx={{ bgcolor: "transparent" }}
                        label={tab.diagnosis}
                        onDelete={() =>
                          dispatch(
                            removeEncounter({
                              appointment_id: tab.appointment_id,
                            })
                          )
                        }
                        color="primary"
                      />
                    }
                    {...a11yProps(index + 2)}
                  />
                );
              })}
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Summary />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TimeLine />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PatientProfile />
        </TabPanel>
        {encounters !== undefined &&
          encounters.length > 0 &&
          encounters.map((data, index) => {
            return (
              <TabPanel
                key={"tabPanel" + index}
                value={value}
                index={index + 3}
              >
                <Encounter data={data} />
              </TabPanel>
            );
          })}
      </Box>
    </div>
  );
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
