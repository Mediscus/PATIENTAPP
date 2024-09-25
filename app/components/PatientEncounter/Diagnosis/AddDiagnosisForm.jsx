import React, { useCallback, useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import Send from "@mui/icons-material/Send";
import {
  TextField as MuiTextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { TextField } from "dan-components";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import styles from "../../../containers/Pages/Pages-jss";
import { withStyles } from "@mui/styles";
import { getBodySite, getDiagnosisList } from "./DiagnosisAction";
import _debounce from "lodash/debounce";
import { useDropDownValues } from "../../Common/useDropDownValues";

function AddDiagnosisForm(props) {
  const patient = useParams();
  const dispatch = useDispatch();
  const {
    closeForm,
    type,
    encounterData,
    data,
    callBack,
    setMessage,
    classes,
    inputChange,
  } = props;
  const { height, width } = useWindowDimensions();
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [conditionSeverityList, setConditionSeverityList] = useState([]);
  const [formData, setFormData] = useState({
    DiagnosisName: "",
    AddedByDr: "",
    Sequence: "",
    file: "",
  });
  const initialState = {
    DiagnosisName: null,
    conditionClinical: null,
    conditionVerificationStatus: null,
    conditionSeverity: null,
    conditionBodySite: null,
    AddedByDr: "",
    Sequence: "",
    file: "",
    selectedDate: new Date(),
  };
  const errInitialState = {
    DiagnosisName: "",
    conditionClinical: "",
    conditionVerificationStatus: "",
    conditionSeverity: "",
    conditionBodySite: "",
    AddedByDr: "",
    Sequence: "",
    file: "",
    selectedDate: "",
  };
  const [diagnosisD, setDiagnosisD] = useState(initialState);
  const [errDiagnosis, setErrDiagnosis] = useState(errInitialState);
  const [diagnosisValue, setDiagnosisValue] = useState("");
  const [bodySiteValue, setBodySiteValue] = useState("");
  const conditionClinicalList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/condition-clinical"
  );
  const conditionVerificationList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/condition-ver-status"
  );

  const handleDateChange = (date) => {
    setDiagnosisD({ ...diagnosisD, selectedDate: date });
    setErrDiagnosis({ ...errDiagnosis, selectedDate: "" });
  };

  useEffect(() => {
    fetchSeverityList();
  }, []);

  const fetchSeverityList = async () => {
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_API_ENDPOINT}http://hl7.org/fhir/ValueSet/condition-severity`
      );

      if (getResponse.hasOwnProperty("data")) {
        const severityList = getResponse.data.compose.include[0].concept;
        const sevObj = [];
        severityList.forEach((sevCode) => {
          switch (sevCode.code) {
            case "24484000":
              sevObj.push({
                code: sevCode.code,
                system: "http://snomed.info/sct",
                display: "Severe",
              });
              break;
            case "6736007":
              sevObj.push({
                code: sevCode.code,
                system: "http://snomed.info/sct",
                display: "Moderate",
              });
              break;
            case "255604002":
              sevObj.push({
                code: sevCode.code,
                system: "http://snomed.info/sct",
                display: "Mild",
              });
              break;

            default:
              break;
          }
        });
        setConditionSeverityList(sevObj);
      } else {
        setConditionSeverityList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const {
    diagnosisList,
    diagnosisListLoader,
    bodySiteList,
    bodySiteListLoader,
  } = useSelector((state) => state.diagnosis);
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

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
    bodySiteListResult(bodySiteValue);
  }, [bodySiteValue]);

  const handleBodySiteDebounceFun = (ipValue) => {
    getBodySite(dispatch, ipValue);
  };

  const bodySiteListResult = useCallback(
    _debounce(handleBodySiteDebounceFun, 200),
    []
  );

  const handleDiagnosesForm = () => {
    setOpenDiagnosesForm(true);
  };

  const submitForm = () => {
    alert("Data Submit");
    console.log("formData", formData);
  };

  const handleDiagnosisChange = (e, value, name) => {
    setDiagnosisD({ ...diagnosisD, [name]: value });
    setErrDiagnosis({ ...errDiagnosis, [name]: "" });
  };

  const validation = () => {
    var isValid = true;
    var error = { ...errDiagnosis };
    Object.keys(diagnosisD).forEach((key) => {
      if (
        ["selectedDate", "AddedByDr", "Sequence", "file"].findIndex(
          (e) => e !== key
        ) > -1 &&
        diagnosisD[key] === null
      ) {
        console.log(key);
        isValid = false;
        let name = key;
        switch (key) {
          case "DiagnosisName":
            name = "diagnosis name";
            break;
          case "conditionClinical":
            name = "clinical status";
            break;
          case "conditionSeverity":
            name = "severity";
            break;
          case "conditionVerificationStatus":
            name = "verification status";
            break;
          case "conditionBodySite":
            name = "body site";
            break;
          default:
            break;
        }
        error[key] = `Please select ${name}`;
      }
    });
    setErrDiagnosis(error);
    return isValid;
  };

  const postDiagnosis = () => {
    const isValid = validation();
    console.log(JSON.stringify(diagnosisD));

    if (isValid) {
      const diagnosisPostData = {
        resourceType: "Condition",
        id: "example",
        text: {
          status: "generated",
          div: `<div xmlns="http://www.w3.org/1999/xhtml">${
            data.DiagnosisName.term
          } (Date: ${new Date(data.selectedDate).toLocaleDateString(
            "en-GB"
          )})</div>`,
        },
        clinicalStatus: {
          coding: [
            {
              system: data.conditionClinical.system,
              code: data.conditionClinical.code,
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system: data.conditionVerificationStatus.system,
              code: data.conditionVerificationStatus.code,
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
                display: "Encounter Diagnosis",
              },
              {
                system: "http://snomed.info/sct",
                code: "439401001",
                display: "Diagnosis",
              },
            ],
          },
        ],
        severity: {
          coding: [
            {
              system: data.conditionSeverity.system,
              code: data.conditionSeverity.code,
              display: data.conditionSeverity.display,
            },
          ],
        },
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: data.DiagnosisName.conceptId,
              display: data.DiagnosisName.term,
            },
          ],
          text: data.DiagnosisName.term,
        },
        bodySite: [
          {
            coding: [
              {
                system: data.conditionBodySite.system,
                code: data.conditionBodySite.conceptId,
                display: data.conditionBodySite.term,
              },
            ],
            text: data.conditionBodySite.term,
          },
        ],
        subject: {
          reference: "Patient/example",
        },
        onsetDateTime: data.selectedDate,
      };

      console.log(diagnosisPostData);
    }
  };

  return (
    <form onSubmit={postDiagnosis}>
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
            height: height - 175,
            // maxHeight: height - 140,
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
                options={diagnosisList}
                ListboxProps={{ style: { maxHeight: 150 } }}
                getOptionLabel={(option) => option.term || ""}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || option.term === value.term
                }
                value={diagnosisD.DiagnosisName}
                name="DiagnosisName"
                id="DiagnosisName"
                onChange={(e, value) =>
                  handleDiagnosisChange(e, value, "DiagnosisName")
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
                      errDiagnosis.DiagnosisName
                        ? errDiagnosis.DiagnosisName
                        : ""
                    }
                    error={Boolean(
                      errDiagnosis.DiagnosisName
                        ? errDiagnosis.DiagnosisName
                        : ""
                    )}
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
            <Grid item xs={12} sm={12}>
              <Autocomplete
                className={classes.AutoComplete}
                name="conditionClinical"
                options={conditionClinicalList}
                getOptionLabel={(option) => option.display || ""}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                value={diagnosisD.conditionClinical}
                onChange={(e, value) =>
                  handleDiagnosisChange(e, value, "conditionClinical")
                }
                ListboxProps={{ style: { maxHeight: 150 } }}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    fullWidth
                    id="conditionClinical"
                    label={
                      <>
                        Clinical Status of diagosis
                        <sup style={{ color: "red" }}>*</sup>
                      </>
                    }
                    onChange={handleChange}
                    helperText={
                      errDiagnosis.conditionClinical
                        ? errDiagnosis.conditionClinical
                        : ""
                    }
                    error={Boolean(
                      errDiagnosis.conditionClinical
                        ? errDiagnosis.conditionClinical
                        : ""
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                className={classes.AutoComplete}
                name="conditionVerificationStatus"
                options={conditionVerificationList}
                getOptionLabel={(option) => option.display || ""}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                value={diagnosisD.conditionVerificationStatus}
                onChange={(e, value) =>
                  handleDiagnosisChange(e, value, "conditionVerificationStatus")
                }
                ListboxProps={{ style: { maxHeight: 150 } }}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    fullWidth
                    id="conditionVerificationStatus"
                    label={
                      <>
                        Verification Status of diagosis
                        <sup style={{ color: "red" }}>*</sup>
                      </>
                    }
                    onChange={handleChange}
                    helperText={
                      errDiagnosis.conditionVerificationStatus
                        ? errDiagnosis.conditionVerificationStatus
                        : ""
                    }
                    error={Boolean(
                      errDiagnosis.conditionVerificationStatus
                        ? errDiagnosis.conditionVerificationStatus
                        : ""
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                className={classes.AutoComplete}
                name="conditionSeverity"
                options={conditionSeverityList}
                getOptionLabel={(option) => option.display || ""}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                value={diagnosisD.conditionSeverity}
                onChange={(e, value) =>
                  handleDiagnosisChange(e, value, "conditionSeverity")
                }
                ListboxProps={{ style: { maxHeight: 150 } }}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    fullWidth
                    id="conditionSeverity"
                    label={
                      <>
                        Severity of diagosis
                        <sup style={{ color: "red" }}>*</sup>
                      </>
                    }
                    onChange={handleChange}
                    helperText={
                      errDiagnosis.conditionSeverity
                        ? errDiagnosis.conditionSeverity
                        : ""
                    }
                    error={Boolean(
                      errDiagnosis.conditionSeverity
                        ? errDiagnosis.conditionSeverity
                        : ""
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                className={classes.AutoComplete}
                options={bodySiteList}
                ListboxProps={{ style: { maxHeight: 150 } }}
                getOptionLabel={(option) => option.term || ""}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || option.term === value.term
                }
                value={diagnosisD.conditionBodySite}
                name="conditionBodySite"
                id="conditionBodySite"
                onChange={(e, value) =>
                  handleDiagnosisChange(e, value, "conditionBodySite")
                }
                onInputChange={(event, newInputValue) => {
                  setBodySiteValue(newInputValue);
                }}
                loading={bodySiteListLoader}
                noOptionsText={
                  bodySiteValue.length === 0
                    ? "Enter value for search"
                    : "No options found"
                }
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    fullWidth
                    label={
                      <>
                        Enter diagnosis body site
                        <sup style={{ color: "red" }}>*</sup>
                      </>
                    }
                    helperText={
                      errDiagnosis.conditionBodySite
                        ? errDiagnosis.conditionBodySite
                        : ""
                    }
                    error={Boolean(
                      errDiagnosis.conditionBodySite
                        ? errDiagnosis.conditionBodySite
                        : ""
                    )}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {bodySiteListLoader ? (
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
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Added Reference"
                placeholder="Added Reference"
                value={formData.AddedByDr}
                onChange={handleChange("AddedByDr")}
              />
            </Grid>
            <Grid item sm={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  label="Start Date"
                  format="DD/MM/YYYY"
                  placeholder="10/10/2018"
                  value={diagnosisD.selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling={false}
                  style={{ width: "100%" }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Sequence"
                placeholder="testing data"
                value={formData.Sequence}
                onChange={handleChange("Sequence")}
              />
            </Grid>
            <Grid item sm={6}>
              <Button
                variant="contained"
                component="label"
                size="large"
                style={{ marginTop: 15, width: "100%" }}
              >
                Attach Report
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className={css.buttonArea}>
          <Button type="button">Discard</Button>
          <Button variant="contained" color="secondary" onClick={postDiagnosis}>
            Save&nbsp;
            <Send />
          </Button>
        </div>
      </Box>
    </form>
  );
}

export default withStyles(styles)(AddDiagnosisForm);
