import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import moment from "moment";
import { Formik } from "formik";
import { TextField as MuiTextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { diagnosisFormSchema } from "dan-api/schema";
import { DatePicker, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import MenuItem from "@mui/material";
import { useDispatch } from "react-redux";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
function AddDiagnosisForm(props) {
  const patient = useParams();
  const { closeForm, encounterData, data, callBack, setMessage } = props;
  const { classes, inputChange } = props;
  const { height, width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);

  const [formData, setFormData] = useState({
    DiagnosesName: "",
    StartDate: "",
    OnsetYear: "",
    Status: "",
    AddedByDr: "",
    Sequence: "",
    file: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleDiagnosesForm = () => {
    setOpenDiagnosesForm(true);
  };

  const submitForm = () => {
    alert("Data Submit");
    console.log("formData", formData);
  };

  const handleFormSubmit = async () => {
    try {
      const postData = {
        resourceType: "Condition",
        Status: "active",
        clinicalStatus: {
          coding: [
            {
              display: formData.Status,
            },
          ],
        },
        code: {
          coding: [
            {
              display: formData.DiagnosesName,
            },
          ],
        },
        subject: {
          reference: "Patient/39254",
        },
        onsetDateTime: selectedDate,
        recorder: {
          reference: formData.AddedByDr,
        },
      };
      console.log("postData:", postData);

      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/Condition?_lastUpdated=gt2024-05-16",
        postData
      );

      console.log("postData:", postData);
      console.log("API Response:", response.data);

      alert("Data submitted successfully!");
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
          height: height - 176,
          maxHeight: height - 176,
          overflow: "auto",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Enter diagnosis name"
              placeholder="Pneumonia"
              value={formData.DiagnosesName}
              onChange={handleChange("DiagnosesName")}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Added Reference"
              placeholder="Added Reference"
              value={formData.AddedByDr}
              onChange={handleChange("AddedByDr")}
            />
          </Grid>
          <Grid item sm={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                label="Start Date"
                format="DD/MM/YYYY"
                placeholder="10/10/2018"
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling={false}
                style={{ width: "100%" }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Sequence"
              placeholder="testing data"
              value={formData.Sequence}
              onChange={handleChange("Sequence")}
            />
          </Grid>
          <Grid item sm={6}>
            <Button
              variant="contained"
              component="label"
              size="large"
              style={{ marginTop: 15, width: "100%" }}
            >
              Attach Report
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className={css.buttonArea}>
        <Button type="button">Discard</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFormSubmit}
        >
          Save&nbsp;
          <Send />
        </Button>
      </div>
    </Box>
  );
}

export default AddDiagnosisForm;
