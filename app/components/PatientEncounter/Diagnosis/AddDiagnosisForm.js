import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import moment from "moment";
import { Formik } from "formik";
import { TextField as MuiTextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { diagnosisFormSchema } from "dan-api/schema";
import { DatePicker, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";

function AddDiagnosisForm(props) {
  const patient = useParams();
  const { closeForm, encounterData, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();

  const postDiagnosis = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("ehr/diagnosis", "post", values)
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
    <Formik
      initialValues={{
        patientRef: patient && patient.patientRef,
        encounterRef: encounterData.appointment_id,
        diagnosisRef: data ? data['diagnosisRef'] : '',
        diagnosisName: data ? data['diagnosisName'] : '',
        fromDate: data ? moment(data['fromDate']).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
        onsetYear: data ? data['onsetYear'] : '',
        status: data ? data['status'] : '',
        doctorRef: data ? data['doctorRef'] : '',
        sequence: data ? data['sequence'] : '',
        reports: data ? data['reports'] : '',
      }}
      enableReinitialize={true}
      validationSchema={diagnosisFormSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        postDiagnosis(values, setErrors, setStatus, setSubmitting);
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
        setTouched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <div
            className={css.bodyForm}
            style={{
              height: height - 180,
              maxHeight: height - 180,
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
                  type="text"
                  name="diagnosisName"
                  label="Diagnosis Name"
                  placeholder="Enter Diagnosis Name"
                  value={values.diagnosisName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.diagnosisName ? errors.diagnosisName : ""
                  }
                  error={touched.diagnosisName ? errors.diagnosisName : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  inputFormat="YYYY-MM-DD"
                  label="From Date"
                  value={values.fromDate}
                  onChange={(value) => {
                    const date = moment(value).format("YYYY-MM-DD");
                    setFieldValue("fromDate", date, true);
                  }}
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      fullWidth
                      name="fromDate"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="onsetYear"
                  label="Onset Year"
                  placeholder="Enter Onset Year"
                  value={values.onsetYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.onsetYear ? errors.onsetYear : ""}
                  error={touched.onsetYear ? errors.onsetYear : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="status"
                  label="Status"
                  placeholder="Enter Status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.status ? errors.status : ""}
                  error={touched.status ? errors.status : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="doctorRef"
                  label="Docator Reference"
                  placeholder="Enter Docator Reference"
                  value={values.doctorRef}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.doctorRef ? errors.doctorRef : ""}
                  error={touched.doctorRef ? errors.doctorRef : ""}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="sequence"
                  label="Sequence"
                  placeholder="Enter Sequence"
                  value={values.sequence}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.sequence ? errors.sequence : ""}
                  error={touched.sequence ? errors.sequence : ""}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="reports"
                  label="Reports"
                  placeholder="Enter Reports"
                  value={values.reports}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.reports ? errors.reports : ""}
                  error={touched.reports ? errors.reports : ""}
                />
              </Grid>
            </Grid>
          </div>
          <div className={css.buttonArea}>
            <Button type="button" onClick={() => closeForm()}>Discard</Button>
            <Button variant="contained" color="secondary" type="submit">
              Save&nbsp;
              <Send />
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default AddDiagnosisForm;
