
import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import moment from "moment";
import { Formik } from "formik";
import { TextField as MuiTextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { FloatingPanel, DatePicker, TextField, MaterialDropZone } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
//import { prepareFormData } from "../../../redux/apiInterFace";

function AddReport(props) {
  const patient = useParams();
  const { open, encounterData, closeForm, data, type, callBack, setMessage } = props;
  const [reportFiles, setReportFiles] = useState([]);
  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (type == 'edit') {
      setEditData(data)
    } else {
      setEditData({})
    }
  }, []);

  let callBackOnDrop = (data) => {
    setReportFiles(data)
  }

  const postReports = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    let prepareData = new FormData();
    prepareData.append('patientRef', values.patientRef)
    prepareData.append('encounterRef', values.encounterRef)
    prepareData.append('reportRef', values.reportRef)
    prepareData.append('investigation', values.investigation)
    prepareData.append('investigationDate', values.investigationDate)
    prepareData.append('investigationType', values.investigationType)
    prepareData.append('comment', values.comment)
    values.files.forEach((item, i) => {
      prepareData.append("files", item);
    });

    await apiCall("ehr/reports", "post", prepareData)
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
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Add Reports"
      extraSize={false}
    >
      <Formik
        initialValues={{
          patientRef: patient && patient.patientRef,
          encounterRef: encounterData && encounterData.appointment_id,
          reportRef: Object.keys(editData).length > 0 ? editData['report_id'] : '',
          investigation: Object.keys(editData).length > 0 ? editData['investigation'] : '',
          investigationDate: Object.keys(editData).length > 0 ? moment(editData['investigation_date']).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
          investigationType: Object.keys(editData).length > 0 ? editData['investigation_type'] : '',
          comment: Object.keys(editData).length > 0 ? editData['comment'] : '',
          files: reportFiles,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          postReports(values, setErrors, setStatus, setSubmitting);
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
                      label="Investigation Date"
                      value={values.investigationDate}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("investigationDate", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="investigationDate"
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
                  <Grid item xs={12} sm={12}>
                    <MaterialDropZone
                      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                      callBackOnDrop={callBackOnDrop}
                      showPreviews
                      maxSize={5000000}
                      filesLimit={5}
                      text="Drag and drop Reports file(s) here"
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

export default AddReport;
