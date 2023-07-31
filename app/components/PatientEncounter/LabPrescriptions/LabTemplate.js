import React, { useEffect, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, List, ListItem, Divider, FormControlLabel, Checkbox } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "dan-redux/apiInterface";

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

export default function LabTamplate(props) {
  const classes = useStyles();
  const [apiData, seApiData] = useState([]);

  const renderLabPrescriptionList = (items) => {
    let data = [];
    if (items && items.length > 0) {
      items.map((option, ind) => {
        data[ind] = (
          <List style={{ width: "100%" }} key={'report' + ind}>
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
              <Typography style={{ fontSize: 12 }}>{option.investigation_type}</Typography>
              <Typography style={{ fontSize: 12 }}>{option.details}</Typography>
              <Typography style={{ fontSize: 12 }}>{option.instruction}</Typography>
            </ListItem>
          </List>
        );
      });
    }
    return data;
  };

  const renderLabPrescription = () => {
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
              {renderLabPrescriptionList(option.template_data)}
            </AccordionDetails>
          </Accordion>
        );
      });
    }
    return data;
  };

  return (
    <Grid item xs={12} md={12}>
      {renderLabPrescription()}
    </Grid>
  );
}
