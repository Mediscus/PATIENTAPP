import React, { useContext, useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { Box, Button, Grid, TextField as MuiTextField } from "@mui/material";
import { Formik } from "formik";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";
import { DatePicker, TextField, FloatingPanel } from "dan-components";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from "moment";
import { encounterFormSchema } from "dan-api/schema";

function AddEncounters(props) {
  const doctorRef = localStorage.getItem('doctorRef');
  const patient = useParams();
  const { open, closeForm, data, type, callBack, setMessage } = props;
  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (type == 'edit') {
      setEditData(data)
    } else {
      setEditData({})
    }
  }, []);

  const saveAppointment = async (values, setErrors, setStatus, setSubmitting) => {
    await apiCall("appointment/save", "post", values)
      .then((res) => {
        if (res && res.Status === "Success") {
          setMessage("success", "Data saved successfully!");
          setStatus({ success: true });
          callBack(true);
        }
      })
      .catch((Error) => {
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
      title={"Appointment"}
      extraSize={false}
    >
      <Formik
        initialValues={{
          appointmentRef: editData ? editData['appointment_id'] : "",
          hospitalRef: editData ? editData['hospital_ref'] : "",
          doctorRef: doctorRef,
          patientRef: patient && patient.patientRef,
          diagnosis: editData ? editData['diagnosis'] : "",
          department: editData ? editData['department'] : "",
          visitDate: editData ? moment(editData['app_date']).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
          visitTime: editData ? editData['app_time'] : '',
          visitType: editData ? editData['visit_type'] : "",
          appType: editData ? editData['app_type'] : "New",
          daysPass: editData ? editData['daysPass'] : "",
          queueNo: editData ? editData['queueNo'] : "",
          status: editData ? editData['status'] : ""
        }}
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
                    <TextField
                      fullWidth
                      id="diagnosis"
                      label="Diagnosis Type"
                      value={values.diagnosis}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.diagnosis ? errors.diagnosis : ""}
                      error={touched.diagnosis ? errors.diagnosis : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="department"
                      label="Department Name"
                      value={values.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.department ? errors.department : ""}
                      error={touched.department ? errors.department : ""}
                    />
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
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="visitDate"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        ampm={false}
                        openTo="hours"
                        views={['hours', 'minutes', 'seconds']}
                        inputFormat="HH:mm:ss"
                        mask="__:__:__"
                        label="visit Time"
                        value={values.visitTime}
                        onChange={(value) => {
                          const time = new Date(value).toLocaleTimeString('en-GB');
                          setFieldValue("visitTime", time, true);
                        }}
                        renderInput={(params) =>
                          <MuiTextField
                            {...params}
                            fullWidth
                            name="visitTime"
                          />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="visitType"
                      label="Visit Type"
                      value={values.visitType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.visitType ? errors.visitType : ""}
                      error={touched.visitType ? errors.visitType : ""}
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
    </FloatingPanel >
  );
}

// AllergiesForm.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default AddEncounters;
