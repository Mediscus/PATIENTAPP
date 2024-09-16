import React, { useEffect, useState, useCallback } from "react";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";

function VaccinationsHistoryForm(props) {
  const { open, closeForm, setMessage } = props;
  const { patientRef } = useParams();
  const { height } = useWindowDimensions();

  const {
    allergyList,
    allergyListLoader,
    substanceList,
    substanceListLoader,
    occuranceReasonList,
    occuranceListLoader,
    exposureRouteList,
    exposureRouteListLoader,
    isNoKnownAllergy,
  } = useSelector((state) => state.allergy);

  const clinicalStatusList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergyintolerance-clinical"
  );
  const varificationStatusList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergyintolerance-verification"
  );
  const allergyTypeList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergy-intolerance-type"
  );
  const allergyCatList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergy-intolerance-category"
  );
  const criticalityList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergy-intolerance-criticality"
  );
  const sevarityList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/reaction-event-severity"
  );

  useEffect(() => {
    if (!isNoKnownAllergy) allergyListResult(allergyValue);
  }, [allergyValue]);

  const handleAllergyDebounceFun = (ipValue) => {
    getAllergyList(dispatch, ipValue);
  };

  const allergyListResult = useCallback(
    _debounce(handleAllergyDebounceFun, 200),
    []
  );

  useEffect(() => {
    substanceListResult(substanceValue);
  }, [substanceValue]);

  const handleSubstaceDebounceFun = (ipValue) => {
    getSubstanceList(dispatch, ipValue);
  };

  const substanceListResult = useCallback(
    _debounce(handleSubstaceDebounceFun, 200),
    []
  );

  useEffect(() => {
    occuranceReasonListResult(occuranceReasonValue);
  }, [occuranceReasonValue]);

  const handleOccuranceReasonDebounceFun = (ipValue) => {
    getClinicalFindingList(dispatch, ipValue);
  };

  const occuranceReasonListResult = useCallback(
    _debounce(handleOccuranceReasonDebounceFun, 200),
    []
  );

  useEffect(() => {
    exposureRouteListResult(exposureRouteValue);
  }, [exposureRouteValue]);

  const handleExposureRouteDebounceFun = (ipValue) => {
    getExposureRouteList(dispatch, ipValue);
  };

  const exposureRouteListResult = useCallback(
    _debounce(handleExposureRouteDebounceFun, 200),
    []
  );

  useEffect(() => {
    if (type == "edit") {
      setEditData(data);
    } else {
      setEditData({});
    }
  }, []);

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    sign +
    pad(Math.floor(Math.abs(offset) / 60)) +
    ":" +
    pad(Math.abs(offset) % 60)
  );
}

const handleChange = (field) => (event) => {
  setFormData({
    ...formData,
    [field]: event.target.value,
  });
};

const handleFormSubmit = async () => {
  try {
    const postData = {
      resourceType: "Immunization",
      vaccineCode: {
        coding: [
          {
            code: formData.vaccineCode,
          },
        ],
      },
      text: formData.vaccineName,
      patient: {
        reference: "Patient/49006",
      },
      encounter: {
        reference: "Encounter/49229",
      },
      occurrenceDateTime: formatDateTime(formData.occurrenceDateTime),
    };

    console.log("postData:", postData);

    const response = await axios.post(
      "https://hapi.fhir.org/baseR4/Immunization",
      postData
    );

    console.log("API Response:", response.data);
    alert("Data submitted successfully!");
  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting data. Please try again.");
  }
};

return (
  <FloatingPanel
    openForm={open}
    closeForm={closeForm}
    title="Vaccinations History"
    extraSize={false}
  >
    <Formik
      initialValues={{
        patientRef: patient && patient.patientRef,
        vaccinationRef: editData ? editData["vaccination_id"] : "",
        vaccinationName: editData ? editData["vaccination_name"] : "",
        againstDisease: editData ? editData["against_disease"] : "",
        schedule: editData ? editData["schedule"] : "",
        status: editData ? editData["status"] : "",
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
                    helperText={
                      touched.vaccinationName ? errors.vaccinationName : ""
                    }
                    error={
                      touched.vaccinationName ? errors.vaccinationName : ""
                    }
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
                    helperText={
                      touched.againstDisease ? errors.againstDisease : ""
                    }
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


VaccinationsHistoryForm.propTypes = {
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default VaccinationsHistoryForm;
