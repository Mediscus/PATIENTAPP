import FlowSheets from "../../../../../../components/PatientEncounter/FlowSheets";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "dan-styles/Form.scss";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import apiCall from "dan-redux/apiInterface";
import { Formik } from "formik";
import { useParams } from "react-router-dom";

function AddObservationGeneralAssessment(props) {
  const patient = useParams();
  const { open, closeForm, data, callBack, setMessage } = props;
  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();

  useEffect(() => {
    setEditData(data);
  }, []);

  const postPersonalHistory = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    try {
      const res = await apiCall(
        "http://localhost:3000/api/ObservationGeneralAssessment",
        "post",
        values
      );

      setMessage("success", "Data saved Successfully!");
      setStatus({ success: true });
      callBack(true);
    } catch (error) {
      console.log("Error:", error);
      let errorMessage = error.message;
      if (
        error.response &&
        error.response.data &&
        error.response.data.ErrorMessage
      ) {
        errorMessage = error.response.data.ErrorMessage;
      }
      setMessage("error", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      branch="HELLO"
      title="Body Measurement"
      extraSize={false}
    >
      <Formik
        initialValues={{
          resourceType: "",
          id: "1",
          meta: {
            profile: [""],
          },
          text: {
            status: "",
            div: "",
          },
          status: "",
          code: {
            coding: [
              {
                system: "",
                code: "",
                display: "",
              },
            ],
            text: "",
          },
          subject: {
            reference: "",
          },
          performer: [
            {
              reference: "",
            },
          ],
          valueQuantity: {
            value: "",
            unit: "",
            system: "",
            code: "",
          },
        }}
        enableReinitialize={true}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          postPersonalHistory(values, setErrors, setStatus, setSubmitting);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          setTextField,
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
                }}
              >
                <FlowSheets />
              </div>
              <div className={css.buttonArea}>
                <Button type="button" onClick={closeForm}>
                  Discard
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save&nbsp;
                  <Send style={{ marginLeft: 10 }} />
                </Button>
              </div>
            </Box>
          </form>
        )}
      </Formik>
    </FloatingPanel>
  );
}

export default AddObservationGeneralAssessment;
