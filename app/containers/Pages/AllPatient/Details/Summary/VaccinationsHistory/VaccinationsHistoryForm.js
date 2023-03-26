import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { vaccinationHistoryFormSchema } from "dan-api/schema";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";


function VaccinationsHistoryForm(props) {
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

  const postFamilyHistory = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("ehr/vaccinations-history", "post", values)
      .then((res) => {
        if (res && res.Status === "Success") {
          setMessage("success", "Data saved successfully");
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
      title="Vaccinactions History"
      extraSize={false}
    >
      <Formik
        initialValues={{
          patientRef: patient && patient.patientRef,
          vaccinationRef: editData ? editData['vaccination_id'] : '',
          vaccinationName: editData ? editData['vaccination_name'] : '',
          againstDisease: editData ? editData['against_disease'] : '',
          schedule: editData ? editData['schedule'] : '',
          status: editData ? editData['status'] : '',
        }}
        enableReinitialize={true}
        validationSchema={vaccinationHistoryFormSchema}
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
                      type="text"
                      name="vaccinationName"
                      label="Vaccination Name"
                      placeholder="Enter Vaccination Name"
                      value={values.vaccinationName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.vaccinationName ? errors.vaccinationName : ""}
                      error={touched.vaccinationName ? errors.vaccinationName : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      name="againstDisease"
                      label="Against Disease"
                      placeholder="Enter Against Disease"
                      value={values.againstDisease}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.againstDisease ? errors.againstDisease : ""}
                      error={touched.againstDisease ? errors.againstDisease : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      name="schedule"
                      label="Schedule"
                      placeholder="Enter Schedule"
                      value={values.schedule}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.schedule ? errors.schedule : ""}
                      error={touched.schedule ? errors.schedule : ""}
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
                </Grid>
              </div>
              <div className={css.buttonArea}>
                <Button type="button" onClick={closeForm}>
                  Discard
                </Button>
                <Button type="submit" variant="contained" color="secondary">
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

// VaccinationsHistoryForm.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default VaccinationsHistoryForm;
