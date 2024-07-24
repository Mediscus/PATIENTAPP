import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { FloatingPanel, TextField, DatePicker } from "dan-components";
import Send from "@mui/icons-material/Send";
import { TextField as MuiTextField } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { useParams } from "react-router-dom";
import apiCall from "dan-redux/apiInterface";
import { socialHistoryFormSchema } from "dan-api/schema";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import css from "dan-styles/Form.scss";

function SocialHistoryForm(props) {
  const { open, closeForm, data, type, callBack, setMessage } = props;
  const patient = useParams();
  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (type === "edit") {
      setEditData(data);
    } else {
      setEditData({});
    }
  }, [type, data]);

  const postSocialHistory = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    try {
      const res = await apiCall("ehr/social-history", "post", values);
      if (res && res.Status === "Success") {
        setMessage("success", "Data Saved Successfully!");
        setStatus({ success: true });
        callBack(true);
      }
    } catch (error) {
      setMessage("error", error.ErrorMessage);
    }
    setSubmitting(false);
  };

  return (
    <FloatingPanel openForm={open} closeForm={closeForm} title="Social History">
      <Formik
        initialValues={{
          patientRef: patient.patientRef || "",
          socialRef: editData.social_id || "",
          activityName: editData.activity_name || "",
          fromDate: editData.from_date
            ? moment(editData.from_date).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD"),
          toDate: editData.to_date
            ? moment(editData.to_date).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD"),
          comment: editData.comment || "",
          status: editData.status || "",
        }}
        enableReinitialize
        validationSchema={socialHistoryFormSchema}
        onSubmit={postSocialHistory}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          setFieldValue,
          values,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
                      name="activityName"
                      label="Activity Name"
                      placeholder="Enter Activity Name"
                      value={values.activityName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.activityName && errors.activityName}
                      error={
                        touched.activityName && Boolean(errors.activityName)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="From Date"
                      value={values.fromDate}
                      onChange={(value) =>
                        setFieldValue(
                          "fromDate",
                          moment(value).format("YYYY-MM-DD"),
                          true
                        )
                      }
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="To Date"
                      value={values.toDate}
                      onChange={(value) =>
                        setFieldValue(
                          "toDate",
                          moment(value).format("YYYY-MM-DD"),
                          true
                        )
                      }
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name="status"
                      label="Status"
                      placeholder="Enter Status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.status && errors.status}
                      error={touched.status && Boolean(errors.status)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name="comment"
                      label="Comment"
                      placeholder="Enter Comment"
                      value={values.comment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.comment && errors.comment}
                      error={touched.comment && Boolean(errors.comment)}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={css.buttonArea}>
                <Button type="button" onClick={closeForm}>
                  Discard
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  Save <Send />
                </Button>
              </div>
            </Box>
          </form>
        )}
      </Formik>
    </FloatingPanel>
  );
}

export default SocialHistoryForm;
