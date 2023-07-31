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
// import { personalHistorySchema } from "dan-api/schema";
import { useParams } from "react-router-dom";

function AddObservationGeneralAssessment(props) {
  const patient = useParams();
  const { open, closeForm, data, callBack, setMessage } = props;
  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();

  useEffect(() => {
    setEditData(data);
  }, []);

  const postPersonalHistory = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    try {
      const res = await apiCall(
        "http://localhost:8000/fhir/observation/create_observation_lifestyle/",
        "post",
        values
      );
      //   if (res && res.Status === "Success") {
      setMessage("success", "Data saved Successfully!");
      setStatus({ success: true });
      callBack(true);
      //   }
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
        initialValues={{
          resourceType: "",
          id: "1",
          meta: {
            profile: [""],
          },
          text: {
            status: "",
            div: "",
          },
          status: "",
          code: {
            coding: [
              {
                system: "",
                code: "",
                display: "",
              },
            ],
            text: "",
          },
          subject: {
            reference: "",
          },
          performer: [
            {
              reference: "",
            },
          ],
          valueQuantity: {
            value: "",
            unit: "",
            system: "",
            code: "",
          },
        }}
        enableReinitialize={true}
        // validationSchema={personalHistorySchema}
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
                    <TextField
                      fullWidth
                      type="text"
                      name="status"
                      label="Status"
                      placeholder="Enter status"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="smokingStatus"
                      label="Smoking status"
                      placeholder="Enter smoking status"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="date"
                      name="smokingSince"
                      // label="Smoking since"
                      placeholder="Enter smoking since"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="smokingQuantity"
                      label="Smoking quantity"
                      placeholder="Enter smoking quantity"
                    />
                  </Grid>

                  {/* "put here" */}
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