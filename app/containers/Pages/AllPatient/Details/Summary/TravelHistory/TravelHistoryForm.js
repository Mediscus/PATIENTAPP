import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField, DatePicker } from "dan-components";
import { TextField as MuiTextField } from "@mui/material";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { travelHistoryFormSchema } from "dan-api/schema";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import moment from "moment";
import { useParams } from "react-router-dom";

function TravelHistoryForm(props) {
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
    await apiCall("ehr/travel-history", "post", values)
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
      title="Travel History"
      extraSize={false}
    >
      <Formik
        initialValues={{
          patientRef: patient && patient.patientRef,
          travelRef: editData ? editData['travel_id'] : '',
          source: editData ? editData['source'] : '',
          destination: editData ? editData['destination'] : '',
          journeyDate: editData ? moment(editData['journeyDate']).format("YYYY-MM-DD") : ''
        }}
        enableReinitialize={true}
        validationSchema={travelHistoryFormSchema}
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
                      name="source"
                      label="Source"
                      placeholder="Enter Source"
                      value={values.source}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.source ? errors.source : ""}
                      helperText={touched.source ? errors.source : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="destination"
                      label="Destination"
                      placeholder="Enter Destination"
                      value={values.destination}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.destination ? errors.destination : ""}
                      helperText={touched.destination ? errors.destination : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="Journey Date"
                      value={values.journeyDate}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("journeyDate", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="journeyDate"
                          variant="standard"
                        />
                      )}
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

// TravelHistoryForm.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default TravelHistoryForm;
