import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { FloatingPanel } from "dan-components";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import axios from "axios";

function AddObservationGeneralAssessment(props) {
  const { open, closeForm, data, callBack, setMessage } = props;
  const [editData, setEditData] = useState(data);
  const { height } = useWindowDimensions();

  const [formData, setFormData] = useState({
    smokingStatus: "",
    smokingSince: "",
    smokingQuantity: "",
    effectiveDateTime: "",
    valueCodeableConcept: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const postData = {
        resourceType: "Observation",
        status: formData.smokingStatus,
        code: {
          text: formData.smokingSince,
        },
        subject: {
          reference: "Patient/593372",
        },
        effectiveDateTime: formData.effectiveDateTime,
        performer: [
          {
            reference: "Organization/44787710",
          },
        ],
        valueCodeableConcept: {
          coding: [
            {
              display: formData.valueCodeableConcept,
            },
          ],
          text: formData.valueCodeableConcept,
        },
      };

      console.log("postData:", postData);

      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/Observation",
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
      branch="HELLO"
      title="Personal History"
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
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="smokingSince"
                label="smokingSince"
                placeholder="Enter smokingSince"
                value={formData.smokingSince}
                onChange={handleChange("smokingSince")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="valueCodeableConcept"
                label="valueCodeableConcept"
                placeholder="Enter valueCodeableConcept"
                value={formData.valueCodeableConcept}
                onChange={handleChange("valueCodeableConcept")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="date"
                name="effectiveDateTime"
                label="effectiveDateTime"
                placeholder="Enter    effectiveDateTime"
                value={formData.effectiveDateTime}
                onChange={handleChange("    effectiveDateTime")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="number"
                name="smokingQuantity"
                label="Smoking quantity"
                placeholder="Enter smoking quantity"
                value={formData.smokingQuantity}
                onChange={handleChange("smokingQuantity")}
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

export default AddObservationGeneralAssessment;
