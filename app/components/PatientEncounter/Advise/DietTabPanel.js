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

export default function DietTabPanel() {
  const classes = useStyles();

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
                {renderDietList(option.Diet)}
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
      {renderDiet()}
    </Grid>
  );
}

const Diet = [
  {
    id: 1,
    Category: "Diet chart for Diabetic Patient - NON VEG",
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
  {
    id: 2,
    Category: "Food Items You Can Easily Consume in Diabetes",
    Diet: [
      {
        name: "Cereals: Brown rice, Oat meal, Brocken wheat, Ragi, Quinoa.",
      },
      {
        name: "Pulses: Chickpeas, Kidney beans, moong dal, masoor dal, soybeans.",
      },
      {
        name: "Vegetables: All gourds-bitter gourd, snake gourd, ridge gourd, bottle gourd, ivy gourd, ladies finger, tinda,green leafy vegetables.",
      },
      {
        name: "Fruits: Custard Apple, Pears, Grape and Watermelon, Orenges and Apple.",
      },
      {
        name: "Milk and Milk products: Skim milk, Paneer, Cotage Cheese, Yoghurt.",
      },
      {
        name: "Meat, Fish and Egg: Lean Meat, Chicken Brest, Tuna, Salmon, Tilapia, Sword fish , Cod.",
      },
      {
        name: "Oil: 1.5 Tbsp/ day( Olive oil, Mustard Oil, Rice bran Oil, Canola oil",
      },
      {
        name: "Sugar: 1 Tsp/ day.",
      },
    ],
  },
];
