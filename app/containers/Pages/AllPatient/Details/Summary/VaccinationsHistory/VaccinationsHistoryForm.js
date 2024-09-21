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
  const { vaccineCodeList, vaccineCodeLoder } = useSelector(
    (state) => state.allergy
  );

  const immunizationStatusList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/immunization-status"
  );

  const immunizationSiteList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/immunization-site"
  );

  const immunizationRouteList = useDropDownValues(
    "http://hl7.org/fhir/ValueSet/immunization-route"
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

                    <Grid item xs={12} sm={12}>
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
                    </Grid>
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
