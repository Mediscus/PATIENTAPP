import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  Box,
} from "@mui/material";
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

  const renderDietList = () => {
    let data = [];
    if (adviceData && adviceData.length > 0) {
      adviceData.map((option, ind) => {
        data[ind] = (
          <List key={'diet' + ind} style={{ width: "100%" }}>
            <ListItem style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}>
              <Typography style={{ fontSize: 12 }}>{option.diet.join(', ')}</Typography>
              <Typography style={{ fontSize: 12 }}>{moment(option.created_at).format('DD/MM/YYYY')}</Typography>
            </ListItem>
            <Divider variant="fullWidth" />
          </List>
        );
      });
    }
    return data;
  };

  const renderDiet = () => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.summaryRoot,
            content: classes.summaryContent,
            expanded: classes.summaryExpanded,
          }}
        >
          <Typography className={classes.heading} style={{ fontSize: 14 }}>
            Diet
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          classes={{
            root: classes.accordingDetails,
          }}
        >
          {renderDietList()}
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderExerciseList = () => {
    let data = [];
    if (adviceData && adviceData.length > 0) {
      adviceData.map((option, ind) => {
        data[ind] = (
          <List key={'ex' + ind} style={{ width: "100%" }}>
            <ListItem
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography style={{ fontSize: 12 }}>{option.exercise.join(', ')}</Typography>
              <Typography style={{ fontSize: 12 }}>{moment(option.created_at).format('DD/MM/YYYY')}</Typography>
            </ListItem>
            <Divider variant="fullWidth" />
          </List>
        );
      });
    }
    return data;
  };

  const renderExercise = () => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.summaryRoot,
            content: classes.summaryContent,
            expanded: classes.summaryExpanded,
          }}

        >
          <Typography className={classes.heading} style={{ fontSize: 14 }}>
            Exercise
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          classes={{
            root: classes.accordingDetails,
          }}
        >
          {renderExerciseList()}
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderCommentList = () => {
    let data = [];
    if (adviceData && adviceData.length > 0) {
      adviceData.map((option, ind) => {
        data[ind] = (
          <ListItem
            key={'comt' + ind}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography style={{ fontSize: 12 }}>{option.comment}</Typography>
          </ListItem>
        );
      });
    }
    return data;
  };

  const renderComment = () => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.summaryRoot,
            content: classes.summaryContent,
            expanded: classes.summaryExpanded,
          }}

        >
          <Typography
            className={classes.heading}
            style={{ fontSize: 14, letterSpacing: 1 }}
          >
            Comment
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          classes={{
            root: classes.accordingDetails,
          }}
        >
          <List style={{ width: "100%" }}>
            {renderCommentList()}
          </List>
        </AccordionDetails>
      </Accordion>
    );
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
