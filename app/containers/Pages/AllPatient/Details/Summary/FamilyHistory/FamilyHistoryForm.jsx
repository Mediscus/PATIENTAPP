import React, { useState, useEffect, useCallback } from "react";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField, DatePicker } from "dan-components";
import { CircularProgress, TextField as MuiTextField } from "@mui/material";
import { Box, Button, Grid } from "@mui/material";
import Send from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik } from "formik";
import apiCall from "dan-redux/apiInterface";
import { familyHistoryFormSchema } from "dan-api/schema";
import moment from "moment";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../../../../Pages-jss";
import { useDropDownValues } from "../../../../../../components/Common/useDropDownValues";
import { useDispatch, useSelector } from "react-redux";
import _debounce from "lodash/debounce";
import {
  getBodySite,
  getDiagnosisList,
} from "../../../../../../components/PatientEncounter/Diagnosis/DiagnosisAction";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import axios from "axios";

function AddFamilyHistory(props) {
  const patient = useParams();
  const { classes, open, closeForm, data, type, callBack, setMessage } = props;
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({});
  const { height } = useWindowDimensions();
  const initialValues = {
    familyMember: null,
    fullName: "",
    familyHistoryStatus: null,
    administrativeGender: null,
    education: "",
    occupation: "",
    accountAssociation: "",
    dob: new Date(),
    age: "",
    DiagnosisName: null,
    conditionClinical: null,
    conditionVerificationStatus: null,
    conditionSeverity: null,
    conditionBodySite: null,
    AddedByDr: "",
    Sequence: "",
    file: "",
    selectedDate: new Date(),
    Sequence: "",
  };

  const errInitialState = {
    familyMember: "",
    fullName: "",
    familyHistoryStatus: "",
    administrativeGender: "",
    education: "",
    occupation: "",
    accountAssociation: "",
    dob: "",
    age: "",
    DiagnosisName: "",
    conditionClinical: "",
    conditionVerificationStatus: "",
    conditionSeverity: "",
    conditionBodySite: "",
    AddedByDr: "",
    Sequence: "",
    file: "",
    selectedDate: "",
    Sequence: "",
  };
  const [familyHistoryD, setFamilyHistoryD] = useState({ ...initialValues });
  const [errFamilyHistory, setErrFamilyHistory] = useState(errInitialState);
  const {
    diagnosisList,
    diagnosisListLoader,
    bodySiteList,
    bodySiteListLoader,
  } = useSelector((state) => state.diagnosis);
  const [diagnosisValue, setDiagnosisValue] = useState("");
  const [bodySiteValue, setBodySiteValue] = useState("");
  const [conditionSeverityList, setConditionSeverityList] = useState([]);

  const conditionClinicalList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/condition-clinical"
  );
  const conditionVerificationList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/condition-ver-status"
  );
  const familyMemberList = useDropDownValues(
    "http://terminology.hl7.org/ValueSet/v3-FamilyMember"
  );
  const familyHistoryStatusList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/history-status"
  );
  const genderList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/administrative-gender"
  );

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

  const validation = () => {
    var isValid = true;
    var error = { ...errFamilyHistory };
    Object.keys(familyHistoryD).forEach((key) => {
      if (
        [
          "education",
          "occupation",
          "accountAssociation",
          "selectedDate",
          "AddedByDr",
          "Sequence",
          "file",
          "age",
        ].findIndex((e) => e === key) === -1 &&
        (familyHistoryD[key] === null || familyHistoryD[key].length === 0)
      ) {
        isValid = false;
        let name = key;
        switch (key) {
          case "familyMember":
            name = "relationship of family member";
            break;
          case "fullName":
            name = "full name";
            break;
          case "familyHistoryStatus":
            name = "family history status";
            break;
          case "administrativeGender":
            name = "gender";
            break;
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
    setErrFamilyHistory(error);
    return isValid;
  };

  useEffect(() => {
    if (type == "edit") {
      setEditData(data);
    } else {
      setEditData({});
    }
  }, []);

  const handleFamilyHistoryChange = (e, value, name) => {
    console.error(name, value);
    setFamilyHistoryD({ ...familyHistoryD, [name]: value });
    setErrFamilyHistory({ ...errFamilyHistory, [name]: "" });
  };

  const handleDateChange = (date, name) => {
    setFamilyHistoryD({ ...familyHistoryD, [name]: date });
    setErrFamilyHistory({ ...errFamilyHistory, [name]: "" });
  };

  const postFamilyHistory = (e) => {
    e.preventDefault();
    const isValid = validation();
    console.log(familyHistoryD);

    if (isValid) {
      const familyHistoryD = {
        resourceType: "List",
        status: "current",
        mode: "snapshot",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8670-2",
              display: "History of family member diseases",
            },
          ],
        },
        subject: {
          reference: "Patient/f201",
          display: familyHistoryD.fullName,
        },
        contained: [
          {
            resourceType: "FamilyMemberHistory",
            id: "fmh-1",
            status: familyHistoryD.familyHistoryStatus.code,
            patient: {
              reference: "Patient/f201",
              display: familyHistoryD.fullName,
            },
            relationship: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                  code: familyHistoryD.familyMember.code,
                  display: familyHistoryD.familyMember.display,
                },
              ],
            },
            gender: familyHistoryD.administrativeGender.code,
            birthDate: familyHistoryD.dob,
            dataAbsentReason: {
              coding: [
                {
                  system: "http://hl7.org/fhir/data-absent-reason",
                  code: "unknown",
                  display: "Unknown",
                },
              ],
            },
            deceasedBoolean: false,
            condition: [
              {
                code: {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: familyHistoryD.DiagnosisName.conceptId,
                      display: familyHistoryD.DiagnosisName.term,
                    },
                  ],
                },
                reasonCode: [
                  {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: familyHistoryD.DiagnosisName.conceptId,
                        display: familyHistoryD.DiagnosisName.term,
                      },
                    ],
                  },
                ],
                outcome: {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: familyHistoryD.DiagnosisName.conceptId,
                      display: familyHistoryD.DiagnosisName.term,
                    },
                  ],
                },
                severity: {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: familyHistoryD.conditionSeverity.code,
                      display: familyHistoryD.conditionSeverity.display,
                    },
                  ],
                },
                clinicalStatus: {
                  coding: [
                    {
                      system:
                        "http://terminology.hl7.org/CodeSystem/condition-clinical",
                      code: familyHistoryD.conditionClinical.code,
                      display: familyHistoryD.conditionClinical.display,
                    },
                  ],
                },
                verificationStatus: {
                  coding: [
                    {
                      system:
                        "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                      code: familyHistoryD.conditionVerificationStatus.code,
                      display:
                        familyHistoryD.conditionVerificationStatus.display,
                    },
                  ],
                },
                bodySite: {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: familyHistoryD.conditionBodySite.conceptId,
                      display: familyHistoryD.conditionBodySite.term,
                    },
                  ],
                },
                onsetDateTime: familyHistoryD.selectedDate,
              },
            ],
            note: [
              {
                text: `Education: ${familyHistoryD.education}, Occupation: ${familyHistoryD.occupation}, Account Association: ${familyHistoryD.accountAssociation}`,
              },
              {
                text: `Age: ${familyHistoryD.age} years`,
              },
            ],
          },
        ],
        entry: [
          {
            item: {
              reference: "#fmh-1",
            },
          },
        ],
      };

      try {
        console.log(familyHistoryD);
        setMessage("success", "Date Saved Successfully!");
        setStatus({ success: true });
        callBack(true);
      } catch (err) {
        console.log(err);
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        setMessage("error", ErrorMessage);
      }
    }
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Family History"
      extraSize={false}
    >
      <Formik
        initialValues={familyHistoryD}
        enableReinitialize={true}
        validationSchema={familyHistoryFormSchema}
        onSubmit={postFamilyHistory}
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
          <form onSubmit={postFamilyHistory}>
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
                      name="familyMember"
                      options={familyMemberList}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={familyHistoryD.familyMember}
                      onChange={(e, value) =>
                        handleFamilyHistoryChange(e, value, "familyMember")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="familyMember"
                          label={
                            <>
                              Relationship
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errFamilyHistory.familyMember
                              ? errFamilyHistory.familyMember
                              : ""
                          }
                          error={Boolean(
                            errFamilyHistory.familyMember
                              ? errFamilyHistory.familyMember
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="fullName"
                      label={
                        <>
                          Enter full name
                          <sup style={{ color: "red" }}>*</sup>
                        </>
                      }
                      value={familyHistoryD.fullName}
                      onChange={(e) =>
                        handleFamilyHistoryChange(e, e.target.value, "fullName")
                      }
                      helperText={
                        errFamilyHistory.fullName
                          ? errFamilyHistory.fullName
                          : ""
                      }
                      error={
                        errFamilyHistory.fullName
                          ? errFamilyHistory.fullName
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="administrativeGender"
                      options={genderList}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={familyHistoryD.administrativeGender}
                      onChange={(e, value) =>
                        handleFamilyHistoryChange(
                          e,
                          value,
                          "administrativeGender"
                        )
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="administrativeGender"
                          label={
                            <>
                              Family member gender
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errFamilyHistory.administrativeGender
                              ? errFamilyHistory.administrativeGender
                              : ""
                          }
                          error={Boolean(
                            errFamilyHistory.administrativeGender
                              ? errFamilyHistory.administrativeGender
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="education"
                      label="Education"
                      placeholder="Enter Education"
                      value={familyHistoryD.education}
                      onChange={(e) =>
                        handleFamilyHistoryChange(
                          e,
                          e.target.value,
                          "education"
                        )
                      }
                      helperText={
                        errFamilyHistory.education
                          ? errFamilyHistory.education
                          : ""
                      }
                      error={
                        errFamilyHistory.education
                          ? errFamilyHistory.education
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="occupation"
                      label="Occupation"
                      placeholder="Enter Occupation"
                      value={familyHistoryD.occupation}
                      onChange={(e) =>
                        handleFamilyHistoryChange(
                          e,
                          e.target.value,
                          "occupation"
                        )
                      }
                      helperText={
                        errFamilyHistory.occupation
                          ? errFamilyHistory.occupation
                          : ""
                      }
                      error={
                        errFamilyHistory.occupation
                          ? errFamilyHistory.occupation
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="accountAssociation"
                      label="Account Association"
                      placeholder="Enter Account Association"
                      value={familyHistoryD.accountAssociation}
                      onChange={(e) =>
                        handleFamilyHistoryChange(
                          e,
                          e.target.value,
                          "accountAssociation"
                        )
                      }
                      helperText={
                        errFamilyHistory.accountAssociation
                          ? errFamilyHistory.accountAssociation
                          : ""
                      }
                      error={
                        errFamilyHistory.accountAssociation
                          ? errFamilyHistory.accountAssociation
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="familyHistoryStatus"
                      options={familyHistoryStatusList}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={familyHistoryD.familyHistoryStatus}
                      onChange={(e, value) =>
                        handleFamilyHistoryChange(
                          e,
                          value,
                          "familyHistoryStatus"
                        )
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="familyHistoryStatus"
                          label={
                            <>
                              Family history status
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          helperText={
                            errFamilyHistory.familyHistoryStatus
                              ? errFamilyHistory.familyHistoryStatus
                              : ""
                          }
                          error={Boolean(
                            errFamilyHistory.familyHistoryStatus
                              ? errFamilyHistory.familyHistoryStatus
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        label="Date Of Birth"
                        format="DD/MM/YYYY"
                        placeholder="10/10/2018"
                        value={familyHistoryD.dob}
                        onChange={(date) => handleDateChange(date, "dob")}
                        animateYearScrolling={false}
                        style={{ width: "100%" }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="age"
                      label="Age"
                      placeholder="Enter Age"
                      value={familyHistoryD.age}
                      onChange={(e) =>
                        handleFamilyHistoryChange(e, e.target.value, "age")
                      }
                      helperText={
                        errFamilyHistory.age ? errFamilyHistory.age : ""
                      }
                      error={errFamilyHistory.age ? errFamilyHistory.age : ""}
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
                      value={familyHistoryD.DiagnosisName}
                      name="DiagnosisName"
                      id="DiagnosisName"
                      onChange={(e, value) =>
                        handleFamilyHistoryChange(e, value, "DiagnosisName")
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
                            errFamilyHistory.DiagnosisName
                              ? errFamilyHistory.DiagnosisName
                              : ""
                          }
                          error={Boolean(
                            errFamilyHistory.DiagnosisName
                              ? errFamilyHistory.DiagnosisName
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
                      value={familyHistoryD.conditionClinical}
                      onChange={(e, value) =>
                        handleFamilyHistoryChange(e, value, "conditionClinical")
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
                          helperText={
                            errFamilyHistory.conditionClinical
                              ? errFamilyHistory.conditionClinical
                              : ""
                          }
                          error={Boolean(
                            errFamilyHistory.conditionClinical
                              ? errFamilyHistory.conditionClinical
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
                      value={familyHistoryD.conditionVerificationStatus}
                      onChange={(e, value) =>
                        handleFamilyHistoryChange(
                          e,
                          value,
                          "conditionVerificationStatus"
                        )
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
                          helperText={
                            errFamilyHistory.conditionVerificationStatus
                              ? errFamilyHistory.conditionVerificationStatus
                              : ""
                          }
                          error={Boolean(
                            errFamilyHistory.conditionVerificationStatus
                              ? errFamilyHistory.conditionVerificationStatus
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
                      value={familyHistoryD.conditionSeverity}
                      onChange={(e, value) =>
                        handleFamilyHistoryChange(e, value, "conditionSeverity")
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
                          helperText={
                            errFamilyHistory.conditionSeverity
                              ? errFamilyHistory.conditionSeverity
                              : ""
                          }
                          error={Boolean(
                            errFamilyHistory.conditionSeverity
                              ? errFamilyHistory.conditionSeverity
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
                      value={familyHistoryD.conditionBodySite}
                      name="conditionBodySite"
                      id="conditionBodySite"
                      onChange={(e, value) =>
                        handleFamilyHistoryChange(e, value, "conditionBodySite")
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
                            errFamilyHistory.conditionBodySite
                              ? errFamilyHistory.conditionBodySite
                              : ""
                          }
                          error={Boolean(
                            errFamilyHistory.conditionBodySite
                              ? errFamilyHistory.conditionBodySite
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
                      value={familyHistoryD.AddedByDr}
                      onChange={(e) =>
                        handleFamilyHistoryChange(
                          e,
                          e.target.value,
                          "AddedByDr"
                        )
                      }
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        label="Start Date"
                        format="DD/MM/YYYY"
                        placeholder="10/10/2018"
                        value={familyHistoryD.selectedDate}
                        onChange={(date) =>
                          handleDateChange(date, "selectedDate")
                        }
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
                      value={familyHistoryD.Sequence}
                      onChange={(e) =>
                        handleFamilyHistoryChange(e, e.target.value, "Sequence")
                      }
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

export default withStyles(styles)(AddFamilyHistory);
