import React, { useCallback, useEffect, useState } from "react";
import css from "dan-styles/Form.scss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, TextField } from "dan-components";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField as MuiTextField,
} from "@mui/material";
import { Formik } from "formik";
import Send from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import styles from "../../../../Pages-jss";
import { withStyles } from "@mui/styles";
import { useDropDownValues } from "../../../../../../components/Common/useDropDownValues";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubstanceList,
  getAllergyList,
  getClinicalFindingList,
  getExposureRouteList,
} from "./AllergyAction";

function AllergiesForm(props) {
  const patient = useParams();
  const dispatch = useDispatch();
  const { classes, open, closeForm, data, type, callBack, setMessage } = props;
  const initialState = {
    allergy: null,
    clinicalStatus: null,
    verificationStatus: null,
    allergyIntoleranceType: null,
    allergyIntoleranceCategory: null,
    substance: null,
    criticality: null,
    allergyManifesting: null,
    severity: null,
    exposureRoute: null,
    description: "",
  };

  const [editData, setEditData] = useState({});
  const [allergyDetails, setAllergyDetails] = useState(initialState);

  const { height } = useWindowDimensions();
  const [allergyValue, setAllergyValue] = useState("");
  const [substanceValue, setSubstanceValue] = useState("");
  const [occuranceReasonValue, setOccuranceReasonValue] = useState("");
  const [exposureRouteValue, setExposureRouteValue] = useState("");
  const {
    allergyList,
    allergyListLoader,
    substanceList,
    substanceListLoader,
    occuranceReasonList,
    occuranceListLoader,
    exposureRouteList,
    exposureRouteListLoader,
    isNoKnownAllergy,
  } = useSelector((state) => state.allergy);

  const clinicalStatusList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergyintolerance-clinical"
  );

  const varificationStatusList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergyintolerance-verification"
  );

  const allergyTypeList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergy-intolerance-type"
  );
  const allergyCatList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergy-intolerance-category"
  );
  const criticalityList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/allergy-intolerance-criticality"
  );
  const sevarityList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/reaction-event-severity"
  );

  useEffect(() => {
    if (!isNoKnownAllergy) allergyListResult(allergyValue);
  }, [allergyValue]);

  const handleAllergyDebounceFun = (ipValue) => {
    getAllergyList(dispatch, ipValue);
  };

  const allergyListResult = useCallback(
    _debounce(handleAllergyDebounceFun, 200),
    []
  );

  useEffect(() => {
    substanceListResult(substanceValue);
  }, [substanceValue]);

  const handleSubstaceDebounceFun = (ipValue) => {
    getSubstanceList(dispatch, ipValue);
  };

  const substanceListResult = useCallback(
    _debounce(handleSubstaceDebounceFun, 200),
    []
  );

  useEffect(() => {
    occuranceReasonListResult(occuranceReasonValue);
  }, [occuranceReasonValue]);

  const handleOccuranceReasonDebounceFun = (ipValue) => {
    getClinicalFindingList(dispatch, ipValue);
  };

  const occuranceReasonListResult = useCallback(
    _debounce(handleOccuranceReasonDebounceFun, 200),
    []
  );

  useEffect(() => {
    exposureRouteListResult(exposureRouteValue);
  }, [exposureRouteValue]);

  const handleExposureRouteDebounceFun = (ipValue) => {
    getExposureRouteList(dispatch, ipValue);
  };

  const exposureRouteListResult = useCallback(
    _debounce(handleExposureRouteDebounceFun, 200),
    []
  );

  useEffect(() => {
    if (type === "edit") {
      setEditData(data);
    } else {
      setEditData({});
    }
  }, []);

  const pastAllergies = async (values, setErrors, setStatus, setSubmitting) => {
    console.log("values", values);
    try {
      // Extract necessary values from input
      const allergyIntolerance = {
        resourceType: "AllergyIntolerance",
        id: "example", // we can replace this with a dynamic id if needed
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p></div>',
        },
        clinicalStatus: {
          coding: [
            {
              system: values.clinicalStatus.system,
              code: values.clinicalStatus.code,
              display: values.clinicalStatus.display,
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system: values.verificationStatus.system,
              code: values.verificationStatus.code,
              display: values.verificationStatus.display,
            },
          ],
        },
        type: values.allergyIntoleranceType.code,
        category: [values.allergyIntoleranceCategory.code],
        criticality: values.criticality.code, 
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: values.allergy.conceptId,
              display: values.allergy.term,
            },
          ],
        },
        patient: {
          reference: "Patient/example",
        },
        recordedDate: new Date().toISOString(),
        reaction: [
          {
            substance: {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: values.substance.conceptId,
                  display: values.substance.term,
                },
              ],
            },
            manifestation: [
              {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: values.allergyManifesting.conceptId,
                    display: values.allergyManifesting.term,
                  },
                ],
              },
            ],
            severity: values.severity.code,
            exposureRoute: {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: values.exposureRoute.conceptId,
                  display: values.exposureRoute.term,
                },
              ],
            },
            description: values.description, // Description from input
          },
        ],
      };

      console.log(allergyIntolerance);
      console.log(JSON.stringify(allergyIntolerance));

      // Simulate an API call or further processing
    } catch (error) {
      console.error("Error processing allergy data", error);
    }
  };

  const handleAllergyChange = (e, value, name) => {
    setAllergyDetails({ ...allergyDetails, [name]: value });
  };

  const validation = () => {
    var error = {};
    Object.keys(allergyDetails).forEach((key) => {
      if (key !== description && allergyDetails[key] === null) {
        error[key] = `Please select ${key}`;
      }
    });
    return error;
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title={type === "edit" ? "Edit Allergy" : "Add Allergy"}
      extraSize={false}
    >
      <Formik
        initialValues={{ ...allergyDetails }}
        enableReinitialize={true}
        validate={validation}
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
                    {isNoKnownAllergy ? (
                      <Autocomplete
                        className={classes.AutoComplete}
                        name="allergy"
                        id="allergy"
                        options={allergyList}
                        getOptionLabel={(option) => option.preferredName || ""}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        value={allergyDetails.allergy}
                        onChange={(e, value) =>
                          handleAllergyChange(e, value, "allergy")
                        }
                        ListboxProps={{ style: { maxHeight: 150 } }}
                        renderInput={(params) => (
                          <MuiTextField
                            {...params}
                            fullWidth
                            label={
                              <>
                                Enter Allergy
                                <sup style={{ color: "red" }}>*</sup>
                              </>
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.allergy ? errors.allergy : ""}
                            error={Boolean(
                              touched.allergy ? errors.allergy : ""
                            )}
                          />
                        )}
                      />
                    ) : (
                      <Autocomplete
                        className={classes.AutoComplete}
                        options={allergyList}
                        ListboxProps={{ style: { maxHeight: 150 } }}
                        getOptionLabel={(option) => option.term || ""}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id || option.term === value.term
                        }
                        value={allergyDetails.allergy}
                        name="allergy"
                        id="allergy"
                        onChange={(e, value) =>
                          handleAllergyChange(e, value, "allergy")
                        }
                        onInputChange={(event, newInputValue) => {
                          setAllergyValue(newInputValue);
                        }}
                        loading={allergyListLoader}
                        noOptionsText={
                          allergyValue.length === 0
                            ? "Enter value for search"
                            : "No options found"
                        }
                        renderInput={(params) => (
                          <MuiTextField
                            {...params}
                            fullWidth
                            label={
                              <>
                                Enter Allergy
                                <sup style={{ color: "red" }}>*</sup>
                              </>
                            }
                            onBlur={handleBlur}
                            helperText={touched.allergy ? errors.allergy : ""}
                            error={Boolean(
                              touched.allergy ? errors.allergy : ""
                            )}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {allergyListLoader ? (
                                    <CircularProgress size={20} />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="clinicalStatus"
                      options={clinicalStatusList}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={allergyDetails.clinicalStatus}
                      onChange={(e, value) =>
                        handleAllergyChange(e, value, "clinicalStatus")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="clinicalStatus"
                          label={
                            <>
                              Clinical Status of Allergy
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.clinicalStatus ? errors.clinicalStatus : ""
                          }
                          error={Boolean(
                            touched.clinicalStatus ? errors.clinicalStatus : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="verificationStatus"
                      options={varificationStatusList}
                      value={allergyDetails.verificationStatus}
                      onChange={(e, value) =>
                        handleAllergyChange(e, value, "verificationStatus")
                      }
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="verificationStatus"
                          label={
                            <>
                              Verification Status of Allergy
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.verificationStatus
                              ? errors.verificationStatus
                              : ""
                          }
                          error={Boolean(
                            touched.verificationStatus
                              ? errors.verificationStatus
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  {!isNoKnownAllergy && (
                    <>
                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          className={classes.AutoComplete}
                          name="allergyIntoleranceType"
                          options={allergyTypeList}
                          value={allergyDetails.allergyIntoleranceType}
                          onChange={(e, value) =>
                            handleAllergyChange(
                              e,
                              value,
                              "allergyIntoleranceType"
                            )
                          }
                          getOptionLabel={(option) => option.display || ""}
                          isOptionEqualToValue={(option, value) =>
                            option.code === value.code
                          }
                          ListboxProps={{ style: { maxHeight: 150 } }}
                          renderInput={(params) => (
                            <MuiTextField
                              {...params}
                              fullWidth
                              id="allergyIntoleranceType"
                              label={
                                <>
                                  Allergy Intolerance Type
                                  <sup style={{ color: "red" }}>*</sup>
                                </>
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched.allergyIntoleranceType
                                  ? errors.allergyIntoleranceType
                                  : ""
                              }
                              error={Boolean(
                                touched.allergyIntoleranceType
                                  ? errors.allergyIntoleranceType
                                  : ""
                              )}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          className={classes.AutoComplete}
                          name="allergyIntoleranceCategory"
                          options={allergyCatList}
                          value={allergyDetails.allergyIntoleranceCategory}
                          onChange={(e, value) =>
                            handleAllergyChange(
                              e,
                              value,
                              "allergyIntoleranceCategory"
                            )
                          }
                          getOptionLabel={(option) => option.display || ""}
                          isOptionEqualToValue={(option, value) =>
                            option.code === value.code
                          }
                          ListboxProps={{ style: { maxHeight: 150 } }}
                          renderInput={(params) => (
                            <MuiTextField
                              {...params}
                              fullWidth
                              id="allergyIntoleranceCategory"
                              label={
                                <>
                                  Allergy Category
                                  <sup style={{ color: "red" }}>*</sup>
                                </>
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched.allergyIntoleranceCategory
                                  ? errors.allergyIntoleranceCategory
                                  : ""
                              }
                              error={Boolean(
                                touched.allergyIntoleranceCategory
                                  ? errors.allergyIntoleranceCategory
                                  : ""
                              )}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          className={classes.AutoComplete}
                          options={substanceList}
                          ListboxProps={{ style: { maxHeight: 150 } }}
                          getOptionLabel={(option) => option.term || ""}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          onInputChange={(event, newInputValue) => {
                            setSubstanceValue(newInputValue);
                          }}
                          value={allergyDetails.substance}
                          onChange={(e, value) =>
                            handleAllergyChange(e, value, "substance")
                          }
                          loading={substanceListLoader}
                          noOptionsText={
                            substanceValue.length === 0
                              ? "Enter value for search"
                              : "No options found"
                          }
                          renderInput={(params) => (
                            <MuiTextField
                              {...params}
                              fullWidth
                              id="substance"
                              label={
                                <>
                                  Allergy Substance
                                  <sup style={{ color: "red" }}>*</sup>
                                </>
                              }
                              onBlur={handleBlur}
                              helperText={
                                touched.substance ? errors.substance : ""
                              }
                              error={Boolean(
                                touched.substance ? errors.substance : ""
                              )}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {substanceListLoader ? (
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
                          name="criticality"
                          options={criticalityList}
                          value={allergyDetails.criticality}
                          onChange={(e, value) =>
                            handleAllergyChange(e, value, "criticality")
                          }
                          getOptionLabel={(option) => option.display || ""}
                          isOptionEqualToValue={(option, value) =>
                            option.code === value.code
                          }
                          ListboxProps={{ style: { maxHeight: 150 } }}
                          renderInput={(params) => (
                            <MuiTextField
                              {...params}
                              fullWidth
                              id="criticality"
                              label={
                                <>
                                  Allergy Criticality
                                  <sup style={{ color: "red" }}>*</sup>
                                </>
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched.criticality ? errors.criticality : ""
                              }
                              error={Boolean(
                                touched.criticality ? errors.criticality : ""
                              )}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          className={classes.AutoComplete}
                          options={occuranceReasonList}
                          ListboxProps={{ style: { maxHeight: 150 } }}
                          getOptionLabel={(option) => option.term || ""}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          onInputChange={(event, newInputValue) => {
                            setOccuranceReasonValue(newInputValue);
                          }}
                          value={allergyDetails.allergyManifesting}
                          onChange={(e, value) =>
                            handleAllergyChange(e, value, "allergyManifesting")
                          }
                          loading={occuranceListLoader}
                          noOptionsText={
                            occuranceReasonValue.length === 0
                              ? "Enter value for search"
                              : "No options found"
                          }
                          renderInput={(params) => (
                            <MuiTextField
                              {...params}
                              fullWidth
                              id="allergyManifesting"
                              label={
                                <>
                                  Allergy Occurence reason
                                  <sup style={{ color: "red" }}>*</sup>
                                </>
                              }
                              onBlur={handleBlur}
                              helperText={
                                touched.allergyManifesting
                                  ? errors.allergyManifesting
                                  : ""
                              }
                              error={Boolean(
                                touched.allergyManifesting
                                  ? errors.allergyManifesting
                                  : ""
                              )}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {occuranceListLoader ? (
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
                          name="severity"
                          options={sevarityList}
                          value={allergyDetails.severity}
                          onChange={(e, value) =>
                            handleAllergyChange(e, value, "severity")
                          }
                          getOptionLabel={(option) => option.display || ""}
                          isOptionEqualToValue={(option, value) =>
                            option.code === value.code
                          }
                          ListboxProps={{ style: { maxHeight: 150 } }}
                          renderInput={(params) => (
                            <MuiTextField
                              {...params}
                              fullWidth
                              id="severity"
                              label={
                                <>
                                  Allergy Severity
                                  <sup style={{ color: "red" }}>*</sup>
                                </>
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched.severity ? errors.severity : ""
                              }
                              error={Boolean(
                                touched.severity ? errors.severity : ""
                              )}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          className={classes.AutoComplete}
                          options={exposureRouteList}
                          ListboxProps={{ style: { maxHeight: 150 } }}
                          getOptionLabel={(option) => option.term || ""}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          onInputChange={(event, newInputValue) => {
                            setExposureRouteValue(newInputValue);
                          }}
                          value={allergyDetails.exposureRoute}
                          onChange={(e, value) =>
                            handleAllergyChange(e, value, "exposureRoute")
                          }
                          loading={exposureRouteListLoader}
                          noOptionsText={
                            exposureRouteValue.length === 0
                              ? "Enter value for search"
                              : "No options found"
                          }
                          renderInput={(params) => (
                            <MuiTextField
                              {...params}
                              fullWidth
                              id="exposureRoute"
                              label={
                                <>
                                  Allergy Exposure Route
                                  <sup style={{ color: "red" }}>*</sup>
                                </>
                              }
                              onBlur={handleBlur}
                              helperText={
                                touched.exposureRoute
                                  ? errors.exposureRoute
                                  : ""
                              }
                              error={Boolean(
                                touched.exposureRoute
                                  ? errors.exposureRoute
                                  : ""
                              )}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {exposureRouteListLoader ? (
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
                    </>
                  )}

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="description"
                      label="Description"
                      multiline
                      maxRows={5}
                      value={allergyDetails.description}
                      onChange={(e) =>
                        handleAllergyChange(e, e.target.value, "description")
                      }
                      onBlur={handleBlur}
                      helperText={touched.description ? errors.description : ""}
                      error={touched.description ? errors.description : ""}
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

export default withStyles(styles)(AllergiesForm);
