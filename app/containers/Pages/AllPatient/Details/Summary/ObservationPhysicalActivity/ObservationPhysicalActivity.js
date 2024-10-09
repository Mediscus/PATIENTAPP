import React from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import { Box, Button, Grid, TextField } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { Field, Formik } from "formik";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel } from "dan-components";

function ObservationPhysicalActivity(props) {
  const { open, closeForm } = props;
  const { height } = useWindowDimensions();

  const initialValues = {
    activityType: "",
    dailyCaloriesBurned: "",
    dailyStepCounts: "",
    sleepDuration: "",
    nightShifts: "",
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
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Submitted Data:", values); // Display form data in console
          setSubmitting(false);
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
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={12}>
                    <Field name="activityType">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="text"
                          label="Activity Type"
                          placeholder="Activity Type"
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field name="dailyCaloriesBurned">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="text"
                          label="Daily Calories Burned"
                          placeholder="Daily Calories Burned"
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field name="dailyStepCounts">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="text"
                          label="Daily Step Counts"
                          placeholder="Daily Step Counts"
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field name="sleepDuration">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="text"
                          label="Sleep Duration"
                          placeholder="Sleep Duration"
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field name="nightShifts">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="text"
                          label="Night Shifts"
                          placeholder="Night Shifts"
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

ObservationPhysicalActivity.propTypes = {
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default ObservationPhysicalActivity;
