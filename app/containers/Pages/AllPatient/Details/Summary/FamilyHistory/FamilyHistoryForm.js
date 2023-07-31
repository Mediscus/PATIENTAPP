import React, { useState, useEffect } from "react";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField, DatePicker } from "dan-components";
import { TextField as MuiTextField } from "@mui/material";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { familyHistoryFormSchema } from "dan-api/schema";
import moment from "moment";
import { useParams } from "react-router-dom";

function AddFamilyHistory(props) {
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
    await apiCall("ehr/family-history", "post", values)
      .then((res) => {
        if (res && res.Status === "Success") {
          setMessage("success", "Date Saved Successfully!");
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
      title="Family History"
      extraSize={false}
    >
      <Formik
        initialValues={{
          patientRef: patient && patient.patientRef,
          familyRef: editData ? editData['family_id'] : '',
          relationship: editData ? editData['relationship'] : '',
          fullName: editData ? editData['full_name'] : '',
          education: editData ? editData['education'] : '',
          occupation: editData ? editData['occupation'] : '',
          accountAssociation: editData ? editData['account_association'] : '',
          diagnosis: editData ? editData['diagnosis'] : '',
          dob: editData ? moment(editData['dob']).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
          age: '',
        }}
        enableReinitialize={true}
        validationSchema={familyHistoryFormSchema}
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
                    <Autocomplete
                      name="relationship"
                      options={[
                        "Father",
                        "Mother",
                        "Brother",
                        "Sister",
                        "Grand Father",
                        "Grand Mother",
                        "Spouse",
                      ]}
                      value={values.relationship || ''}
                      onChange={(event, value) => {
                        setFieldValue("relationship", value);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          variant="standard"
                          label="Relationship"
                          placeholder="Select Relationship"
                          onBlur={handleBlur}
                          helperText={
                            touched.relationship ? errors.relationship : ""
                          }
                          error={Boolean(
                            touched.relationship ? errors.relationship : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="fullName"
                      label="Full Name"
                      placeholder="Enter Full Name"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.fullName ? errors.fullName : ""}
                      error={touched.fullName ? errors.fullName : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="education"
                      label="Education"
                      placeholder="Enter Education"
                      value={values.education}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.education ? errors.education : ""}
                      error={touched.education ? errors.education : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="occupation"
                      label="Occupation"
                      placeholder="Enter Occupation"
                      value={values.occupation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.occupation ? errors.occupation : ""}
                      error={touched.occupation ? errors.occupation : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="accountAssociation"
                      label="Account Association"
                      placeholder="Enter Account Association"
                      value={values.accountAssociation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.accountAssociation
                          ? errors.accountAssociation
                          : ""
                      }
                      error={
                        touched.accountAssociation
                          ? errors.accountAssociation
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="diagnosis"
                      label="Diagnosis"
                      placeholder="Enter Diagnosis"
                      value={values.diagnosis}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.diagnosis ? errors.diagnosis : ""}
                      error={touched.diagnosis ? errors.diagnosis : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="Date Of Birth"
                      value={values.dob}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("dob", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="dob"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="age"
                      label="Age"
                      placeholder="Enter Age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.age ? errors.age : ""}
                      error={touched.age ? errors.age : ""}
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
    </FloatingPanel >
  );
}

export default AddFamilyHistory;
