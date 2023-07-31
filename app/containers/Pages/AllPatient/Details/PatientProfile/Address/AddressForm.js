import { Box, Button, TextField, Grid } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import styles from "../../../../Pages-jss";
import css from "dan-styles/Form.scss";
import Send from "@mui/icons-material/Send";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel } from "dan-components";
import { addressFormSchema } from "dan-api/schema";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";
import { Autocomplete } from '@mui/material';

function AddressForm(props) {
  const { classes, openForm, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const patientId = useParams();

  const postAddressInfo = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("patient/address", "post", values)
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
        title={data ? "Edit Address" : "Add Address"}
        extraSize={false}
      >
        <Formik
          initialValues={
            data
              ? {
                addressRef: data.address_id,
                patientRef: data.patient_ref,
                addressType: data.address_type,
                country: data.country,
                state: data.state,
                city: data.city,
                zipCode: data.zip_code,
                addressLine1: data.address_line1,
                addressLine2: data.address_line2,
              }
              : {
                patientRef: patientId.patientRef,
                addressType: null,
                country: null,
                state: null,
                city: "",
                zipCode: "",
                addressLine1: "",
                addressLine2: "",
              }
          }
          validationSchema={addressFormSchema}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting }
          ) => {
            postAddressInfo(values, setErrors, setStatus, setSubmitting);
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
                        // freeSolo
                        name="addressType"
                        options={["Current"].map((option) => option)}
                        value={values.addressType}
                        onChange={(event, newVal) => {
                          setFieldValue("addressType", newVal);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Address Type"
                            placeholder="Select Address Type"
                            onBlur={handleBlur}
                            helperText={
                              touched.addressType ? errors.addressType : ""
                            }
                            error={
                              touched.addressType ? errors.addressType : ""
                            }
                          />
                        )}
                      />
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

AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressForm);
