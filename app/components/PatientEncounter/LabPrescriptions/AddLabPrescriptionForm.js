import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  FloatingPanel,
} from "@mui/material";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import css from "dan-styles/Form.scss";
import { DatePicker } from "@material-ui/pickers";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Formik } from "formik";

function AddLabPrescriptionForm(props) {
  const { classes, inputChange } = props;
  const { height, width } = useWindowDimensions();
  const [selectedOrderDate, setSelectedOrderDate] = useState(new Date());
  const [formData, setFormData] = useState({
    Investigation: "",
    intent: "",
    priority: "",
    Details: "",
    Date: "",
    Instruction: "",
  });

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedOrderDate(date);
    setFormData({ ...formData, Date: selectedOrderDate });
  };

  const handleFormSubmit = async () => {
    try {
      const postData = {
        resourceType: "ServiceRequest",
        status: "active",
        intent: formData.intent,
        category: [
          {
            coding: [
              {
                display: formData.Investigation,
              },
            ],
          },
        ],
        priority: formData.priority,
        code: {
          coding: [
            {
              display: formData.Details,
            },
          ],
        },
        quantityQuantity: { value: 1 },
        authoredOn: moment(formData.Date).toISOString(),
      };

      console.log("postData:", postData);

      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/ServiceRequest?_lastUpdated=gt2024-05-22",
        postData
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  return (
    <FloatingPanel
      openForm={open}
      // closeForm={closeForm}
      title="Vaccinactions History"
      extraSize={false}
    >
      <Formik
        initialValues={
          {
            // patientRef: patient && patient.patientRef,
            // vaccinationRef: editData ? editData["vaccination_id"] : "",
            // vaccinationName: editData ? editData["vaccination_name"] : "",
            // againstDisease: editData ? editData["against_disease"] : "",
            // schedule: editData ? editData["schedule"] : "",
            // status: editData ? editData["status"] : "",
          }
        }
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
                      error={
                        touched.againstDisease ? errors.againstDisease : ""
                      }
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

export default AddLabPrescriptionForm;
