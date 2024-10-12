import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography, Divider, List, ListItem, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

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

export default function AdviseTable(props) {
  const classes = useStyles();
  const { adviceData } = props;

  const renderDietList = (items) => {
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

  const renderDiet = () => {
    let data = [];
    if (Diet && Diet.length > 0) {
      Diet.map((option, ind) => {
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
              <Typography className={classes.heading} style={{ fontSize: 14 }}>
                {option.Category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: classes.accordingDetails,
              }}
            >
              <List style={{ width: "100%" }}>
                {renderDietList(option.Diet)}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      });
    }
    return data;
  };

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
              <Typography className={classes.heading} style={{ fontSize: 14 }}>
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

  const renderCommentList = (items) => {
    let data = [];
    if (items && items.length > 0) {
      items.map((option, ind) => {
        data[ind] = (
          <Box>
            <Divider />
            <ListItem
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontSize: 12 }}>{option.Comment}</Typography>
            </ListItem>
          </Box>
        );
      });
    }
    return data;
  };

  const renderComment = () => {
    let data = [];
    if (Comment && Comment.length > 0) {
      Comment.map((option, ind) => {
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
              <Typography
                className={classes.heading}
                style={{ fontSize: 14, letterSpacing: 1 }}
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
                <ListItem
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography style={{ fontSize: 14 }}>
                    {renderCommentList(option.Comment)}
                  </Typography>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        );
      });
    }
    return data;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        {renderDiet()}
      </Grid>
      <Grid item xs={12} md={12}>
        {renderExercise()}
      </Grid>
      <Grid item xs={12} md={12}>
        {renderComment()}
      </Grid>
    </Grid>
  );
}

const Diet = [
  {
    id: 1,
    Category: "Diet",
    Diet: [
      {
        name: "Breakfast (8:00-8:30AM) 4 Idli + Sambar 1/2 cup/ 1 table spoon Green chutney/ Tomato Chutney",
      },
      {
        name: "Mid-Meal (11:00-11:30AM) green gram sprouts 1 cup",
      },
      {
        name: "Lunch (2:00-2:30PM) 3 Roti+1/2 cup salad + Fish curry ( 100 gm fish)+ 1/2 cup cabbage subji.",
      },
      {
        name: "Evening (4:00-4:30PM) 1 cup tea+ + 2 biscuits ( Nutrichoice or Digestiva or Oatmeal.)",
      },
      {
        name: "Dinner (8:00-8:30PM) 2 Roti / chappathi+Ridge guard subji 1/2 cup..",
      },
    ],
  },
];

const Exercise = [
  {
    id: 1,
    Category: "Exercise",
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
];

const Comment = [
  {
    id: 1,
    Category: "Comment",
    Comment: [
      {
        Comment: "Patient is physically fit to join work",
      },
      {
        Comment: "Patient is unfit for joining heavy work.",
      },
      {
        Comment: "Patient is unfit to join work and needs {10}days rest",
      },
    ],
  },
];
