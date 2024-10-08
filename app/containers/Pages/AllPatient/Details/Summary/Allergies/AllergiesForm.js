import React, { useState, useEffect } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import { Box, Button, Grid, CircularProgress, Snackbar } from "@mui/material";
import Send from "@mui/icons-material/Send";
import axios from "axios";
import { useParams } from "react-router-dom";

function AllergiesForm(props) {
  const { open, closeForm, data, type, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const { patientRef } = useParams();

  const [formData, setFormData] = useState({
    clinicalStatus: "",
    verificationStatus: "",
    onsetDate: "",
    allergyName: "",
    reaction: "",
    remark: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const postData = {
        resourceType: "AllergyIntolerance",
        clinicalStatus: {
          coding: [
            {
              display: formData.clinicalStatus,
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              display: formData.verificationStatus,
            },
          ],
        },
        code: {
          coding: [
            {
              display: formData.allergyName,
            },
          ],
        },
        patient: {
          reference: "Patient/593372",
        },
        recordedDate: formData.onsetDate,
        recorder: {
          reference: "Practitioner/1895",
        },
        reaction: [
          {
            substance: {
              coding: [
                {
                  display: formData.reaction,
                },
              ],
            },
          },
        ],
        note: [
          {
            text: formData.remark,
          },
        ],
      };

      console.log("postData:", postData);

      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/AllergyIntolerance",
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
      title="Allergy"
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
                name="clinicalStatus"
                label="clinicalStatus"
                placeholder="clinicalStatus"
                value={formData.clinicalStatus}
                onChange={handleChange("clinicalStatus")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="verificationStatus"
                label="verificationStatus"
                placeholder="verificationStatus"
                value={formData.verificationStatus}
                onChange={handleChange("verificationStatus")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="allergyName"
                label="name of allergy"
                placeholder="Enter name of allergy"
                value={formData.namesAssessment}
                onChange={handleChange("allergyName")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="reaction"
                label="name of reaction"
                placeholder="Enter name reaction"
                value={formData.namesAssessment}
                onChange={handleChange("reaction")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="date"
                name="onsetDate"
                label="onsetDate"
                placeholder="Enter onsetDate"
                value={formData.effectiveDateTime}
                onChange={handleChange("onsetDate")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="remark"
                label="remark"
                placeholder="Remark"
                value={formData.remark}
                onChange={handleChange("remark")}
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

export default AllergiesForm;
