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

function AddFamilyHistory(props) {
  const { open, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const { patientRef } = useParams();

  const [formData, setFormData] = useState({
    patientRef: patientRef || "",
    familyRef: "",
    relationship: "",
    sex: "",
    bornDate: "",
    deceasedBoolean: "",
    condition: "",
    onsetAge: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        patientRef: data.patientRef || "",
        familyRef: data.familyRef || "",
        relationship: data.relationship || "",
        sex: data.sex || "",
        bornDate: data.bornDate
          ? moment(data.bornDate).format("YYYY-MM-DD")
          : "",
        deceasedBoolean: data.deceasedBoolean || "",
        condition: data.condition || "",
        onsetAge: data.onsetAge || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAutocompleteChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    const date = moment(value).format("YYYY-MM-DD");
    setFormData((prevState) => ({ ...prevState, [name]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        resourceType: "FamilyMemberHistory",
        status: "completed",
        relationship: {
          coding: [
            {
              display: formData.relationship,
            },
          ],
          text: formData.relationship,
        },
        sex: {
          text: formData.sex,
        },
        bornDate: formData.bornDate,
        deceasedBoolean: formData.deceasedBoolean === "true",
        condition: [
          {
            code: {
              coding: [
                {
                  display: formData.condition,
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
      setMessage("Family history added successfully.");
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
      title="Family History"
      extraSize={false}
    >
      <form onSubmit={handleSubmit}>
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
                <Autocomplete
                  name="relationship"
                  options={[
                    "Father",
                    "Mother",
                    "Brother",
                    "Sister",
                    "Grand Father",
                    "Grand Mother",
                    "Spouse",
                  ]}
                  value={formData.relationship}
                  onChange={(event, value) =>
                    handleAutocompleteChange("relationship", value)
                  }
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      variant="standard"
                      label="Relationship"
                      placeholder="Select Relationship"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="sex"
                  label="Gender"
                  placeholder="Enter Gender"
                  value={formData.sex}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="deceasedBoolean"
                  label="Deceased"
                  placeholder="Enter Deceased Status"
                  value={formData.deceasedBoolean}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="condition"
                  label="Condition"
                  placeholder="Enter Condition"
                  value={formData.condition}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  inputFormat="YYYY-MM-DD"
                  label="Date Of Birth"
                  value={formData.bornDate}
                  onChange={(value) => handleDateChange("bornDate", value)}
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      fullWidth
                      name="bornDate"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="onsetAge"
                  label="Age"
                  placeholder="Enter Age"
                  value={formData.onsetAge}
                  onChange={handleChange}
                />
              </Grid>
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

export default AddFamilyHistory;
