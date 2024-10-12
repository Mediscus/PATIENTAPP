import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../PatientEncounter-jss";
import {
  Typography,
  TextField,
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import apiCall from "dan-redux/apiInterface";

function ReferalForm(props) {
  const patient = useParams();
  const { classes, encounterData, callBackReferalData } = props;
  const [apiData, setApiData] = useState({});

  const getReferalApi = async () => {
    await apiCall("ehr/referral", "get", {
      encounterRef: encounterData ? encounterData.appointment_id : "",
    })
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
    getReferalApi();
  }, []);

  const [formData, setFormData] = useState({
    patient_ref: patient && patient.patientRef,
    encounter_ref: encounterData ? encounterData.appointment_id : "",
    doctor_name: "",
    specialty: "",
    comment: "",
    priority: "Regular",
  });

  useEffect(() => {
    callBackReferalData(formData);
  }, [formData]);

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      direction="row"
    >
      <Grid item xs={12} sm={3}>
        <Typography variant="body2">Enter Doctor Name:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={["Dr. AJit", "Dr. Manoj"]}
          value={formData.doctor_name || ""}
          onChange={(event, value) => {
            setFormData({ ...formData, doctor_name: value });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Enter Doctor Name"
              placeholder="Enter Doctor Name"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={["Lever", "Heart"]}
          value={formData.specialty || ""}
          onChange={(event, value) => {
            setFormData({ ...formData, specialty: value });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Specialities"
              placeholder="Specialities"
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <Typography variant="body2">Comment :</Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <TextField
          fullWidth
          variant="standard"
          label="Comment"
          placeholder="Comment"
          type="text"
          multiline
          maxRows={5}
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Typography variant="body2">Prioroty Type :</Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <RadioGroup
            aria-label="gender"
            name="gender1"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <FormControlLabel
              value="Urgent"
              control={<Radio />}
              label="Urgent"
            />
            <FormControlLabel
              value="Regular"
              control={<Radio />}
              label="Regular"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}

ReferalForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReferalForm);
