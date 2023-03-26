import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { AssessmentData } from "dan-api/dummy/AssessmentData";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssessmentForm from "./AssessmentForm";

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

export default function AssessmentTabPanel() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [tempData, setTempData] = React.useState({});

  const handleChange = (event, data) => {
    setChecked(event.target.checked);
    setTempData(data)
  };


  // function to convert string into html
  function createMarkup(data) {
    return { __html: data };
  }

  const renderTemplateItems = (items) => {
    let data = [];
    if (items && items.length > 0) {
      items.map((option, ind) => {
        data[ind] = (
          <div key={"TemplateItems" + ind}>
            <Divider />
            <ListItem>
              <Typography style={{ fontSize: 12 }}>
                <span dangerouslySetInnerHTML={createMarkup(option.detail)} />
              </Typography>
            </ListItem>
          </div>
        );
      });
    }
    return data;
  };

  const renderTemplate = () => {
    let data = [];
    if (AssessmentData && AssessmentData.length > 0) {
      AssessmentData.map((option, ind) => {
        data[ind] = (
          <Accordion key={"Accordion" + ind}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classes.summaryRoot,
                content: classes.summaryContent,
                expanded: classes.summaryExpanded,
              }}
            // IconButtonProps={{ style: { padding: 5 } }}
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox checked={checked} onChange={(e) => handleChange(e, option)} />}
                label={option.category}
              />
            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: classes.accordingDetails,
              }}
            >
              <List style={{ width: "100%" }}>
                <ListItem>
                  <Typography style={{ fontSize: 12 }}>
                    <span dangerouslySetInnerHTML={createMarkup(option.detail)} />
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
    <Box sx={{ height: '100vh' - 140 }}>
      {renderTemplate()}
      {
        Object.keys(tempData).length > 0 &&
        <AssessmentForm data={tempData} type='template' />
      }
    </Box>
  );
}
