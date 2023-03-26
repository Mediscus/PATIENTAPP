import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../PatientEncounter-jss";
import {
  Typography,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "dan-components";
import withStyles from '@mui/styles/withStyles';
import moment from "moment";
import { useParams } from "react-router-dom";
import apiCall from "dan-redux/apiInterface";

function FollowUpForm(props) {
  const patient = useParams();
  const { encounterData, callBackfollowUpData } = props;
  const [apiData, setApiData] = useState({});

  const getFollowUpApi = async () => {
    await apiCall('ehr/follow-up', "get", { encounterRef: encounterData.appointment_id })
      .then((res) => {
        if (res && res.Data && res.Status === "Success") {
          let data = res.Data;
          setApiData(data);
        }
      })
      .catch((Error) => {
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
      });
  };

  useEffect(() => {
    getFollowUpApi();
  }, []);

  const getFollowupDate = () => {
    var nextDate = new Date();
    var daysAdd = formData.interval_days;
    var result = nextDate.setDate(nextDate.getDate() + daysAdd);
    return moment(result).format('YYYY-MM-DD');
  }

  const [formData, setFormData] = useState({
    patient_ref: patient && patient.patientRef,
    encounter_ref: encounterData.appointment_id,
    regular: 'No',
    follow_up_date: new Date(),
    interval_days: 7,
    instruction: "",
  });

  useEffect(() => {
    setFormData({ ...formData, follow_up_date: getFollowupDate() });
  }, [formData.interval_days]);

  useEffect(() => {
    callBackfollowUpData(formData)
  }, [formData]);

  const handleChange = (event) => {
    if (event.target.checked) {
      setFormData({ ...formData, regular: 'Yes' })
    } else {
      setFormData({ ...formData, regular: 'No' })
    }
  };

  const handleFormChange = (name) => (event) => {
    if (name == 'interval_days' && event.target.value < 1) {
      setFormData({ ...formData, ['interval_days']: 1, });
    } else {
      setFormData({ ...formData, [name]: event.target.value, });
    }
  };

  const handleChangeDate = (value) => {
    setFormData({ ...formData, follow_up_date: value });
    let startDate = moment(value).format('YYYY-MM-DD')
    let endDate = moment(new Date()).format('YYYY-MM-DD')
    let gapDays = moment(startDate).diff(moment(endDate), 'days');
    if (gapDays < 2) {
      gapDays = 1;
    }
    setFormData({ ...formData, interval_days: gapDays });
  }

  return (
    <Grid
      container
      spacing={2}
      style={{
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sm={3}>
        <Typography variant="body2">Select fullow up after: </Typography>
      </Grid>

      <Grid container xs={12} sm={9} sx={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.regular === 'Yes' ? true : false}
                value={formData.regular}
                color="secondary"
                onChange={(e) => handleChange(e)}
              />
            }
            label="Set regular Follow up interval"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Days"
            type="number"
            value={formData.interval_days}
            onChange={handleFormChange("interval_days")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Days</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DatePicker
            inputFormat="YYYY-MM-DD"
            value={formData.follow_up_date}
            onChange={handleChangeDate}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                name="follow_up_date"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Typography variant="body2">Followup message :</Typography>
      </Grid>

      <Grid item xs={12} sm={9}>
        <TextField
          fullWidth
          variant="standard"
          label="Message"
          placeholder="Message"
          type="text"
          multiline
          value={formData.instruction}
          onChange={handleFormChange("instruction")}
        />
      </Grid>
    </Grid>
  );
}

FollowUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FollowUpForm);
