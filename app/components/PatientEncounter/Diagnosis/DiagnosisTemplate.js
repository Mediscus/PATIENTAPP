import React, { useEffect, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, List, ListItem, Divider, FormControlLabel, Checkbox } from "@mui/material";
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

export default function DiagnosisTemplate(props) {
  const classes = useStyles();
  const [apiData, seApiData] = useState([]);

  const handleChange = (event, data) => {
    console.log('data:', data)
  };

  const renderDiagnosisList = (items) => {
    let data = [];
    if (items && items.length > 0) {
      items.map((option, ind) => {
        data[ind] = (
          <List style={{ width: "100%" }} key={'dg' + ind}>
            <Divider />
            <ListItem
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox
                  checked={false}
                  onChange={(e) => handleChange(e, option)}
                />}
              />
              <Typography style={{ fontSize: 12 }}>{option.diagnosisName}</Typography>&nbsp;
              <Typography style={{ fontSize: 12 }}>{option.sequence}</Typography>&nbsp;
              <Typography style={{ fontSize: 12 }}>{option.status}</Typography>&nbsp;
            </ListItem>
          </List>
        );
      });
    }
    return data;
  };

  const renderDiagnosis = () => {
    let data = [];
    if (apiData && apiData.length > 0) {
      apiData.map((option, ind) => {
        data[ind] = (
          <Accordion key={ind}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classes.summaryRoot,
                content: classes.summaryContent,
                expanded: classes.summaryExpanded,
              }}
            >
              <Typography style={{ fontSize: 14 }}>{option.template_name}</Typography>
            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: classes.accordingDetails,
              }}
            >

              {renderDiagnosisList(option.template_data)}

            </AccordionDetails>
          </Accordion>
        );
      });
    }
    return data;
  };

  return (
    <Grid item xs={12} md={12}>
      {renderDiagnosis()}
    </Grid>
  );
}