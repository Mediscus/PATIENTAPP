import React, { useContext, useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import { useParams } from "react-router-dom";

function AddMessages(props) {
  const patient = useParams();
  const doctorRef = localStorage.getItem('doctorRef');
  const { open, closeForm, data, type } = props;
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
      title={"Messages"}
      extraSize={false}
    >
      <Formik
        initialValues={{
          receiver_ref: patient && patient.patientRef,
          sender_ref: doctorRef,
          message: editData ? editData['message'] : ''
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
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
                      id="message"
                      label="Message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.message ? errors.message : ""}
                      error={touched.message ? errors.message : ""}
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

export default AddMessages;
