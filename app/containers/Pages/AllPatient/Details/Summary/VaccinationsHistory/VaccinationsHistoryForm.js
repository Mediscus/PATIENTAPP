import React, { useState } from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import axios from "axios";

function VaccinationsHistoryForm(props) {
  const { open, closeForm, setMessage } = props;
  const { patientRef } = useParams();
  const { height } = useWindowDimensions();

  const [formData, setFormData] = useState({
    vaccineCode: "",
    vaccineName: "",
    occurrenceDateTime: "",
    patient: "",
    encounter: "",
  });
  const formatDateTime = (datetime) => {
    const date = new Date(datetime)
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-";
    const pad = (num) => (num < 10 ? "0" + num : num);

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      sign +
      pad(Math.floor(Math.abs(offset) / 60)) +
      ":" +
      pad(Math.abs(offset) % 60)
    );
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const postData = {
        resourceType: "Immunization",
        vaccineCode: {
          coding: [
            {
              code: formData.vaccineCode,
            },
          ],
        },
        text: formData.vaccineName,
        patient: {
          reference: "Patient/49006",
        },
        encounter: {
          reference: "Encounter/49229",
        },
        occurrenceDateTime: formatDateTime(formData.occurrenceDateTime),
      };

      console.log("postData:", postData);

      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/Immunization",
        postData
      );

      console.log("API Response:", response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Vaccinations History"
      extraSize={false}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          className={css.bodyForm}
          style={{
            height: height - 140,
            maxHeight: height - 140,
            overflow: "auto",
            padding: "8px",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="vaccineCode"
                label="Vaccine Code"
                placeholder="Enter Vaccine Code"
                value={formData.vaccineCode}
                onChange={handleChange("vaccineCode")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="vaccineName"
                label="Vaccine Name"
                placeholder="Enter Vaccine Name"
                value={formData.vaccineName}
                onChange={handleChange("vaccineName")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="datetime-local"
                name="occurrenceDateTime"
                label="Occurrence DateTime"
                value={formData.occurrenceDateTime}
                onChange={handleChange("occurrenceDateTime")}
              />
            </Grid>
          </Grid>
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={closeForm}>
            Discard
          </Button>
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
    </FloatingPanel>
  );
}

VaccinationsHistoryForm.propTypes = {
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default VaccinationsHistoryForm;
