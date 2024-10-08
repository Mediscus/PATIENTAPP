import React, { useCallback, useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField as MuiTextField,
} from "@mui/material";
import { Formik } from "formik";
import Send from "@mui/icons-material/Send";
import { DatePicker, TextField, FloatingPanel } from "dan-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { encounterFormSchema } from "dan-api/schema";
import styles from "../../../../Pages-jss";
import { withStyles } from "@mui/styles";
import { useDropDownValues } from "../../../../../../components/Common/useDropDownValues";
import axios from "axios";
import { getDiagnosisList } from "../../../../../../components/PatientEncounter/Diagnosis/DiagnosisAction";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

function AddEncounters(props) {
  const { classes, open, closeForm, data, type, callBack, setMessage } = props;
  const dispatch = useDispatch();
  const initialState = {
    language: null,
    serviceCategory: null,
    state: null,
    hospital: null,
    appointmentType: null,
    appointmentSpeciality: null,
    doctor: null,
    appointmentDiagnosisReason: null,
    visitDate: moment().format("YYYY-MM-DD"),
    visitTime: dayjs(new Date().toLocaleTimeString("en-GB"), "HH:mm:ss"),
    description: "",
  };
  const [appointmentD, setAppointmentD] = useState(initialState);
  const errInitialState = {
    language: "",
    serviceCategory: "",
    state: "",
    hospital: "",
    appointmentType: "",
    appointmentSpeciality: "",
    doctor: "",
    appointmentDiagnosisReason: "",
    visitDate: "",
    visitTime: "",
    description: "",
  };
  const [errAppointmentD, setErrAppointmentD] = useState(errInitialState);

  const [diagnosisValue, setDiagnosisValue] = useState("");
  const [appointmentSpeList, setAppointmentSpeList] = useState([]);
  const { height } = useWindowDimensions();
  const { diagnosisList, diagnosisListLoader } = useSelector(
    (state) => state.diagnosis
  );
  const languages = useDropDownValues("http://hl7.org/fhir/ValueSet/languages");
  const appointmentServiceCategory = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/service-category"
  );
  const appointmentTypeList = useDropDownValues(
    "http://terminology.hl7.org/ValueSet/v2-0276"
  );

  useEffect(() => {
    diagnosisListResult(diagnosisValue);
  }, [diagnosisValue]);

  const handleDiagnosisDebounceFun = (ipValue) => {
    getDiagnosisList(dispatch, ipValue);
  };

  const diagnosisListResult = useCallback(
    _debounce(handleDiagnosisDebounceFun, 200),
    []
  );

  useEffect(() => {
    fetchAppointmentSpeList();
  }, []);

  const fetchAppointmentSpeList = async () => {
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_API_ENDPOINT}http://hl7.org/fhir/ValueSet/c80-practice-codes`
      );
      if (getResponse.hasOwnProperty("data")) {
        setAppointmentSpeList(getResponse.data.compose.include[0].concept);
      } else {
        setAppointmentSpeList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAppointmentChange = (e, value, name) => {
    setAppointmentD({ ...appointmentD, [name]: value });
    setErrAppointmentD({ ...errAppointmentD, [name]: "" });
  };

  const validation = () => {
    var isValid = true;
    var error = { ...errAppointmentD };
    Object.keys(appointmentD).forEach((key) => {
      if (
        ["description"].findIndex((e) => e !== key) > -1 &&
        (appointmentD[key] === null || appointmentD[key].length === 0)
      ) {
        isValid = false;
        let name = key;
        switch (key) {
          case "serviceCategory":
            name = "service category";
            break;
          case "appointmentSpeciality":
            name = "appointment speciality";
            break;
          case "appointmentDiagnosisReason":
            name = "diagnosis name";
            break;
          case "appointmentType":
            name = "appointment type";
            break;
          default:
            break;
        }
        error[key] = `Please select ${name}`;
      }
    });
    setErrAppointmentD(error);
    return isValid;
  };

  const resestState = () => {
    setAppointmentD(initialState);
    setErrAppointmentD(errAppointmentD);
    closeForm();
  };
  const saveAppointment = async (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      try {
        // Prepare the FHIR Appointment structure
        const fhirAppointment = {
          resourceType: "Appointment",
          id: "example-01",
          meta: {
            profile: [
              "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Appointment",
            ],
          },
          text: {
            status: "generated",
            div: `<div xmlns="http://www.w3.org/1999/xhtml">${
              appointmentD.description || "No description provided"
            }</div>`,
          },
          status: "booked",
          serviceCategory: [
            {
              coding: [
                {
                  system: appointmentD.serviceCategory.system,
                  code: appointmentD.serviceCategory.code,
                  display: appointmentD.serviceCategory.display,
                },
              ],
            },
          ],
          serviceType: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "11429006", // Presumably fixed code for 'Consultation'
                  display: "Consultation",
                },
              ],
            },
          ],
          specialty: [
            {
              coding: [
                {
                  system: appointmentD.appointmentSpeciality.system,
                  code: appointmentD.appointmentSpeciality.code,
                  display: appointmentD.appointmentSpeciality.display,
                },
              ],
            },
          ],
          appointmentType: {
            coding: [
              {
                system: appointmentD.appointmentType.system,
                code: appointmentD.appointmentType.code,
                display: appointmentD.appointmentType.display,
              },
            ],
          },
          reasonCode: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: appointmentD.appointmentDiagnosisReason.conceptId,
                },
              ],
              text: appointmentD.appointmentDiagnosisReason.term,
            },
          ],
          description: appointmentD.description,
          start: new Date(appointmentD.visitTime).toISOString(), // Start time of the appointment
          end: new Date(
            new Date(appointmentD.visitTime).getTime() + 30 * 60000
          ).toISOString(), // End time (+30 minutes)
          created: new Date().toISOString(), // Current creation time
          participant: [
            {
              actor: {
                reference: "Patient/example-01", // Can be customized
              },
              status: "accepted",
            },
            {
              actor: {
                reference: `Practitioner/${appointmentD.doctor}`, // Can be customized based on the doctor
                display: appointmentD.doctor,
              },
              status: "accepted",
            },
          ],
        };

        // Log the transformed data
        console.log(JSON.stringify(fhirAppointment));

        // Perform your actual logic, e.g., sending to an API
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const saveAppointment = async (e) => {
  //   e.preventDefault();
  //   const isValid = validation();
  //   if (isValid) {
  //     try {
  //       console.log(JSON.stringify(appointmentD));

  //       // resestState();
  //       // addCareContext();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     // resestState();
  //     // console.log(values);
  //     // dispatch(addCareContext());
  //     // await apiCall("appointment/save", "post", values)
  //     //   .then((res) => {
  //     //     if (res && res.Status === "Success") {
  //     //       setMessage("success", "Data saved successfully!");
  //     //       setStatus({ success: true });
  //     //       callBack(true);
  //     //     }
  //     //   })
  //     //   .catch((Error) => {
  //     //     let ErrorMessage = Error.ErrorMessage;
  //     //     if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
  //     //       ErrorMessage = Error.ErrorMessage.join("\n");
  //     //     }
  //     //     setMessage("error", ErrorMessage);
  //     //   });
  //   }
  // };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={resestState}
      title={"Appointment"}
      extraSize={false}
    >
      <Formik
        initialValues={appointmentD}
        enableReinitialize={true}
        validationSchema={encounterFormSchema}
        onSubmit={async () => {
          saveAppointment();
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
          values,
        }) => (
          <form onSubmit={saveAppointment}>
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
                      className={classes.AutoComplete}
                      name="language"
                      options={languages}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={appointmentD.language}
                      onChange={(e, value) =>
                        handleAppointmentChange(e, value, "language")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="language"
                          label={
                            <>
                              Select language
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errAppointmentD.language
                              ? errAppointmentD.language
                              : ""
                          }
                          error={
                            errAppointmentD.language.length > 0
                              ? errAppointmentD.language
                              : ""
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="serviceCategory"
                      options={appointmentServiceCategory}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={appointmentD.serviceCategory}
                      onChange={(e, value) =>
                        handleAppointmentChange(e, value, "serviceCategory")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="serviceCategory"
                          label={
                            <>
                              Service category of appointment
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errAppointmentD.serviceCategory
                              ? errAppointmentD.serviceCategory
                              : ""
                          }
                          error={Boolean(
                            errAppointmentD.serviceCategory
                              ? errAppointmentD.serviceCategory
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="state"
                      options={["Maharashta", "Delhi", "Kerala", "Telangana"]}
                      getOptionLabel={(option) => option || ""}
                      isOptionEqualToValue={(option, value) => option === value}
                      value={appointmentD.state}
                      onChange={(e, value) =>
                        handleAppointmentChange(e, value, "state")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="state"
                          label={
                            <>
                              Select state
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errAppointmentD.state ? errAppointmentD.state : ""
                          }
                          error={Boolean(
                            errAppointmentD.state ? errAppointmentD.state : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="hospital"
                      options={["Hospital 1", "Hospital 2", "Hospital 3"]}
                      getOptionLabel={(option) => option || ""}
                      isOptionEqualToValue={(option, value) => option === value}
                      value={appointmentD.hospital}
                      onChange={(e, value) =>
                        handleAppointmentChange(e, value, "hospital")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="hospital"
                          label={
                            <>
                              Select hospital
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errAppointmentD.hospital
                              ? errAppointmentD.hospital
                              : ""
                          }
                          error={Boolean(
                            errAppointmentD.hospital
                              ? errAppointmentD.hospital
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="appointmentSpeciality"
                      options={appointmentSpeList}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={appointmentD.appointmentSpeciality}
                      onChange={(e, value) =>
                        handleAppointmentChange(
                          e,
                          value,
                          "appointmentSpeciality"
                        )
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="appointmentSpeciality"
                          label={
                            <>
                              Speciality of appointment
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errAppointmentD.appointmentSpeciality
                              ? errAppointmentD.appointmentSpeciality
                              : ""
                          }
                          error={Boolean(
                            errAppointmentD.appointmentSpeciality
                              ? errAppointmentD.appointmentSpeciality
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="doctor"
                      options={["Doctor 1", "Doctor 2", "Doctor 3"]}
                      getOptionLabel={(option) => option || ""}
                      isOptionEqualToValue={(option, value) => option === value}
                      value={appointmentD.doctor}
                      onChange={(e, value) =>
                        handleAppointmentChange(e, value, "doctor")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="doctor"
                          label={
                            <>
                              Select doctor
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errAppointmentD.doctor ? errAppointmentD.doctor : ""
                          }
                          error={Boolean(
                            errAppointmentD.doctor ? errAppointmentD.doctor : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      options={diagnosisList}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      getOptionLabel={(option) => option.term || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id || option.term === value.term
                      }
                      value={appointmentD.appointmentDiagnosisReason}
                      name="appointmentDiagnosisReason"
                      id="appointmentDiagnosisReason"
                      onChange={(e, value) =>
                        handleAppointmentChange(
                          e,
                          value,
                          "appointmentDiagnosisReason"
                        )
                      }
                      onInputChange={(event, newInputValue) => {
                        setDiagnosisValue(newInputValue);
                      }}
                      loading={diagnosisListLoader}
                      noOptionsText={
                        diagnosisValue.length === 0
                          ? "Enter value for search"
                          : "No options found"
                      }
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          label={
                            <>
                              Enter diagnosis name
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errAppointmentD.appointmentDiagnosisReason
                              ? errAppointmentD.appointmentDiagnosisReason
                              : ""
                          }
                          error={
                            errAppointmentD.appointmentDiagnosisReason.length >
                            0
                              ? errAppointmentD.appointmentDiagnosisReason
                              : ""
                          }
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {diagnosisListLoader ? (
                                  <CircularProgress size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      label={
                        <>
                          Visit date<sup style={{ color: "red" }}>*</sup>
                        </>
                      }
                      value={appointmentD.visitDate}
                      onChange={(value) => {
                        const date = moment(value).format("YYYY-MM-DD");
                        setAppointmentD({ ...appointmentD, visitDate: date });
                      }}
                      renderInput={(params) => (
                        <MuiTextField {...params} fullWidth name="visitDate" />
                      )}
                      helperText={
                        errAppointmentD.visitDate
                          ? errAppointmentD.visitDate
                          : ""
                      }
                      error={
                        errAppointmentD.visitDate.length > 0
                          ? errAppointmentD.visitDate
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        ampm={false}
                        openTo="hours"
                        views={["hours", "minutes", "seconds"]}
                        inputFormat="HH:mm:ss"
                        mask="__:__:__"
                        label={
                          <>
                            Visit time<sup style={{ color: "red" }}>*</sup>
                          </>
                        }
                        value={appointmentD.visitTime}
                        onChange={(value) => {
                          const time = new Date(value).toLocaleTimeString(
                            "en-GB"
                          );
                          setAppointmentD({
                            ...appointmentD,
                            visitTime: dayjs(time, "HH:mm:ss"),
                          });
                        }}
                        renderInput={(params) => (
                          <MuiTextField
                            {...params}
                            fullWidth
                            name="visitTime"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="appointmentType"
                      options={appointmentTypeList}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={appointmentD.appointmentType}
                      onChange={(e, value) =>
                        handleAppointmentChange(e, value, "appointmentType")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="appointmentType"
                          label={
                            <>
                              Select appointment type
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errAppointmentD.appointmentType
                              ? errAppointmentD.appointmentType
                              : ""
                          }
                          error={Boolean(
                            errAppointmentD.appointmentType
                              ? errAppointmentD.appointmentType
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="description"
                      label="Description"
                      multiline
                      maxRows={5}
                      value={appointmentD.description}
                      onChange={(e) =>
                        handleAppointmentChange(
                          e,
                          e.target.value,
                          "description"
                        )
                      }
                      helperText={
                        errAppointmentD.description
                          ? errAppointmentD.description
                          : ""
                      }
                      error={
                        errAppointmentD.description
                          ? errAppointmentD.description
                          : ""
                      }
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={css.buttonArea}>
                <Button type="button" onClick={resestState}>
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
export default withStyles(styles)(AddEncounters);

// export default AddEncounters;
