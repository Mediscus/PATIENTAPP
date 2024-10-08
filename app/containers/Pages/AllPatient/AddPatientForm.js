import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import {
  Box,
  Button,
  Grid,
  Autocomplete,
  TextField as MuiTextField,
} from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import { basicInfoSchema } from "dan-api/schema";
import { FloatingPanel, DatePicker, TextField } from "dan-components";
import { withStyles } from "@mui/styles";
import styles from "../Pages-jss";

const AddPatientForm = (props) => {
  const { classes, open, closeForm, data, type, callBack, setMessage } = props;
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (type == "edit") {
      setEditData(data);
    } else {
      setEditData({});
    }
  }, []);

  const postFamilyHistory = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("patient/basic-info", "post", values)
      .then((res) => {
        if (res && res.Data && res.Status === "Success") {
          setMessage("Data saved successfully!");
          setStatus({ success: true });
          callBack(true);
        }
      })
      .catch((Error) => {
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        setMessage(ErrorMessage);
      });
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Add Patient"
      extraSize={false}
    >
      <Formik
        initialValues={{
          relationship: editData ? editData["relationship"] : "",
          firstName: editData ? editData["first_name"] : "",
          middleName: editData ? editData["middle_name"] : "",
          lastName: editData ? editData["last_name"] : "",
          gender: editData ? editData["gender"] : "",
          email: editData ? editData["email"] : "",
          dob: editData ? editData["dob"] : "",
          mobile: editData ? editData["phone"] : 1234567890,
          landline: editData ? editData["landline"] : 2314569877,
          dialCountryCode: editData ? editData["dial_country_code"] : "91",
          bloodGroup: editData ? editData["blood_group"] : "",
          marriedStatus: editData ? editData["marriage_status"] : "",
          castGroup: editData ? editData["cast_group"] : "",
          occupation: editData ? editData["occupation"] : "",
          membership: editData ? editData["membership"] : "",
          employerInfo: editData ? editData["employer_info"] : "",
          race: editData ? editData["race"] : "",
          panCardNumber: editData ? editData["pan_card_number"] : "",
          ABHANumber: editData ? editData["abha_number"] : "",
          UIDAINumber: editData ? editData["uidai_card_number"] : "",
        }}
        enableReinitialize={true}
        validationSchema={basicInfoSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          postFamilyHistory(values, setErrors, setStatus, setSubmitting);
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
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className={css.bodyForm}>
                <Grid
                  container
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="relationship"
                      options={["Self", "Child"]}
                      value={values.relationship || ""}
                      onChange={(event, value) => {
                        setFieldValue("relationship", value);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Select Relationship"
                          placeholder="Select Relationship"
                          onBlur={handleBlur}
                          helperText={
                            touched.relationship ? errors.relationship : ""
                          }
                          error={Boolean(
                            touched.relationship ? errors.relationship : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="text"
                      name="firstName"
                      label="First Name"
                      placeholder="First Name"
                      value={values.firstName || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.firstName ? errors.firstName : ""}
                      error={touched.firstName ? errors.firstName : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="text" 
                      name="middleName"
                      placeholder="Middle Name"
                      label="Middle Name"
                      value={values.middleName || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.middleName ? errors.middleName : ""}
                      error={touched.middleName ? errors.middleName : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      label="Last Name"
                      value={values.lastName || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.lastName ? errors.lastName : ""}
                      error={touched.lastName ? errors.lastName : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      name="dialCountryCode"
                      placeholder="Country Code"
                      label="Country Code"
                      value={values.dialCountryCode || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.dialCountryCode ? errors.dialCountryCode : ""
                      }
                      error={
                        touched.dialCountryCode ? errors.dialCountryCode : ""
                      }
                      inputProps={{ maxLength: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      type="number"
                      name="mobile"
                      placeholder="Mobile Number"
                      label="Mobile Number"
                      value={values.mobile || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.mobile ? errors.mobile : ""}
                      error={touched.mobile ? errors.mobile : ""}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="gender"
                      options={["Male", "Female"]}
                      value={values.gender || ""}
                      onChange={(event, value) => {
                        setFieldValue("gender", value);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Select gender"
                          placeholder="Select gender"
                          onBlur={handleBlur}
                          helperText={touched.gender ? errors.gender : ""}
                          error={Boolean(touched.gender ? errors.gender : "")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="bloodGroup"
                      options={["A+", "B+"]}
                      value={values.bloodGroup || ""}
                      onChange={(event, value) => {
                        setFieldValue("bloodGroup", value);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          placeholder="Select Blood Group"
                          label="Select Blood Group"
                          onBlur={handleBlur}
                          helperText={
                            touched.bloodGroup ? errors.bloodGroup : ""
                          }
                          error={Boolean(
                            touched.bloodGroup ? errors.bloodGroup : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="email"
                      label="Enter Email Address"
                      placeholder="Enter Email Address"
                      value={values.email || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.email ? errors.email : ""}
                      error={touched.email ? errors.email : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="marriedStatus"
                      options={["Married", "UnMarried"]}
                      value={values.marriedStatus || ""}
                      onChange={(event, value) => {
                        setFieldValue("marriedStatus", value);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          placeholder="Select Married Status"
                          label="Select Married Status"
                          onBlur={handleBlur}
                          helperText={
                            touched.marriedStatus ? errors.marriedStatus : ""
                          }
                          error={Boolean(
                            touched.marriedStatus ? errors.marriedStatus : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="castGroup"
                      options={["Hindu", "Christan"]}
                      value={values.castGroup || ""}
                      onChange={(event, value) => {
                        setFieldValue("castGroup", value);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Select Cast"
                          placeholder="Select Cast"
                          onBlur={handleBlur}
                          helperText={touched.castGroup ? errors.castGroup : ""}
                          error={Boolean(
                            touched.castGroup ? errors.castGroup : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="occupation"
                      options={["Employee", "Student"]}
                      value={values.occupation || ""}
                      onChange={(event, value) => {
                        setFieldValue("occupation", value);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Select Occupation"
                          placeholder="Select Occupation"
                          onBlur={handleBlur}
                          helperText={
                            touched.occupation ? errors.occupation : ""
                          }
                          error={Boolean(
                            touched.occupation ? errors.occupation : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="membership"
                      options={["Yes", "No"]}
                      value={values.membership || ""}
                      onChange={(event, value) => {
                        setFieldValue("membership", value);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Select Membership"
                          placeholder="Select Membership"
                          onBlur={handleBlur}
                          helperText={
                            touched.membership ? errors.membership : ""
                          }
                          error={Boolean(
                            touched.membership ? errors.membership : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="employerInfo"
                      placeholder="Enter EmployerInfo"
                      label="Enter EmployerInfo"
                      value={values.employerInfo || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.employerInfo ? errors.employerInfo : ""
                      }
                      error={touched.employerInfo ? errors.employerInfo : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="race"
                      placeholder="Enter Race"
                      label="Enter Race"
                      value={values.race || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.race ? errors.race : ""}
                      error={touched.race ? errors.race : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="panCardNumber"
                      placeholder="Enter Pan Card Number"
                      label="Enter Pan Card Number"
                      value={values.panCardNumber || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.panCardNumber ? errors.panCardNumber : ""
                      }
                      error={touched.panCardNumber ? errors.panCardNumber : ""}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="ABHANumber"
                      label="Enter ABHA Number"
                      placeholder="Enter ABHA Number"
                      value={values.ABHANumber || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.ABHANumber ? errors.ABHANumber : ""}
                      error={touched.ABHANumber ? errors.ABHANumber : ""}
                      inputProps={{ maxLength: 20 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="UIDAINumber"
                      label="Enter UIDAI Number"
                      placeholder="Enter UIDAI Number"
                      value={values.UIDAINumber || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.UIDAINumber ? errors.UIDAINumber : ""}
                      error={touched.UIDAINumber ? errors.UIDAINumber : ""}
                      inputProps={{ maxLength: 12 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="Date of Birth"
                      value={values.dob}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("dob", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField {...params} fullWidth name="dob" />
                      )}
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
};

export default withStyles(styles)(AddPatientForm);
