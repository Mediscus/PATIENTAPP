import React, { useContext, useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField as MuiTextField,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";
import { DatePicker, TextField, FloatingPanel } from "dan-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { encounterFormSchema } from "dan-api/schema";
import { useDispatch } from "react-redux";
import { addCareContext } from "../../../../../../redux/actions/careContextAction";
import { v4 as uuidv4 } from "uuid";
import styles from "../../../../Pages-jss";
import { withStyles } from "@mui/styles";
import { useDropDownValues } from "../../../../../../components/Common/useDropDownValues";

function AddEncounters(props) {
  const doctorRef = localStorage.getItem("doctorRef");
  const patient = useParams();
  const { classes, open, closeForm, data, type, callBack, setMessage } = props;
  const [editData, setEditData] = useState({
    language: "",
  });
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const languages = useDropDownValues("http://hl7.org/fhir/ValueSet/languages");
  const visitTypes = useDropDownValues(
    "http://terminology.hl7.org/ValueSet/v2-0276"
  );

  useEffect(() => {
    if (type == "edit") {
      setEditData(data);
    } else {
      setEditData({});
    }
  }, []);

  const saveAppointment = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    try {
      // closeForm();
      console.log(values);

      // addCareContext();
    } catch (err) {
      console.log(err);
    }
    // closeForm();
    // console.log(values);
    // dispatch(addCareContext());
    // await apiCall("appointment/save", "post", values)
    //   .then((res) => {
    //     if (res && res.Status === "Success") {
    //       setMessage("success", "Data saved successfully!");
    //       setStatus({ success: true });
    //       callBack(true);
    //     }
    //   })
    //   .catch((Error) => {
    //     let ErrorMessage = Error.ErrorMessage;
    //     if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
    //       ErrorMessage = Error.ErrorMessage.join("\n");
    //     }
    //     setMessage("error", ErrorMessage);
    //   });
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title={"Appointment"}
      extraSize={false}
    >
      <Formik
        initialValues={
          editData
          //   {
          //   appointmentRef: editData ? editData["appointment_id"] : "",
          //   state: editData ? editData["state"] : "",
          //   language: editData ? editData["language"] : {},
          //   hospitalRef: editData ? editData["hospital_ref"] : "",
          //   doctor: editData ? editData["doctor"] : "",
          //   doctorRef: doctorRef,
          //   patientRef: patient && patient.patientRef,
          //   diagnosis: editData ? editData["diagnosis"] : "",
          //   department: editData ? editData["department"] : "",
          //   visitDate: editData
          //     ? moment(editData["app_date"]).format("YYYY-MM-DD")
          //     : moment(new Date()).format("YYYY-MM-DD"),
          //   visitTime: editData ? editData["app_time"] : "",
          //   reason: editData ? editData["reason"] : "",
          //   visitType: editData ? editData["visit_type"] : "",
          //   description: editData ? editData["description"] : "",
          //   appType: editData ? editData["app_type"] : "New",
          //   daysPass: editData ? editData["daysPass"] : "",
          //   queueNo: editData ? editData["queueNo"] : "",
          //   status: editData ? editData["status"] : "",
          // }
        }
        enableReinitialize={true}
        validationSchema={encounterFormSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          saveAppointment(values, setErrors, setStatus, setSubmitting);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
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
                      className={classes.AutoComplete}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      name="language"
                      options={languages}
                      value={values.language || ""}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      onChange={(event, value) => {}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Select Language"
                          placeholder="Select Language"
                          onBlur={handleBlur}
                          helperText={touched.language ? errors.language : ""}
                          error={Boolean(
                            touched.language ? errors.language : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      name="state"
                      options={["Maharashta", "Delhi", "Kerala", "Telangana"]}
                      value={values.state || ""}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      onChange={(event, value) => {}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Select State"
                          placeholder="Select State"
                          onBlur={handleBlur}
                          helperText={touched.state ? errors.state : ""}
                          error={Boolean(touched.state ? errors.state : "")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      name="hospitalRef"
                      options={["Hospital 1", "Hospital 2", "Hospital 3"]}
                      value={values.hospitalRef || ""}
                      onChange={(event, value) => {}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          id="hospitalRef"
                          label="Select Hospital"
                          placeholder="Select Hospital"
                          onBlur={handleBlur}
                          helperText={
                            touched.hospitalRef ? errors.hospitalRef : ""
                          }
                          error={Boolean(
                            touched.hospitalRef ? errors.hospitalRef : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      name="department"
                      options={["General Surgery", "ENT", "Dentistry"]}
                      value={values.department || ""}
                      onChange={(event, value) => {}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="department"
                          label="Department Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.department ? errors.department : ""
                          }
                          error={Boolean(
                            touched.department ? errors.department : ""
                          )}
                        />
                      )}
                    />
                    {/* <TextField
                      fullWidth
                      id="department"
                      label="Department Name"
                      value={values.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.department ? errors.department : ""}
                      error={touched.department ? errors.department : ""}
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      name="doctor"
                      options={["Dr. Abc", "Dr. Xyz"]}
                      value={values.doctor || ""}
                      onChange={(event, value) => {}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="doctor"
                          label="Select Doctor"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.doctor ? errors.doctor : ""}
                          error={Boolean(touched.doctor ? errors.doctor : "")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      name="diagnosis"
                      options={[]}
                      value={values.diagnosis || ""}
                      onChange={(event, value) => {}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="diagnosis"
                          label="Diagnosis Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.diagnosis ? errors.diagnosis : ""}
                          error={Boolean(
                            touched.diagnosis ? errors.diagnosis : ""
                          )}
                        />
                      )}
                    />
                    {/* <TextField
                      fullWidth
                      id="diagnosis"
                      label="Diagnosis Type"
                      value={values.diagnosis}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.diagnosis ? errors.diagnosis : ""}
                      error={touched.diagnosis ? errors.diagnosis : ""}
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="Visit Date"
                      value={values.visitDate}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("visitDate", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField {...params} fullWidth name="visitDate" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        ampm={false}
                        openTo="hours"
                        views={["hours", "minutes", "seconds"]}
                        inputFormat="HH:mm:ss"
                        mask="__:__:__"
                        label="visit Time"
                        value={values.visitTime}
                        onChange={(value) => {
                          const time = new Date(value).toLocaleTimeString(
                            "en-GB"
                          );
                          setFieldValue("visitTime", time, true);
                        }}
                        renderInput={(params) => (
                          <MuiTextField
                            {...params}
                            fullWidth
                            name="visitTime"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="reason"
                      options={[
                        "Anxiety disorder of childhood OR adolescence",
                        "Choroidal hemorrhage",
                        "Spontaneous abortion with laceration of cervix",
                        "Homoiothermia",
                        "Decreased hair growth",
                        "Chronic pharyngitis",
                      ]}
                      value={values.reason || ""}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      onChange={(event, value) => {}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="reason"
                          label="Select Reason of Appointment"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.reason ? errors.reason : ""}
                          error={Boolean(touched.reason ? errors.reason : "")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="visitType"
                      options={visitTypes}
                      value={values.visitType || ""}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      onChange={(event, value) => {}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="visitType"
                          label="Select Visit Type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.visitType ? errors.visitType : ""}
                          error={Boolean(
                            touched.visitType ? errors.visitType : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="description"
                      label="Description"
                      multiline
                      maxRows={5}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.description ? errors.description : ""}
                      error={touched.description ? errors.description : ""}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={css.buttonArea}>
                <Button type="button" onClick={closeForm}>
                  Discard
                </Button>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Save&nbsp;
                  <Send />
                </Button>
              </div>
            </Box>
          </form>
        )}
      </Formik>
    </FloatingPanel>
  );
}

// AllergiesForm.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default withStyles(styles)(AddEncounters);

// export default AddEncounters;
