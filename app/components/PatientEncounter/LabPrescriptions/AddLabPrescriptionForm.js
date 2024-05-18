import React, { useState } from "react";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import css from "dan-styles/Form.scss";
import { DatePicker } from "@material-ui/pickers";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

function AddLabPrescriptionForm(props) {
  const { classes, inputChange } = props;
  const { height, width } = useWindowDimensions();
  const [selectedOrderDate, setSelectedOrderDate] = useState(new Date());
  const [formData, setFormData] = useState({
    Investigation: "",
    intent: "",
    priority: "",
    Details: "",
    Date: "",
    Instruction: "",
  });

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedOrderDate(date);
    setFormData({ ...formData, Date: selectedOrderDate });
  };

  const handleFormSubmit = async () => {
    try {
      const postData = {
        resourceType: "ServiceRequest",
        status: "active",
        intent: formData.intent,
        category: [
          {
            coding: [
              {
                display: formData.Investigation,
              },
            ],
          },
        ],
        priority: formData.priority,
        code: {
          coding: [
            {
              display: formData.Details,
            },
          ],
        },
        quantityQuantity: { value: 1 },
        authoredOn: moment(formData.Date).toISOString(),
      };

      console.log("postData:", postData);

      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/ServiceRequest?_lastUpdated=gt2024-05-13",
        postData
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justify: "space-between",
      }}
    >
      <div
        className={css.bodyForm}
        style={{
          height: height - 140,
          maxHeight: height - 140,
          overflow: "auto",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Investigation"
              placeholder="Investigation"
              value={formData.Investigation}
              onChange={handleChange("Investigation")}
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Intent"
              placeholder="Intent"
              value={formData.intent}
              onChange={handleChange("intent")}
              select
            >
              {[
                "proposal",
                "plan",
                "directive",
                "order",
                "original-order",
                "reflex-order",
                "filler-order",
                "instance-order",
                "option",
              ].map((option, index) => (
                <MenuItem key={option + "-" + index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Priority"
              placeholder="Priority"
              value={formData.priority}
              onChange={handleChange("priority")}
              select
            >
              {["routine", "urgent", "asap", "stat"].map((option, index) => (
                <MenuItem key={option + "-" + index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* 
          <Grid item xs={6} sm={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                label="Order Date"
                format="DD/MM/YYYY"
                placeholder="10/10/2018"
                value={selectedOrderDate}
                onChange={handleDateChange}
                animateYearScrolling={false}
                style={{ width: "100%" }}
              />
            </MuiPickersUtilsProvider>
          </Grid> */}
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Details"
              placeholder="Details"
              value={formData.Details}
              onChange={handleChange("Details")}
            />
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container justifyContent="space-between" alignItems="center">
          <Button>Save as Template</Button>
          <Box>
            <Button type="button">Discard</Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFormSubmit}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </div>
    </Box>
  );
}

export default AddLabPrescriptionForm;
