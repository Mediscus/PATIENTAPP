import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,
  Typography,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ChiefComplaintData } from "dan-api/dummy/ChiefComplaintData";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  },
  accordingDetails: {
    padding: "0px !important",
  },
}));

export default function ChiefComplaintTabPanel() {
  const classes = useStyles();

  const renderTemplateItems = (items, marginLeft) => {
    let data = [];
    if (items && items.length > 0) {
      items.map((option, ind) => {
        data[ind] = (
          <>
            <ListItem style={{ marginLeft: marginLeft }}>
              <Typography variant="body2" style={{ fontSize: 12 }}>
                {option.name}
              </Typography>
            </ListItem>
            {option.item && renderTemplateItems(option.item, marginLeft + 16)}
          </>
        );
      });
    }
    return data;
  };

  const renderTemplate = () => {
    let data = [];
    if (ChiefComplaintData && ChiefComplaintData.length > 0) {
      ChiefComplaintData.map((option, ind) => {
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
            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: classes.accordingDetails,
              }}
            >
              <List>{renderTemplateItems(option.item, 0)}</List>
            </AccordionDetails>
          </Accordion>
        );
      });
    }
    return data;
  };

  return <Grid>{renderTemplate()}</Grid>;
}
