import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  summaryRoot: {
    minHeight: "35px",
  },
  summaryExpanded: {
    minHeight: "25px !important",
  },
  summaryContent: {
    margin: "5px 0px !important",
  },
  accordingDetails: {
    padding: "0px !important",
  },
}));

export default function ExerciseTabPanel() {
  const classes = useStyles();

  const renderExerciseList = (items) => {
    let data = [];
    if (items && items.length > 0) {
      items.map((option, ind) => {
        data[ind] = (
          <>
            <Divider />
            <ListItem
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontSize: 12 }}>{option.name}</Typography>
            </ListItem>
          </>
        );
      });
    }
    return data;
  };

  const renderExercise = () => {
    let data = [];
    if (Exercise && Exercise.length > 0) {
      Exercise.map((option, ind) => {
        data[ind] = (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classes.summaryRoot,
                content: classes.summaryContent,
                expanded: classes.summaryExpanded,
              }}
              IconButtonProps={{ style: { padding: 5 } }}
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox />}
                label={option.name}
              />
              <Typography
                className={classes.heading}
                style={{ fontSize: 14, fontWeight: "500" }}
              >
                {option.Category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: classes.accordingDetails,
              }}
            >
              <List style={{ width: "100%" }}>
                {renderExerciseList(option.Exercise)}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      });
    }
    return data;
  };

  return (
    <Grid item xs={12} md={12}>
      {renderExercise()}
    </Grid>
  );
}

const Exercise = [
  {
    id: 1,
    Category: "DAILY ROUTINE EXERCISE",
    Exercise: [
      {
        name: "Walking. Walking is one of the easiest aerobic exercises to do, and you don't need any equipment — just your two feet. ...",
      },
      {
        name: "Yoga",
      },
      {
        name: "Pilates",
      },
      {
        name: "Dance",
      },
      {
        name: "Bicycle or elliptical machine",
      },
      {
        name: "High-intensity interval training (HIIT)",
      },
      {
        name: "Stretching",
      },
      {
        name: "Resistance training",
      },
    ],
  },
  {
    id: 2,
    Category: "LOWER BACK PAIN EXERCISE",
    Exercise: [
      {
        name: "Bicycle or elliptical machine",
      },
      {
        name: "High-intensity interval training (HIIT)",
      },
      {
        name: "Stretching",
      },
      {
        name: "Resistance training",
      },
    ],
  },
];
