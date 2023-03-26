import React, { useState, useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Divider, Typography, List, ListItem, IconButton, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";
import { DeleteForever, Edit } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    padding: "5px !important",
    backgroundColor: theme.palette.background.paper,
  },
  summaryRoot: {
    minHeight: "35px",
  },
  accordionRoot: {
    padding: "5px !important",
  },
  summaryExpanded: {
    minHeight: "25px !important",
  },
  summaryContent: {
    margin: "5px 0px !important",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  accordingDetails: {
    padding: "0px !important",
  },
}));

export default function AssessmentTabel(props) {
  const { assessmentData, handleDelete, handleEdit } = props;
  const [assesData, setAssesData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (assessmentData && assessmentData.length > 0)
      setAssesData(assessmentData);
  }, [assessmentData])

  // function to convert string into html
  function createMarkup(data) {
    return { __html: data };
  }

  const renderAssessmentItems = (items) => {
    if (items && Object.keys(items).length > 0) {
      return (
        <div>
          <Divider />
          <Typography
            variant="body2"
            style={{ fontSize: 12, marginLeft: 20, marginTop: 10 }}
          >
            <span
              dangerouslySetInnerHTML={createMarkup(items.detail)}
            />
          </Typography>
        </div>
      )
    };
  };

  const renderAssessment = () => {
    let data = [];
    if (assesData && assesData.length > 0) {
      assesData.map((option, ind) => {
        data[ind] = (
          <Accordion key={'renderAssessment' + ind}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classes.summaryRoot,
                content: classes.summaryContent,
                expanded: classes.summaryExpanded,
              }}
            >
              <Typography variant="body2">{option.category}</Typography>
              <Box>
                <IconButton color="secondary" onClick={() => handleEdit(option)} size="large">
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  classes={{
                    root: classes.iconBtn,
                  }}
                  onClick={() =>
                    handleDelete(option.assessment_id, option.patient_ref)
                  }
                  size="large">
                  <DeleteForever />
                </IconButton>
              </Box>


            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: classes.accordingDetails,
              }}
            >
              <List style={{ width: "100%" }}>
                {renderAssessmentItems(assesData[ind])}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      });
    }
    return data;
  };

  return <Grid>{renderAssessment()} </Grid>;
}
