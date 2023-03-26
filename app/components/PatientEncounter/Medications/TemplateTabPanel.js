import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";

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

export default function TemplateTabPanel(props) {
  const { encounterData } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [apiData, setApiData] = useState([]);
  const [MedicationData, setMedicationData] = useState([]);

  const renderMedicinesItems = (items) => {
    let data = [];
    if (items && items.length > 0) {
      items.map((option, ind) => {
        data[ind] = (
          <List style={{ width: "100%" }} key={'med' + ind}>
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
                  checked={MedicationData.find(data => data['brandName'] === option.brandName) ? true : false}
                //onChange={(e) => handleChange(e, option)}
                />}
                label={option.template_name}
              />
              <Typography style={{ fontSize: 12 }}>
                {option.form} &nbsp;
                {option.brandName} &nbsp;
              </Typography>
            </ListItem>
          </List>
        );
      });
    }
    return data;
  };

  const renderTemplateMedicines = () => {
    let data = [];
    if (apiData && apiData.length > 0) {
      apiData.map((option, ind) => {
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
              <Typography style={{ fontSize: 14 }}>{option.template_name}</Typography>
            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: classes.accordingDetails,
              }}
            >
              {renderMedicinesItems(option.template_data)}
            </AccordionDetails>
          </Accordion>
        );
      });
    }
    return data;
  };

  return (
    <Grid>
      <Grid>{renderTemplateMedicines()} </Grid>
    </Grid>
  );
}
