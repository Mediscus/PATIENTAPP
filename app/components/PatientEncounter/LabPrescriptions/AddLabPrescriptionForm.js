
import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import moment from "moment";
import { Formik } from "formik";
import { TextField as MuiTextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { DatePicker, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { labPrescriptionFormSchema } from "dan-api/schema";

function AddLabPrescriptionForm(props) {
  const patient = useParams();
  const { closeForm, encounterData, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();

  const postPrescription = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("ehr/lab-prescription", "post", values)
      .then((res) => {
        if (res && res.Status === "Success") {
          setMessage("success", "Data saved successfully!");
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

    <Formik
      initialValues={{
        patientRef: patient && patient.patientRef,
        encounterRef: encounterData && encounterData.appointment_id,
        prescriptionRef: data ? data['prescriptionRef'] : '',
        investigation: data ? data['investigation'] : '',
        orderDate: data ? moment(data['orderDate']).format("YYYY-MM-DD") : '',
        investigationType: data ? data['investigationType'] : '',
        details: data ? data['details'] : '',
        instruction: data ? data['instruction'] : '',
      }}
      enableReinitialize={true}
      validationSchema={labPrescriptionFormSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        postPrescription(values, setErrors, setStatus, setSubmitting);
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
              justify: "space-between",
            }}
          >
            <div
              className={css.bodyForm}
              style={{
                height: height - 175,
                maxHeight: height - 175,
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
                    name="investigation"
                    label="Investigation"
                    placeholder="Investigation"
                    value={values.investigation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      touched.investigation ? errors.investigation : ""
                    }
                    error={touched.investigation ? errors.investigation : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    inputFormat="YYYY-MM-DD"
                    label="Order Date"
                    value={values.orderDate}
                    onChange={(value) => {
                      const date = moment(value).format("YYYY-MM-DD");
                      setFieldValue("orderDate", date, true);
                    }}
                    renderInput={(params) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        name="orderDate"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="investigationType"
                    label="Investigation Type"
                    placeholder="Investigation Type"
                    value={values.investigationType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.investigationType ? errors.investigationType : ""}
                    error={touched.investigationType ? errors.investigationType : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="details"
                    label="Details"
                    placeholder="Enter Details"
                    value={values.details}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.details ? errors.details : ""}
                    error={touched.details ? errors.details : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="instruction"
                    label="Instruction"
                    placeholder="Enter Instruction"
                    value={values.instruction}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.instruction ? errors.instruction : ""}
                    error={touched.instruction ? errors.instruction : ""}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={css.buttonArea}>
              <Button type="button" onClick={() => closeForm()}>Discard</Button>
              <Button variant="contained" color="secondary" type="submit">
                Save&nbsp;
                <Send />
              </Button>
            </div>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default AddLabPrescriptionForm;
