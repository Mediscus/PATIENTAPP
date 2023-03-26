import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, DatePicker } from "dan-components";
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { TextField as MuiTextField } from "@mui/material";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";
import moment from "moment";
import { menstrualHistoryFormSchema } from "dan-api/schema";

function MenstrualHistoryForm(props) {
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

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Menstrual History"
      extraSize={false}
    >
      <Formik
        initialValues={{
          patient_ref: '',
          menstrual_ref: '',
          cycle_duration: '',
          period_duration: '',
          period_date: moment(new Date()).format("YYYY-MM-DD"),
          ovulation_date: moment(new Date()).format("YYYY-MM-DD"),
        }}
        enableReinitialize={true}
        validationSchema={menstrualHistoryFormSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log('values:', values)
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
                      type="number"
                      name="cycle_duration"
                      label="Menstraul cycle duration :"
                      placeholder="Menstraul cycle duration :"
                      value={values.cycle_duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.cycle_duration ? errors.cycle_duration : ""
                      }
                      error={touched.cycle_duration ? errors.cycle_duration : ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography>/ Days</Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="period_duration"
                      label="Menstraul period duration :"
                      placeholder="Menstraul period duration :"
                      value={values.period_duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.period_duration ? errors.period_duration : ""
                      }
                      error={touched.period_duration ? errors.period_duration : ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography>/ Days</Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="Last Menstrual Period day:"
                      value={values.period_date}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("period_date", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="period_date"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label="Ovulation Day"
                      value={values.ovulation_date}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setFieldValue("ovulation_date", date, true);
                      }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          name="ovulation_date"
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

export default MenstrualHistoryForm;
