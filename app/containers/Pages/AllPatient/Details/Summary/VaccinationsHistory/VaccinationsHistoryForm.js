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
import { getVaccineCode } from "./VaccinationsAction.js";

function VaccinationsHistoryForm(props) {
  const patient = useParams();
  const dispatch = useDispatch();
  const { classes, open, closeForm, data, type, callBack, setMessage } = props;
  const initialState = {
    allergy: null,
    immunizationStatus: null,
    immunizationSite: null,
    immunizationRoute: null,
    occurrenceDateTime: null,
    vaccineCode: null,
  };

  //immunizationRoute

  const [editData, setEditData] = useState({});
  const [vaccineDetails, setVaccineDetails] = useState(initialState);
  const { height } = useWindowDimensions();
  const [vaccineCode, setVaccineCode] = useState("");

  const immunizationStatusList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/immunization-status"
  );

  const immunizationSiteList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/immunization-site"
  );

  const immunizationRouteList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/immunization-route"
  );

  const vaccineCodeList = useDropDownValues(
    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-vaccine-codes"
  );

  useEffect(() => {
    VaccineListResult(vaccineCode);
  }, [vaccineCode]);

  const handleSVaccineDebounceFun = (ipValue) => {
    getVaccineCode(dispatch, ipValue);
  };

  const VaccineListResult = useCallback(
    _debounce(handleSVaccineDebounceFun, 200),
    []
  );

  useEffect(() => {
    if (type === "edit") {
      setEditData(data);
    } else {
      setEditData({});
    }
  }, []);

  const handleVaccineChange = (e, value, name) => {
    setVaccineDetails({ ...vaccineDetails, [name]: value });
  };

  const postAllergies = async (values, setErrors, setStatus, setSubmitting) => {
    console.log("values", vaccineDetails);
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
              system: allergyDetails.clinicalStatus.system,
              code: allergyDetails.clinicalStatus.code,
              display: allergyDetails.clinicalStatus.display,
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system: allergyDetails.verificationStatus.system,
              code: allergyDetails.verificationStatus.code,
              display: allergyDetails.verificationStatus.display,
            },
          ],
        },
        type: allergyDetails.allergyIntoleranceType.code, // Example: "allergy"
        category: [allergyDetails.allergyIntoleranceCategory.code], // Example: "medication"
        criticality: allergyDetails.criticality.code, // Example: "low"
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: allergyDetails.allergy.conceptId,
              display: allergyDetails.allergy.term,
            },
          ],
        },
        patient: {
          reference: "Patient/example", // Can be dynamic if you have patient data
        },
        recordedDate: new Date().toISOString(), // Or use values.recordedDate if provided
        reaction: [
          {
            substance: {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: allergyDetails.substance.conceptId,
                  display: allergyDetails.substance.term,
                },
              ],
            },
            manifestation: [
              {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: allergyDetails.allergyManifesting.conceptId,
                    display: allergyDetails.allergyManifesting.term,
                  },
                ],
              },
            ],
            severity: allergyDetails.severity.code, // Example: "moderate"
            exposureRoute: {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: allergyDetails.exposureRoute.conceptId,
                  display: allergyDetails.exposureRoute.term,
                },
              ],
            },
            description: allergyDetails.description, // Description from input
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

  const validation = () => {
    var error = {};
    Object.keys(vaccineDetails).forEach((key) => {
      if ((key !== vaccineDetails[key]) === null) {
        error[key] = `Please select ${key}`;
      }
    });
    return error;
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title={type === "edit" ? "Edit Vaccination" : "Add Vaccination"}
      extraSize={false}
    >
      <Formik
        initialValues={{ ...vaccineDetails }}
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
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="immunizationStatus"
                      options={immunizationStatusList}
                      getOptionLabel={(option) => option.display || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      value={vaccineDetails.immunizationStatus}
                      onChange={(e, value) =>
                        handleVaccineChange(e, value, "immunizationStatus")
                      }
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          fullWidth
                          id="immunizationStatus"
                          label={
                            <>
                              Vaccination Status
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.immunizationStatus
                              ? errors.immunizationStatus
                              : ""
                          }
                          error={Boolean(
                            touched.immunizationStatus
                              ? errors.immunizationStatus
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name="immunizationSite"
                      options={immunizationSiteList}
                      value={vaccineDetails.immunizationSite}
                      onChange={(e, value) =>
                        handleVaccineChange(e, value, "immunizationSite")
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
                          id="immunizationSite"
                          label={
                            <>
                              Vaccination Site
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.immunizationSite
                              ? errors.immunizationSite
                              : ""
                          }
                          error={Boolean(
                            touched.immunizationSite
                              ? errors.immunizationSite
                              : ""
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      className={classes.AutoComplete}
                      name=" vaccineCode"
                      options={vaccineCodeList}
                      value={vaccineDetails.vaccineCode}
                      onChange={(e, value) =>
                        handleVaccineChange(e, value, " vaccineCode")
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
                          id=" vaccineCode"
                          label={
                            <>
                              vaccineCode
                              <sup style={{ color: "red" }}>*</sup>
                            </>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.vaccineCode ? errors.vaccineCode : ""
                          }
                          error={Boolean(
                            touched.vaccineCode ? errors.vaccineCode : ""
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <>
                    <Grid item xs={12} sm={12}>
                      <Autocomplete
                        className={classes.AutoComplete}
                        name="immunizationRouteType"
                        options={immunizationRouteList}
                        value={vaccineDetails.immunizationRoute}
                        onChange={(e, value) =>
                          handleVaccineChange(e, value, "immunizationRoute")
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
                            id="immunizationRoute"
                            label={
                              <>
                                Vaccination Route
                                <sup style={{ color: "red" }}>*</sup>
                              </>
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.immunizationRoute
                                ? errors.immunizationRoute
                                : ""
                            }
                            error={Boolean(
                              touched.immunizationRoute
                                ? errors.immunizationRoute
                                : ""
                            )}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        type="date"
                        name="expiration Date"
                        label="expiration Date"
                        value={vaccineDetails.occurrenceDateTime}
                        onChange={handleChange}
                      />
                    </Grid>

                    {/* <Grid item xs={12} sm={12}>
                      <Autocomplete
                        className={classes.AutoComplete}
                        options={vaccineCodeList || []}
                        ListboxProps={{ style: { maxHeight: 150 } }}
                        getOptionLabel={(option) => option.term || ""}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        onInputChange={(event, newInputValue) => {
                          setVaccineCode(newInputValue);
                        }}
                        value={vaccineDetails.vaccineCode}
                        onChange={(e, value) =>
                          handleVaccineChange(e, value, "vaccineCode")
                        }
                        loading={vaccineCodeLoder}
                        noOptionsText={
                          vaccineCode.length === 0
                            ? "Enter value for search"
                            : "No options found"
                        }
                        renderInput={(params) => (
                          <MuiTextField
                            {...params}
                            fullWidth
                            id="vaccineCode"
                            label={
                              <>
                                Vaccine Code
                                <sup style={{ color: "red" }}>*</sup>
                              </>
                            }
                            onBlur={handleBlur}
                            helperText={
                              touched.vaccineCode ? errors.vaccineCode : ""
                            }
                            error={Boolean(
                              touched.vaccineCode ? errors.vaccineCode : ""
                            )}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {vaccineCodeLoder ? (
                                    <CircularProgress size={20} />
                                  ) : null}{" "}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid> */}
                  </>
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

export default withStyles(styles)(VaccinationsHistoryForm);
