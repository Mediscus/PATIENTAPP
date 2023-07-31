import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import apiCall from "dan-redux/apiInterface";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { Label } from "@mui/icons-material";

function AddObservationGeneralAssessment(props) {
  const patient = useParams();
  const { open, closeForm, data, callBack, setMessage } = props;

  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();
  const [dynamicValue, setDynamicValue] = useState("");

  useEffect(() => {
    setEditData(data);
  }, []);

  // const Generalwellbeingurl = "http://localhost:3000/api/search?query=General wellbeing"

  // const MentalStatusurl = "http://localhost:3000/api/search?query=General wellbeing"

  // Set the initial values dynamically
  const initialFormValues = {
    // resourceType: "Observation",
    // id: "11",
    // meta: {
    //   profile: [
    //     "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ObservationGeneralAssessment",
    //   ],
    // },
    // text: {
    //   status: "generated",
    //   div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Narrative with Details</b></p><p><b>id</b>: example-11</p><p><b>status</b>: final</p><p><b>code</b>: Body fat [Mass] Calculated <span>(Details : LOINC code '73708-0' = 'Body fat [Mass] Calculated', given as 'Body fat [Mass] Calculated')</span></p><p><b>subject</b>: ABC</p><p><b>performer</b>: Dr. DEF, MD</p><p><b>value</b>: 11 kg<span> (Details: UCUM code kg = 'kg')</span></p></div>",
    // },
    // status: "final",
    // code: {
    //   coding: [
    //     {
    //       system: "http://loinc.org",
    //       code: "73708-0",
    //       display: "Body fat [Mass] Calculated",
    //     },
    //   ],
    //   text: "Body fat [Mass] Calculated",
    // },
    // subject: {
    //   reference: "Patient/example-01",
    // },
    // performer: [
    //   {
    //     reference: "Practitioner/example-01",
    //   },
    // ],
    // valueQuantity: {
    //   value: dynamicValue, // Use the dynamicValue state here
    //   unit: "kg",
    //   system: "http://unitsofmeasure.org",
    //   code: "kg",
    // },
  };

  const postPersonalHistory = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    try {
      const res = await apiCall(
        "http://localhost:8000/fhir/observation/create_observation_physical_activity/",
        "post",
        values
      );
      setMessage("success", "Data saved Successfully!");
      setStatus({ success: true });
      callBack(true);
    } catch (error) {
      console.log("Error:", error);
      let errorMessage = error.message;
      if (
        error.response &&
        error.response.data &&
        error.response.data.ErrorMessage
      ) {
        errorMessage = error.response.data.ErrorMessage;
      }
      setMessage("error", errorMessage);
    } finally {
      setSubmitting(false);
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
      <Formik
        initialValues={initialFormValues}
        enableReinitialize={true}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          postPersonalHistory(values, setErrors, setStatus, setSubmitting);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          setTextField,
          values,
        }) => (
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
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={12}>
                    <label>General wellbeing</label>

                    <TextField
                      fullWidth
                      type="text"
                      name="General wellbeing"
                      placeholder="Enter status"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <label>Mental status</label>

                    <TextField
                      fullWidth
                      type="text"
                      name="Mental status"
                      placeholder="Enter Mental status"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="setDynamicValue"
                      label="Value"
                      placeholder="Enter value"
                      value={dynamicValue} // Set the value to dynamicValue
                      onChange={(e) => setDynamicValue(e.target.value)} // Update dynamicValue when the input changes
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
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save&nbsp;
                  <Send style={{ marginLeft: 10 }} />
                </Button>
              </div>
            </Box>
          </form>
        )}
      </Formik>
    </FloatingPanel>
  );
}

export default AddObservationGeneralAssessment;
