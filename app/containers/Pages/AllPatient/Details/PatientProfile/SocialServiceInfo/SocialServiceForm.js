import React from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import { Box, Button, TextField, Grid } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Send from "@mui/icons-material/Send";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel } from "dan-components";

// project imports
import styles from "../../../../Pages-jss";
import { socialServiceformSchema } from "dan-api/schema";
// third party
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";

function SocialServiceForm(props) {
  const { classes, openForm, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const patientId = useParams();

  const postServiceInfo = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("patient/ssu-info", "post", values)
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
        title={data ? "Edit Social Info" : "Add Social Info"}
        extraSize={false}
      >
        <Formik
          initialValues={
            data
              ? {
                ssuRef: data.ssu_id,
                patientRef: data.patient_ref,
                targetGroup: data.target_group,
                membership: data.membership,
                hasCertificate: data.has_certificate,
                certificateType: data.certificate_type,
                certificateNumber: data.certificate_number,
                incomeSource: data.income_source,
                financialStatus: data.financial_status,
              }
              : {
                patientRef: patientId.patientRef,
                targetGroup: "Hello poor",
                membership: "sssss",
                hasCertificate: "Yes",
                certificateType: "sssss",
                certificateNumber: "sssss",
                incomeSource: "sssss",
                financialStatus: "Poor",
              }
          }
          validationSchema={socialServiceformSchema}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting }
          ) => {
            postServiceInfo(values, setErrors, setStatus, setSubmitting);
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
                        name="targetGroup"
                        label="Target Group"
                        placeholder="Enter Target Group"
                        value={values.targetGroup}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="membership"
                        label="Membership"
                        placeholder="Enter Membership"
                        value={values.membership}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="hasCertificate"
                        label="Has Certificate"
                        value={values.hasCertificate}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="certificateType"
                        label="Certificate Type"
                        value={values.certificateType}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="certificateNumber"
                        label="Certificate Number"
                        value={values.certificateNumber}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="incomeSource"
                        label="Income Source"
                        value={values.incomeSource}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="financialStatus"
                        label="Financial Status"
                        value={values.financialStatus}
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

SocialServiceForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SocialServiceForm);
