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
import { TextField as MuiTextField } from "@mui/material";
import { personalHistorySchema } from "dan-api/schema";
import { useParams } from "react-router-dom";

function AddPersonalHistoryForm(props) {
  const patient = useParams();
  const { open, closeForm, data, callBack, setMessage } = props;
  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();

  useEffect(() => {
    setEditData(data);
  }, []);

  const postPesronalHistory = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("ehr/personal-history", "post", values)
      .then((res) => {
        if (res && res.Status === "Success") {
          setMessage("success", "Data saved Successfully!");
          setStatus({ success: true });
          callBack(true);
        }
      })
      .catch((Error) => {
        console.log("Error:", Error);
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        setMessage("error", ErrorMessage);
      });
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
          patientRef: patient && patient.patientRef,
          personalRef: editData ? editData["personal_id"] : "",
          handednessType: editData ? editData["handedness_type"] : "",
          education: editData ? editData["education"] : "",
          occupation: editData ? editData["occupation"] : "",
          marriedStatus: editData ? editData["married_status"] : "",
          diet: editData ? editData["diet"] : "",
          mealPattern: editData ? editData["meal_pattern"] : "",
          averageCalories: editData ? editData["average_calories"] : "",
          weeklyNightShiftWork: editData ? editData["weekly_night_shift"] : "",
          sleepType: editData ? editData["sleep_type"] : "",
          averageBedTime: editData ? editData["average_bed_time"] : "",
          averageWakeUpTime: editData ? editData["average_wake_up_time"] : "",
          bowelFrequency: editData ? editData["bowel_frequency"] : "",
          bladderFrequency: editData ? editData["bladder_frequency"] : "",
          remarks: editData ? editData["remarks"] : "",
        }}
        enableReinitialize={true}
        validationSchema={personalHistorySchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          postPesronalHistory(values, setErrors, setStatus, setSubmitting);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          setFieldValue,
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
                  {/* <Grid item xs={12} sm={12}>
                    <Autocomplete
                      name="handednessType"
                      options={["None", "Right", "Left"]}
                      value={values.handednessType || ''}
                      onChange={(event, newVal) => {
                        setFieldValue("handednessType", newVal);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Handedness Type"
                          placeholder="Select Handedness Type"
                          onBlur={handleBlur}
                          helperText={touched.handednessType ? errors.handednessType : ""}
                          error={touched.handednessType ? errors.handednessType : ""}
                        />
                      )}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      value={values.education || ""}
                      options={[
                        "Doctorate",
                        "Post Graduate",
                        "Graduate",
                        "Below 10th",
                      ].map((option) => option)}
                      onChange={(event, newVal) => {
                        setFieldValue("education", newVal);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Education"
                          placeholder="Select Education"
                          onBlur={handleBlur}
                          helperText={touched.education ? errors.education : ""}
                          error={touched.education ? errors.education : ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      name="occupation"
                      options={[
                        "Designer",
                        "Connstruction worker",
                        "Buisness Analyst",
                        "Artist",
                      ]}
                      value={values.occupation || ""}
                      onChange={(event, newVal) => {
                        setFieldValue("occupation", newVal);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Occupation"
                          placeholder="Select Occupation"
                          value={values.occupation || ""}
                          onChange={handleChange("Occupation")}
                          onBlur={handleBlur}
                          helperText={
                            touched.occupation ? errors.occupation : ""
                          }
                          error={touched.occupation ? errors.occupation : ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      name="marriedStatus"
                      options={["Married", "Unmarried", "Divorced"]}
                      value={values.marriedStatus || ""}
                      onChange={(event, newVal) => {
                        setFieldValue("marriedStatus", newVal);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Married Status"
                          placeholder="Select Married Status"
                          onBlur={handleBlur}
                          helperText={
                            touched.marriedStatus ? errors.marriedStatus : ""
                          }
                          error={
                            touched.marriedStatus ? errors.marriedStatus : ""
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      name="diet"
                      options={[
                        "Non-vegetarian",
                        "Eggeterian",
                        "Vegetarian",
                        "Vegan",
                      ]}
                      value={values.diet || ""}
                      onChange={(event, newVal) => {
                        setFieldValue("diet", newVal);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Diet"
                          placeholder="Select Diet"
                          onBlur={handleBlur}
                          helperText={touched.diet ? errors.diet : ""}
                          error={touched.diet ? errors.diet : ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      name="mealPattern"
                      options={[
                        "Only Dinner",
                        "Only Lunch",
                        "Lunch-Dinner",
                        "Breakfast-Lunch-Dinner",
                      ]}
                      value={values.mealPattern || ""}
                      onChange={(event, newVal) => {
                        setFieldValue("mealPattern", newVal);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="MealPattern"
                          placeholder="Daily average meal pattern"
                          onBlur={handleBlur}
                          helperText={
                            touched.mealPattern ? errors.mealPattern : ""
                          }
                          error={touched.mealPattern ? errors.mealPattern : ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="averageCalories"
                      label="Daily average calories"
                      placeholder="Enter daily average calories"
                      type="text"
                      value={values.averageCalories || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.averageCalories ? errors.averageCalories : ""
                      }
                      error={
                        touched.averageCalories ? errors.averageCalories : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name="weeklyNightShiftWork"
                      label="Night Sifts in a week if any"
                      placeholder="2 days (Tuesday, Thusrday)"
                      value={values.weeklyNightShiftWork || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.weeklyNightShiftWork
                          ? errors.weeklyNightShiftWork
                          : ""
                      }
                      error={
                        touched.weeklyNightShiftWork
                          ? errors.weeklyNightShiftWork
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      name="sleepType"
                      options={[
                        "Biphasic",
                        "Polyphasic",
                        "Monophasic sleep",
                        "Individual’s sleep pattern",
                      ].map((option) => option)}
                      value={values.sleepType || ""}
                      onChange={(event, newVal) => {
                        setFieldValue("sleepType", newVal);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Sleep Type"
                          placeholder="Select Sleep Type"
                          onBlur={handleBlur}
                          helperText={touched.sleepType ? errors.sleepType : ""}
                          error={touched.sleepType ? errors.sleepType : ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="averageBedTime"
                      label="Average bedtime"
                      placeholder="Enter Average bedtime"
                      type="text"
                      value={values.averageBedTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.averageBedTime ? errors.averageBedTime : ""
                      }
                      error={
                        touched.averageBedTime ? errors.averageBedTime : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      name="averageWakeUpTime"
                      label="Average Wakeup Time"
                      placeholder="Enter Average Wakeup Time"
                      value={values.averageWakeUpTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.averageWakeUpTime
                          ? errors.averageWakeUpTime
                          : ""
                      }
                      error={
                        touched.averageWakeUpTime
                          ? errors.averageWakeUpTime
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="bowelFrequency"
                      label="Bowel Frequency"
                      placeholder=" Enter Bowel Frequency"
                      value={values.bowelFrequency}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.bowelFrequency ? errors.bowelFrequency : ""
                      }
                      error={
                        touched.bowelFrequency ? errors.bowelFrequency : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="bladderFrequency"
                      label="Bladder Frequency"
                      placeholder=" Enter Bladder Frequency"
                      value={values.bladderFrequency}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.bladderFrequency ? errors.bladderFrequency : ""
                      }
                      error={
                        touched.bladderFrequency ? errors.bladderFrequency : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      name="remarks"
                      label="Remarks"
                      placeholder="Enter Remarks"
                      type="text"
                      value={values.remarks}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={css.buttonArea}>
                <Button type="button" onClick={closeForm}>
                  Discard
                </Button>
                <Button variant="contained" color="secondary" type="submit">
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

export default AddPersonalHistoryForm;
