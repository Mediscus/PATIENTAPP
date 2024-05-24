import React, { useState, useEffect } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import axios from "axios";
import { useParams } from "react-router-dom";

function AllergiesForm(props) {
  const { open, closeForm, data, type, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const { patientRef } = useParams();

  const [formData, setFormData] = useState({
    verificationStatus: "",
    type: "",
    manifestation: "",
    onsetPeriod: "",
    patient: patientRef || "",
    reaction: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        verificationStatus: data.verificationStatus || "",
        type: data.type || "",
        manifestation: data.manifestation || "",
        onsetPeriod: data.onsetPeriod || "",
        patient: data.patient || patientRef || "",
        reaction: data.reaction || "",
      });
    }
  }, [data, patientRef]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const postData = {
        resourceType: "AllergyIntolerance",
        verificationStatus: {
          coding: [
            {
              system:
                "http://hl7.org/fhir/ValueSet/allergyintolerance-verification",
              code: "confirmed",
              display: formData.verificationStatus,
            },
          ],
          text: formData.verificationStatus,
        },
        type: formData.type,
        code: {
          coding: [
            {
              system: "2.16.840.1.113883.6.96",
              code: "419511003",
              display: formData.manifestation,
            },
          ],
        },
        patient: {
          reference: `Patient/${formData.patient}`,
        },
        onsetPeriod: {
          start: formData.onsetPeriod,
        },
        reaction: [
          {
            substance: {
              coding: [
                {
                  system: "2.16.840.1.113883.6.88",
                  code: "81953",
                  display: formData.reaction,
                },
              ],
            },
            manifestation: [
              {
                coding: [
                  {
                    system: "2.16.840.1.113883.6.96",
                    code: "247472004",
                    display: formData.manifestation,
                  },
                ],
              },
            ],
          },
        ],
      };

      console.log("postData:", postData);

      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/AllergyIntolerance",
        postData
      );

      console.log("API Response:", response.data);
      setMessage("Allergy added successfully.");
      closeForm();
      if (callBack) callBack();
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title={type === "edit" ? "Edit Allergy" : "Add Allergy"}
      extraSize={false}
    >
      <form onSubmit={handleFormSubmit}>
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
                <TextField
                  fullWidth
                  id="verificationStatus"
                  label="Verification Status"
                  name="verificationStatus"
                  value={formData.verificationStatus}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="type"
                  label="Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="manifestation"
                  label="Manifestation"
                  name="manifestation"
                  value={formData.manifestation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="onsetPeriod"
                  label="Onset Period"
                  name="onsetPeriod"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.onsetPeriod}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="patient"
                  label="Patient"
                  name="patient"
                  value={formData.patient}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="reaction"
                  label="Reaction"
                  name="reaction"
                  value={formData.reaction}
                  onChange={handleChange}
                />
              </Grid>
              {/* Add more fields here if needed */}
            </Grid>
          </div>
          <div className={css.buttonArea}>
            <Button type="button" onClick={closeForm}>
              Discard
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Save&nbsp;
              <Send />
            </Button>
          </div>
        </Box>
      </form>
    </FloatingPanel>
  );
}

export default AllergiesForm;
