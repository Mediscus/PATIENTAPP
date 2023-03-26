import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../../../../Pages-jss";
import css from "dan-styles/Form.scss";
import { Box, Button, TextField, Grid, IconButton } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Send from "@mui/icons-material/Send";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel } from "dan-components";

// project imports
import { emergencyFormSchema } from "dan-api/schema";
// third party
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";
import { Autocomplete } from '@mui/material';

function ContactForm(props) {
  const { classes, openForm, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const patientId = useParams();

  const postContactInfo = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("patient/emergency-contact", "post", values)
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
        title={data ? "Edit Contact" : "Add Contact"}
        extraSize={false}
      >
        <Formik
          initialValues={
            data
              ? {
                contactRef: data.contact_id,
                patientRef: data.patient_ref,
                contactType: data.contact_type,
                firstName: data.first_name,
                lastName: data.last_name,
                phoneNumber: data.phone_number,
                dialCountryCode: data.dial_country_code,
                relationship: data.relationship,
                comment: data.comment,
              }
              : {
                patientRef: patientId.patientRef,
                contactType: "Kin",
                firstName: "sssss",
                lastName: "Abc",
                phoneNumber: "9302601397",
                dialCountryCode: "31",
                relationship: "Abc",
                comment: "sdfsdf",
              }
          }
          validationSchema={emergencyFormSchema}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting }
          ) => {
            postContactInfo(values, setErrors, setStatus, setSubmitting);
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
                        name="contactType"
                        label="Contact Type"
                        placeholder="Enter Contact Type"
                        value={values.contactType}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                        placeholder="Enter First Name"
                        value={values.firstName}
                        onChange={handleChange}
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
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.phoneNumber ? errors.phoneNumber : ""
                        }
                        error={touched.phoneNumber ? errors.phoneNumber : ""}
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
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        name="comment"
                        label="Comment"
                        placeholder="Enter Comment"
                        value={values.comment}
                        onChange={handleChange}
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

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);
