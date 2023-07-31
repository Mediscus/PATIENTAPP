import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, List, ListItem } from "@mui/material";
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

export default function CommentTabPanel() {
  const classes = useStyles();

  const renderComment = () => {
    let data = [];
    if (Comment && Comment.length > 0) {
      Comment.map((option, ind) => {
        data[ind] = (
          <Accordion>
            {/* <AccordionSummary
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
            </AccordionSummary> */}
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
                  <Typography style={{ fontSize: 12 }}>
                    {option.Comment}
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
    <Grid item xs={12} md={12}>
      {renderComment()}
    </Grid>
  );
}

const Comment = [
  {
    id: 1,
    Category: "Comment",
    Comment: "Patient is physically fit to join work",
  },
  {
    id: 2,
    Category: "Comment",
    Comment: "Patient is unfit for joining heavy work.",
  },
  {
    id: 3,
    Category: "Comment",
    Comment: "Patient is unfit to join work and needs {10}days rest",
  },
];
