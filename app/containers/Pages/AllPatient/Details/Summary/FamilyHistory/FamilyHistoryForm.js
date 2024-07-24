import React, { useState, useEffect } from "react";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField, DatePicker } from "dan-components";
import { TextField as MuiTextField } from "@mui/material";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { gender } from "./../../../../../../api/dummy/DropdownData";

function AddFamilyHistory(props) {
  const { open, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const { patientRef } = useParams();

  const [formData, setFormData] = useState({
    familyRef: "",
    relationship: "",
    gender: "",
    bornDate: "",
    deceasedBoolean: "",
    decease: "",
    onsetAge: "",
  });

  5;

  const handleAutocompleteChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    const date = moment(value).format("YYYY-MM-DD");
    setFormData((prevState) => ({ ...prevState, [name]: date }));
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
        resourceType: "FamilyMemberHistory",
        relationship: {
          coding: [
            {
              display: formData.relationship,
            },
          ],
          text: formData.relationship,
        },
        gender: {
          text: formData.gender,
        },
        onsetAge: {
          value: formData.onsetAge,
        },
        bornDate: formData.bornDate,
        deceasedBoolean: formData.deceasedBoolean === "true",
        condition: [
          {
            code: {
              coding: [
                {
                  display: formData.decease,
                },
              ],
            },
          },
        ],
      };

      console.log("postData:", postData);
      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/FamilyMemberHistory",
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
      title="Family History"
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
                name="relationship"
                label="relationship"
                placeholder="relationship"
                value={formData.relationship}
                onChange={handleChange("relationship")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="gender"
                label="Gender"
                placeholder="gender"
                value={formData.gender}
                onChange={handleChange("gender")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="deceasedBoolean"
                label="deceasedBoolean"
                placeholder="deceasedBoolean"
                value={formData.deceasedBoolean}
                onChange={handleChange("deceasedBoolean")}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="date"
                name="bornDate"
                label="bornDate"
                placeholder="Enter Born Date"
                value={formData.bornDate}
                onChange={handleChange("bornDate")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="number"
                name="onsetAge"
                label="onsetAge"
                placeholder="Enter onsetAge"
                value={formData.onsetAge}
                onChange={handleChange("onsetAge")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="decease"
                label="decease"
                placeholder="decease"
                value={formData.decease}
                onChange={handleChange("decease")}
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

export default AddFamilyHistory;
