import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel } from "dan-components";
import { MenstrualCycle } from "dan-components";

import {
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
} from "@mui/material";
import MomentUtils from "@date-io/moment";
import Send from "@mui/icons-material/Send";
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { YesNo } from "dan-api/dummy/commomDropdownData";

function ReproductiveHistoryForm(props) {
  const { open, closeForm } = props;
  const { height } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [menstrually, setMenstrually] = useState("Yes");

  const [formData, setFormData] = useState({
    CycleLength: "",
    PeriodLength: "",
    OvulationDay: "",
    ConceptionPregnancy: "",
    Abortion: "",
    TotalChild: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const submitForm = () => {
    alert("Data Submit");
  };

  const handleMenstruallyActiveChange = (event) => {
    setMenstrually(event.target.value);
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      branch="HELLO"
      title="Reproductive"
      extraSize={false}
    >
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
            padding: "8px !important",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={12}>
              <LocalizationProvider utils={MomentUtils}>
                <DatePicker
                  label="Your First Menses (Menarch)"
                  format="DD/MM/YYYY"
                  placeholder="10/10/2018"
                  value={selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling={false}
                  style={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={menstrually == "No" ? 6 : 12}>
              <TextField
                select
                fullWidth
                label="Are you menstrually active?"
                placeholder="Are you menstrually active?"
                value={menstrually}
                onChange={handleMenstruallyActiveChange}
              >
                {YesNo.map((option, ind) => (
                  <MenuItem key={ind} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              {menstrually == "No" && (
                <LocalizationProvider utils={MomentUtils}>
                  <DatePicker
                    label="Your First Menses (Menarch)"
                    format="DD/MM/YYYY"
                    placeholder="10/10/2018"
                    value={selectedDate}
                    onChange={handleDateChange}
                    animateYearScrolling={false}
                    style={{ width: "100%" }}
                  />
                </LocalizationProvider>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                select
                fullWidth
                label="Are you menstrually active?"
                placeholder="Are you menstrually active?"
              // value={menstrually}
              // onChange={handleMenstruallyActiveChange}
              >
                {["Regular", "Inregular"].map((option, ind) => (
                  <MenuItem key={ind} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cycle Length"
                placeholder="Cycle Length"
                value={formData.CycleLength}
                onChange={handleChange("CycleLength")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Day(s)</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Period Length"
                placeholder="Period Length"
                value={formData.PeriodLength}
                onChange={handleChange("PeriodLength")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Day(s)</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="If there is excessive bleeding?"
                placeholder="Select excessive bleeding"
              >
                {YesNo.map((option, ind) => (
                  <MenuItem key={ind} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Inter Period spoting?"
                placeholder="Select Period spoting"
              >
                {YesNo.map((option, ind) => (
                  <MenuItem key={ind} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                select
                fullWidth
                label="Is there any Abnormal Discharge?"
                placeholder="Select Abnormal Discharge"
              >
                {YesNo.map((option, ind) => (
                  <MenuItem key={ind} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your ovulation day"
                placeholder="Enter ovulation day"
                value={formData.OvulationDay}
                onChange={handleChange("OvulationDay")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Day(s)</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Married Status"
                placeholder="Select Married Status"
              >
                {["Married", "Unmarried"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Are you Sexually active?"
                placeholder="Select Sexually active"
              >
                {YesNo.map((option, ind) => (
                  <MenuItem key={ind} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Are you planning pregnancy?"
                placeholder="Select planning pregnancy"
              >
                {YesNo.map((option, ind) => (
                  <MenuItem key={ind} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Number of conception of pregnancy"
                placeholder="Enter Number"
                value={formData.ConceptionPregnancy}
                onChange={handleChange("ConceptionPregnancy")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Abortions"
                placeholder="Enter Number"
                value={formData.Abortion}
                onChange={handleChange("Abortion")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of live births"
                placeholder="Enter Number"
                value={formData.TotalChild}
                onChange={handleChange("TotalChild")}
              />
            </Grid>
          </Grid>
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={closeForm}>
            Discard
          </Button>
          <Button variant="contained" color="secondary" onClick={submitForm}>
            Save&nbsp;
            <Send />
          </Button>
        </div>
      </Box>
    </FloatingPanel>
  );
}

// ReproductiveHistoryForm.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default ReproductiveHistoryForm;
