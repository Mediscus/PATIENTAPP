import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../PatientEncounter-jss";
import css from "dan-styles/Form.scss";
import {
  Box,
  Button,
  TextField,
  Grid,
  withStyles,
  MenuItem,
} from "@material-ui/core";
import Send from "@material-ui/icons/Send";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

function AddLabPrescriptionForm(props) {
  const { classes, inputChange } = props;
  const { height, width } = useWindowDimensions();
  const [selectedOrderDate, setSelectedOrderDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);

  const [formData, setFormData] = useState({
    Investigation: "",
    intent: "",
    priority: "",
    Details: "",
    Date: "",
    Instruction: "",
  });

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedOrderDate(date);
    setFormData({ ...formData, Date: selectedOrderDate });
  };

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
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
        authoredOn: selectedOrderDate,
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

          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Details"
              placeholder="Details"
              value={formData.Details}
              onChange={handleChange("Details")}
            />
          </Grid>

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
          </Grid>
        </Grid>
      </div>
      <Dialog
        open={popupOpen}
        onClose={handlePopupClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{
            marginBottom: 5,
          }}
          id="alert-dialog-title"
        >
          {"Template"}
        </DialogTitle>
        <DialogContent>
          <Grid container style={{ width: 500 }}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Enter LabPrescription Template Name"
                placeholder="Enter LabPrescription Template Name"
                type="text"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose} color="primary">
            Discard
          </Button>
          <Button
            variant="contained"
            onClick={handlePopupClose}
            color="primary"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div className={css.buttonArea}>
        <Grid
          container
          xs={12}
          md={12}
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
        >
          <Button onClick={handlePopupOpen}>Save as Template</Button>
          <Box>
            <Button type="button">Discard</Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFormSubmit}
            >
              Save&nbsp;
              <Send className={classes.sendIcon} />
            </Button>
          </Box>
        </Grid>
      </div>
    </Box>
  );
}

AddLabPrescriptionForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddLabPrescriptionForm);
