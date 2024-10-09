import React from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import { Box, Button, Grid, TextField, InputAdornment } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { Field, Formik } from "formik";
import { useParams } from "react-router-dom";
import { FloatingPanel } from "dan-components";

function AddObservationGeneralAssessment(props) {
  const { open, closeForm } = props;
  const { height } = useParams(); // Assuming height is dynamically derived elsewhere

  const initialValues = {
    bodyFat: "",
    calorieIntake: "",
    fluidIntake: "",
    glucoseLevel: "",
    metabolicRate: "",
    wellBeingFinding: "",
    ekgPanel: "",
    oxygenConsumptionPeak: "",
  };

  const handleSubmit = (values) => {
    const result = {
      bodyFat: `${values.bodyFat} kg`,
      calorieIntake: `${values.calorieIntake} kcal`,
      fluidIntake: `${values.fluidIntake} L`,
      glucoseLevel: `${values.glucoseLevel} mg/dL`,
      metabolicRate: `${values.metabolicRate} kcal/day`,
      wellBeingFinding: values.wellBeingFinding,
      ekgPanel: values.ekgPanel,
      oxygenConsumptionPeak: `${values.oxygenConsumptionPeak} L/min`,
    };
    console.log("Form Submitted :", result);
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      branch="HELLO"
      title="General Assessment"
      extraSize={false}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Field name="bodyFat">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label={
                            <>
                              Enter Body Fat
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          placeholder="Enter Body Fat"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">kg</InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field name="calorieIntake">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label={
                            <>
                              Enter Calorie Intake Total
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          placeholder="Enter Calorie Intake Total"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                kcal
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field name="fluidIntake">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label={
                            <>
                              Enter Fluid Intake
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          placeholder="Enter Fluid Intake"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                Litres
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field name="glucoseLevel">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label={
                            <>
                              Enter Glucose Level
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          placeholder="Enter Glucose Level"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                mg/dL
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field name="metabolicRate">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label={
                            <>
                              Enter Metabolic Rate
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          placeholder="Enter Metabolic Rate"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                kcal/day
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field name="oxygenConsumptionPeak">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label={
                            <>
                              Enter Oxygen Consumption Peak
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          placeholder="Enter Oxygen Consumption Peak"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                L/min
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field name="ekgPanel">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="text"
                          label={
                            <>
                              Enter EKG Panel Results
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          placeholder="Enter EKG Panel Results"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field name="wellBeingFinding">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="text"
                          label={
                            <>
                              Enter General Well-being Finding
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          placeholder="Enter General Well-being Finding"
                        />
                      )}
                    </Field>
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

AddObservationGeneralAssessment.propTypes = {
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default AddObservationGeneralAssessment;
