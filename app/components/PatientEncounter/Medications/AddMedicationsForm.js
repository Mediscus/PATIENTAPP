import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import Send from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import {  TextField } from "dan-components";
import {
  Box,
  Button,
  Grid,
  Radio,
  Route,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TableContainer,
  Table,
} from "@mui/material";
import MenuItem from "@mui/material";
import { useDispatch } from "react-redux";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
function AddMedicationsForm(props) {
  const patient = useParams();
  const { closeForm, encounterData, data, callBack, setMessage } = props;
  const { classes, inputChange } = props;
  const { height, width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [value, setValue] = useState("d");

  const [formData, setFormData] = useState({
    DiagnosesName: "",
    StartDate: "",
    OnsetYear: "",
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

  const handleRouteChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleDiagnosesForm = () => {
    setOpenDiagnosesForm(true);
  };
  const handleChangeR = (event) => {
    setValue(event.target.value);
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
        "https://hapi.fhir.org/baseR4/Condition?_lastUpdated=gt2024-07-02",
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
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Brand Name"
              placeholder="Dolo 650"
              value={formData.BrandName}
              onChange={handleChange("BrandName")}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              select
              fullWidth
              label="Form"
              placeholder="Form"
              value={formData.Form}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              select
              fullWidth
              label="Route"
              placeholder="Route"
              value={formData.Route}
              onChange={handleChange("Route")}
            />
          </Grid>
          <Grid item sm={12} xs={6}>
            <TextField
              fullWidth
              label="Period"
              placeholder="Period"
              value={formData.period}
              onChange={handleChange("period")}
            />
          </Grid>
          <Grid item sm={12}>
            <FormControl>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                component="fieldset"
              >
                Period Unit
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChangeR}
                row
              >
                <FormControlLabel
                  value="h"
                  control={<Radio />}
                  label="Hours"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="d"
                  control={<Radio />}
                  label="Days"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="wk"
                  control={<Radio />}
                  label="Weeks"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="mo"
                  control={<Radio />}
                  label="Months"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="a"
                  control={<Radio />}
                  label="Year"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
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

export default AddMedicationsForm;
