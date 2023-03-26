import React, { useContext, useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import Send from "@mui/icons-material/Send";
import apiCall from "dan-redux/apiInterface";
import { allergiesFormSchema } from "dan-api/schema";
import { useParams } from "react-router-dom";

function AllergiesForm(props) {
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

  const pastAllergies = async (values, setErrors, setStatus, setSubmitting) => {
    await apiCall("ehr/allergies", "post", values)
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
      title={type === 'edit' ? "Edit Allergy" : "Add Allergy"}
      extraSize={false}
    >
      <Formik
        initialValues={{
          patientRef: patient && patient.patientRef,
          allergiesRef: editData ? editData['allergies_id'] : '',
          allergyType: editData ? editData['allergy_type'] : '',
          allergyName: editData ? editData['allergy_name'] : '',
        }}
        enableReinitialize={true}
        validationSchema={allergiesFormSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          pastAllergies(values, setErrors, setStatus, setSubmitting);
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
                      id="allergyType"
                      label="Allergy Type"
                      value={values.allergyType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.allergyType ? errors.allergyType : ""}
                      error={touched.allergyType ? errors.allergyType : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="allergyName"
                      label="Allergy Name"
                      value={values.allergyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.allergyName ? errors.allergyName : ""}
                      error={touched.allergyName ? errors.allergyName : ""}
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

// AllergiesForm.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default AllergiesForm;
