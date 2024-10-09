import React, { useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel } from "dan-components";
import { Box, Button, Grid, TextField } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { Formik } from "formik";
import { lifestyleFormSchema } from "dan-api/schema";

function LifestyleForm(props) {
  const { open, closeForm, data, type } = props;
  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (type === "edit") {
      setEditData(data);
    } else {
      setEditData({});
    }
  }, []);

  const handleSave = (values) => {
    //Save logic, e.g., API call or local storage
    console.log("Saving data:", values);

    const jsonData = JSON.stringify(values);
    console.log("Saved data JSON:", jsonData);
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Life Style Information"
      extraSize={false}
    >
      <Formik
        initialValues={{
          dietType: editData.dietType || "",
          smokingStatus: editData.smokingStatus || "",
          alcoholConsumption: editData.alcoholConsumption || "",
          tobaccoChewing: editData.tobaccoChewing || "",
          exerciseFrequency: editData.exerciseFrequency || "",
          exerciseDuration: editData.exerciseDuration || "",
        }}
        enableReinitialize={true}
        validationSchema={lifestyleFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSave(values);
          setSubmitting(false);
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="dietType"
                      label={
                        <>
                          Diet Type
                          <sup style={{ color: "red" }}>*</sup>
                        </>
                      }
                      placeholder="Enter your diet type"
                      value={values.dietType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.dietType && errors.dietType}
                      error={touched.dietType && Boolean(errors.dietType)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="smokingStatus"
                      label={
                        <>
                          Enter smoking status
                          <sup style={{ color: "red" }}>*</sup>
                        </>
                      }
                      placeholder="Enter smoking status"
                      value={values.smokingStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.smokingStatus && errors.smokingStatus}
                      error={
                        touched.smokingStatus && Boolean(errors.smokingStatus)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="alcoholConsumption"
                      label={
                        <>
                          Enter alcohol consumption
                          <sup style={{ color: "red" }}>*</sup>
                        </>
                      }
                      placeholder="Enter alcohol consumption"
                      value={values.alcoholConsumption}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.alcoholConsumption && errors.alcoholConsumption
                      }
                      error={
                        touched.alcoholConsumption &&
                        Boolean(errors.alcoholConsumption)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="tobaccoChewing"
                      label={
                        <>
                          Enter Tobacco Chewing Status
                          <sup style={{ color: "red" }}>*</sup>
                        </>
                      }
                      placeholder="Enter Tobacco Chewing Status"
                      value={values.tobaccoChewing}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.tobaccoChewing && errors.tobaccoChewing
                      }
                      error={
                        touched.tobaccoChewing && Boolean(errors.tobaccoChewing)
                      }
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

export default LifestyleForm;
