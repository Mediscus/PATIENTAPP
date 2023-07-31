import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField, DatePicker } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import moment from "moment";
import { TextField as MuiTextField } from "@mui/material";
import { surgeryFormschema } from "dan-api/schema";
import { useParams } from "react-router-dom";

function SurgeryForm(props) {
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

  const postSurgeryForm = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    await apiCall("ehr/surgery-history", "post", values)
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
      title="Surgery History"
      extraSize={false}
    >
      <Formik
        initialValues={{
          patientRef: patient && patient.patientRef,
          surgeryRef: editData ? editData['surgery_id'] : '',
          surgeryType: editData ? editData['surgery_type'] : '',
          surgeryName: editData ? editData['surgery_name'] : '',
          hospitalName: editData ? editData['hospital_name'] : '',
          surgeryDate: editData ? moment(editData['surgery_date']).format("YYYY-MM-DD") : '',
          onsetYear: editData ? editData['onset_year'] : '',
        }}
        enableReinitialize={true}
        validationSchema={surgeryFormschema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          postSurgeryForm(values, setErrors, setStatus, setSubmitting);
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
                      name="surgeryType"
                      label="Surgery Type"
                      placeholder="Enter Surgery Type"
                      value={values.surgeryType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.surgeryType ? errors.surgeryType : ""}
                      error={touched.surgeryType ? errors.surgeryType : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="surgeryName"
                      label="Surgery Name"
                      placeholder="Enter Surgery Name"
                      value={values.surgeryName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.surgeryName ? errors.surgeryName : ""}
                      error={touched.surgeryName ? errors.surgeryName : ""}
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
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="Surgery Date"
                      value={values.surgeryDate}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("surgeryDate", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="surgeryDate"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="onsetYear"
                      label="OnSetYear"
                      placeholder="Enter OnSetYear"
                      value={values.onsetYear}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.onsetYear ? errors.onsetYear : ""}
                      error={touched.onsetYear ? errors.onsetYear : ""}
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

export default SurgeryForm;
