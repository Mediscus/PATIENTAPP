import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField, DatePicker } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { TextField as MuiTextField } from "@mui/material";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { bloodTransfusionFormSchema } from "dan-api/schema";
import moment from "moment";
import { useParams } from "react-router-dom";

function BloodTransfusionForm(props) {
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

  const postHospitalization = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("ehr/blood-transfusion-history", "post", values)
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
        setMessage(ErrorMessage);
      });
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Blood Transfusions"
      extraSize={false}
    >
      <Formik
        initialValues={{
          patientRef: patient && patient.patientRef,
          transfusionRef: editData ? editData['transfusion_id'] : '',
          transfusionType: editData ? editData['transfusion_type'] : '',
          transfusionDate: editData ? moment(editData['transfusion_date']).format("YYYY-MM-DD") : '',
          bloodNumber: editData ? editData['blood_number'] : '',
          hospitalName: editData ? editData['hospital_name'] : '',
        }}
        enableReinitialize={true}
        validationSchema={bloodTransfusionFormSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          postHospitalization(values, setErrors, setStatus, setSubmitting);
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
                      name="transfusionType"
                      label="Transfusion Type"
                      placeholder="Enter Transfusion Type"
                      value={values.transfusionType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.transfusionType ? errors.transfusionType : ""
                      }
                      error={
                        touched.transfusionType ? errors.transfusionType : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="Transfusion Date"
                      value={values.transfusionDate}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("transfusionDate", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="transfusionDate"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="bloodNumber"
                      label="Blood Number"
                      placeholder="Enter Blood Number"
                      value={values.bloodNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.bloodNumber ? errors.bloodNumber : ""}
                      error={touched.bloodNumber ? errors.bloodNumber : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="hospitalName"
                      label="Hospital Name"
                      placeholder="Enter Hospital Name"
                      value={values.hospitalName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.hospitalName ? errors.hospitalName : ""
                      }
                      error={touched.hospitalName ? errors.hospitalName : ""}
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
}

export default BloodTransfusionForm;
