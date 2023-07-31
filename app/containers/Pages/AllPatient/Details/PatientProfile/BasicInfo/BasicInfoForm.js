import React, { useState } from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import { Box, Button, TextField, Grid } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import Send from "@mui/icons-material/Send";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MomentUtils from "@date-io/moment";
import { Autocomplete } from "@mui/material";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
// project imports
import styles from "../../../../Pages-jss";
import { basicInfoSchema } from "dan-api/schema";
import { FloatingPanel } from "dan-components";
import apiCall from "dan-redux/apiInterface";

function BasicInfoForm(props) {
  const { classes, open, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const { patientId } = useParams();
  const [initVal, setInitVal] = useState(new Date());

  const postBasicInfo = async (values, setErrors, setStatus, setSubmitting) => {
    await apiCall("patient/basic-info", "post", values)
      .then((res) => {
        let data = res.Data;
        if (res && res.Status === "Success") {
          setMessage("Data Saved Successfully!");
        }
        setStatus({ success: true });
        callBack(true);
      })
      .catch((Error) => {
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        setStatus({ success: false });
        setSubmitting(false);
        setMessage(ErrorMessage);
      });
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Basic Info"
      extraSize={false}
    >
      <Formik
        initialValues={
          data
            ? {
              source: "SelfPatient",
              patientRef: data["patient_id"] || "",
              firstName: data["first_name"] || "",
              middleName: data["middle_name"] || "",
              lastName: data["last_name"] || "",
              gender: data["gender"] || "",
              dob: data["dob"] || "",
              mobile: data["phone"] || "",
              dialCountryCode: data["dial_country_code"] || "",
              email: data["email"] || "",
              UIDAINumber: data["uidai_card_number"] || "",
              marriedStatus: data["marriage_status"] || "",
            }
            : {
              source: "SelfPatient",
              patientRef: "",
              firstName: "",
              middleName: "",
              lastName: "",
              gender: "",
              dob: "",
              mobile: "",
              dialCountryCode: "",
              email: "",
              UIDAINumber: "",
              marriedStatus: "",
            }
        }
        validationSchema={basicInfoSchema}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting }
        ) => {
          postBasicInfo(values, setErrors, setStatus, setSubmitting);
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      placeholder="Enter First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name="middleName"
                      label="Middle Name"
                      placeholder="Enter Middle Name"
                      value={values.middleName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.middleName && Boolean(errors.middleName)}
                      helperText={touched.middleName && errors.middleName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      freeSolo
                      name="gender"
                      options={["Male", "Female", "Other"].map(
                        (option) => option
                      )}
                      value={values.gender}
                      onChange={(event, newVal) => {
                        setFieldValue("gender", newVal);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Gender"
                          onBlur={handleBlur}
                          error={touched.gender && Boolean(errors.gender)}
                          helperText={touched.gender && errors.gender}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider utils={MomentUtils}>
                      <DatePicker
                        fullWidth
                        name="dob"
                        label="Date of Birth"
                        format="DD/MM/YYYY"
                        inputValue={values.dob}
                        value={initVal}
                        onChange={(date, value) => {
                          setInitVal(date);
                          setFieldValue("dob", value);
                        }}
                        onBlur={handleBlur}
                        error={touched.dob && Boolean(errors.dob)}
                        helperText={touched.dob && errors.dob}
                        animateYearScrolling={false}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      freeSolo
                      name="dialCountryCode"
                      options={["+91", "+21", "+31"].map(
                        (option) => option
                      )}
                      value={values.dialCountryCode}
                      onChange={(event, newVal) => {
                        setFieldValue("dialCountryCode", newVal);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country Code"
                          onBlur={handleBlur}
                          error={touched.dialCountryCode && Boolean(errors.dialCountryCode)}
                          helperText={touched.dialCountryCode && errors.dialCountryCode}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      type="tel"
                      name="mobile"
                      label="Mobile Number"
                      placeholder="Enter Mobile Number"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.mobile && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="email"
                      name="email"
                      label="Email"
                      placeholder="Enter Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name="UIDAINumber"
                      label="Aadhar Number"
                      placeholder="Enter Adhar Number"
                      value={values.UIDAINumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.UIDAINumber && Boolean(errors.UIDAINumber)}
                      helperText={touched.UIDAINumber && errors.UIDAINumber}
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
                  <Send className={classes.sendIcon} />
                </Button>
              </div>
            </Box>
          </form>
        )}
      </Formik>
    </FloatingPanel>
  );
}

BasicInfoForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicInfoForm);
