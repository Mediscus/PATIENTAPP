import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../../../Pages-jss";
import css from "dan-styles/Form.scss";
import { Box, Button, TextField, Grid } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Send from "@mui/icons-material/Send";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel } from "dan-components";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MomentUtils from "@date-io/moment";

// project imports
import { guarantorFormSchema } from "dan-api/schema";
// third party
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";
import { Autocomplete } from '@mui/material';

function GuarantorForm(props) {
  const { classes, openForm, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const patientId = useParams();
  const [initVal, setInitVal] = useState(new Date());

  const postGuarantorInfo = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("patient/guarantor", "post", values)
      .then((res) => {
        if (res && res.Status === "Success") {
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
        setStatus({ success: false });
        setErrors({ error: ErrorMessage });
        setSubmitting(false);
        setMessage(ErrorMessage);
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <FloatingPanel
        openForm={openForm}
        closeForm={closeForm}
        title={data ? "Edit Guarantor" : "Add Guarantor"}
        extraSize={false}
      >
        <Formik
          initialValues={
            data
              ? {
                guarantorRef: data.guarantor_id,
                patientRef: data.patient_ref,
                type: data.guarantor_type,
                name: data.full_name,
                relationship: data.relationship,
                phone: data.phone,
                dialCountryCode: data.dial_country_code,
                gender: data.gender,
                dob: data.dob,
                country: data.country,
                state: data.state,
                city: data.city,
                zipCode: data.zip_code,
                addressLine1: data.address_line1,
                addressLine2: data.address_line2,
              }
              : {
                patientRef: patientId.patientRef,
                type: "Other",
                name: "Other Manoj",
                relationship: "Other",
                phone: "Other",
                dialCountryCode: "Other",
                gender: "Other",
                dob: "Other",
                country: "India",
                state: "Madhya Pradesh",
                city: "Indore",
                zipCode: "452001",
                addressLine1: "test test",
                addressLine2: "tegdgfgfdgdf",
              }
          }
          validationSchema={guarantorFormSchema}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting }
          ) => {
            postGuarantorInfo(values, setErrors, setStatus, setSubmitting);
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
                      <Autocomplete
                        freeSolo
                        name="type"
                        options={["Self", "Other"].map((option) => option)}
                        value={values.type}
                        onChange={(event, newVal) => {
                          setFieldValue("type", newVal);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Type"
                            placeholder="Select Guarantor Type"
                            onBlur={handleBlur}
                            helperText={touched.type ? errors.type : ""}
                            error={touched.type ? errors.type : ""}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        placeholder="Enter Name"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="relationship"
                        label="Relationship"
                        placeholder="Enter Relationship"
                        value={values.relationship}
                        onChange={handleChange}
                      />
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
                            helperText={
                              touched.dialCountryCode
                                ? errors.dialCountryCode
                                : ""
                            }
                            error={
                              touched.dialCountryCode
                                ? errors.dialCountryCode
                                : ""
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        type="tel"
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.phone ? errors.phone : ""}
                        error={touched.phone ? errors.phone : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        fullWidth
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
                            helperText={touched.gender ? errors.gender : ""}
                            error={touched.gender ? errors.gender : ""}
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
                          helperText={touched.dob ? errors.dob : ""}
                          error={touched.dob ? errors.dob : ""}
                          animateYearScrolling={false}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Autocomplete
                        freeSolo
                        name="country"
                        options={["India", "Australia"].map(
                          (option) => option
                        )}
                        value={values.country}
                        onChange={(event, newVal) => {
                          setFieldValue("country", newVal);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            placeholder="Enter Country"
                            onBlur={handleBlur}
                            helperText={touched.country ? errors.country : ""}
                            error={touched.country ? errors.country : ""}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Autocomplete
                        freeSolo
                        name="state"
                        options={["Madhya Pradesh", "Uttar Pradesh"].map(
                          (option) => option
                        )}
                        value={values.state}
                        onChange={(event, newVal) => {
                          setFieldValue("state", newVal);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            placeholder="Enter State"
                            onBlur={handleBlur}
                            helperText={touched.state ? errors.state : ""}
                            error={touched.state ? errors.state : ""}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="city"
                        label="City"
                        placeholder="Enter City"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.state ? errors.state : ""}
                        error={touched.state ? errors.state : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="zipCode"
                        label="Zip Code"
                        placeholder="Enter Zip Code"
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.zipCode ? errors.zipCode : ""}
                        error={touched.zipCode ? errors.zipCode : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="addressLine1"
                        label="Address Line 1"
                        placeholder="Enter Address Line 1"
                        value={values.addressLine1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.addressLine1 ? errors.addressLine1 : ""
                        }
                        error={
                          touched.addressLine1 ? errors.addressLine1 : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="addressLine2"
                        label="Address Line 2"
                        placeholder="Enter Address Line 2"
                        value={values.addressLine2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.addressLine2 ? errors.addressLine2 : ""
                        }
                        error={
                          touched.addressLine2 ? errors.addressLine2 : ""
                        }
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
    </Box>
  );
}

GuarantorForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuarantorForm);
