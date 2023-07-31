import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../../../Pages-jss";
import css from "dan-styles/Form.scss";
import { Box, Button, TextField, Grid } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Send from "@mui/icons-material/Send";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel } from "dan-components";
// project imports
import { insuranceFormSchema } from "dan-api/schema";
// third party
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";

function InsuranceForm(props) {
  const { classes, openForm, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const patientId = useParams();

  const postInsuranceInfo = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("patient/insurance", "post", values)
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
        title={data ? "Edit Insurance" : "Add Insurance"}
        extraSize={false}
      >
        <Formik
          initialValues={
            data
              ? {
                insuranceRef: data.insurance_id,
                patientRef: data.patient_ref,
                providerName: data.provider_name,
                insuranceName: data.insurance_name,
                cardNumber: data.card_number,
                insuranceNumber: data.insurance_number,
                IMISCode: data.imis_code,
                initialBalance: data.initial_balance,
              }
              : {
                patientRef: patientId.patientRef,
                providerName: "abhishek",
                insuranceName: "Other Manoj",
                cardNumber: "Other",
                insuranceNumber: "Other",
                IMISCode: "Other",
                initialBalance: "Other",
              }
          }
          validationSchema={insuranceFormSchema}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting }
          ) => {
            postInsuranceInfo(values, setErrors, setStatus, setSubmitting);
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
                        name="providerName"
                        label="Provider Name"
                        placeholder="Enter Provider Name"
                        value={values.providerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.providerName ? errors.providerName : ""
                        }
                        error={touched.providerName ? errors.providerName : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="insuranceName"
                        label="Insurance Name"
                        placeholder="Enter Insurance Name"
                        value={values.insuranceName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.insuranceName ? errors.insuranceName : ""
                        }
                        error={touched.insuranceName ? errors.insuranceName : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="cardNumber"
                        label="Card Number"
                        placeholder="Enter Card Number"
                        value={values.cardNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.cardNumber ? errors.cardNumber : ""
                        }
                        error={touched.cardNumber ? errors.cardNumber : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="insuranceNumber"
                        label="Insurance Number"
                        placeholder="Enter Insurance Number"
                        value={values.insuranceNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.insuranceNumber ? errors.insuranceNumber : ""
                        }
                        error={touched.insuranceNumber ? errors.insuranceNumber : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="IMISCode"
                        label="IMIS Code"
                        placeholder="Enter IMIS Code"
                        value={values.IMISCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.IMISCode ? errors.IMISCode : ""
                        }
                        error={touched.IMISCode ? errors.IMISCode : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="initialBalance"
                        label="Initial Balance"
                        placeholder="Enter Initial Balance"
                        value={values.initialBalance}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.initialBalance ? errors.initialBalance : ""
                        }
                        error={touched.initialBalance ? errors.initialBalance : ""}
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

InsuranceForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsuranceForm);
