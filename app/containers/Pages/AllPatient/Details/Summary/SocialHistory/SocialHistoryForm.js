import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField, DatePicker } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { TextField as MuiTextField } from "@mui/material";
import { socialHistoryFormSchema } from "dan-api/schema";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import moment from "moment";
import { useParams } from "react-router-dom";

function SocialHistoryForm(props) {
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
    await apiCall("ehr/social-history", "post", values)
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
      title="Social History"
      extraSize={false}
    >
      <Formik
        initialValues={{
          patientRef: patient && patient.patientRef,
          socialRef: editData ? editData['social_id'] : "",
          activityName: editData ? editData['activity_name'] : "",
          fromDate: editData ? moment(editData['from_date']).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
          toDate: editData ? moment(editData['to_date']).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
          comment: editData ? editData['comment'] : "",
          status: editData ? editData['status'] : "",
        }
        }
        enableReinitialize={true}
        validationSchema={socialHistoryFormSchema}
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
                      name="activityName"
                      label="Activity Name"
                      placeholder="Enter Activity Name"
                      value={values.activityName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.activityName ? errors.activityName : ""
                      }
                      error={touched.activityName ? errors.activityName : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="From Date"
                      value={values.fromDate}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("fromDate", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="fromDate"
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
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("toDate", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="toDate"
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
                      helperText={touched.status ? errors.status : ""}
                      error={touched.status ? errors.status : ""}
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
                      helperText={touched.comment ? errors.comment : ""}
                      error={touched.comment ? errors.comment : ""}
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
export default SocialHistoryForm;
