import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../PatientEncounter-jss";
import css from "dan-styles/Form.scss";
import {
  Box,
  Divider,
  Button,
  IconButton,
  Typography,
  TextField,
  Grid,
  withStyles,
  Paper,
  InputBase,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
  MenuItem,
  TableHead,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Medicines,
  Form,
  Route,
  AfterPlan,
} from "dan-api/dummy/getmedicationFormData";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import Send from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Search from "@material-ui/icons/Search";
import Done from "@material-ui/icons/Done";
import moment from "moment";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function AddMedication(props) {
  const { classes, inputChange } = props;
  const { height, width } = useWindowDimensions();
  const [editable, setEditable] = useState(["gen0"]);
  const [tapperredEdit, setTapperredEdit] = useState(["ap0"]);
  const [showAfterChangeInput, setShowAfterChangeInput] = useState(false);
  const [ssd, setSsd] = useState(false);
  const [perDayDose, setPerDayDose] = useState(3);
  const [perDaySchedule, setPerDaySchedule] = useState(8);
  const [singleDose, setSingleDose] = useState([]);
  const [search, setSearch] = useState("");
  const [FakeStateData, setFakeStateData] = useState("");
  const [value, setValue] = useState("d");

  const [formData, setFormData] = useState({
    resourceType: "MedicationRequest",
    Form: "",
    Generic: [{ name: "", strength: "" }],
    Tapperred: [{ strength: "", dose: "", durations: "" }],
    Strength: "",
    BrandName: "",
    Route: "",
    additionalInstruction: "",
    After: "",
    Link: "",
    Condition: "",
    frequency: "",
    dosageInstruction: "",
    doseAndRate: "",
    period: "",
    periodUnit: "",
  });

  const handleChange = (name) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: event.target.value,
    }));
  };
  const handleChangeR = (event) => {
    setValue(event.target.value);
  };

  const handleFormChange = (name) => (event) => {
    setFormData({ ...formData, ["Form"]: event.target.value });
  };

  const handleBrandChange = (event, value) => {
    if (value) {
      setEditable([]);
    }
    let medicine = Medicines.filter((itm) => itm.BrandName == value);
    setFormData({ ...formData, ...medicine[0] });
  };

  const handleGenericChange = (name, index) => (event) => {
    let fdg = formData.Generic;
    let generic = fdg[index];
    fdg[index] = { ...generic, [name]: event.target.value };
    setFormData({ ...formData, ["Generic"]: fdg });
  };

  const handleTapperredChange = (name, index) => (event) => {
    let fdg = formData.Tapperred;
    let tapperred = fdg[index];
    fdg[index] = { ...tapperred, [name]: event.target.value };
    setFormData((prevData) => ({ ...prevData, Tapperred: fdg }));
  };
  const handleRouteChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleAfterChange = (name) => (event) => {
    if (event.target.value == "Tapperred") {
      setShowAfterChangeInput(true);
    } else {
      setShowAfterChangeInput(false);
    }
    setFormData({ ...formData, ["After"]: event.target.value });
  };

  const handleDiagnosesForm = () => {
    setOpenDiagnosesForm(true);
  };

  const submitForm = () => {
    alert("Data Submit");
  };

  const handleGenericNameSave = (ind, editableList) => {
    if (editableList.includes(ind)) {
      editableList = editableList.filter((itm) => itm != ind);
    }
    setEditable(editableList);
  };

  const handleTapperredSave = (ind, editableList) => {
    if (editableList.includes(ind)) {
      editableList = editableList.filter((itm) => itm != ind);
    }
    setTapperredEdit(editableList);
  };

  const handleEditGeneric = (ind) => {
    let editableGen = editable;
    if (!editableGen.includes(ind)) {
      editableGen.push(ind);
      setEditable(editableGen);
    }
    setFakeStateData(new Date().getTime());
  };

  const handleEditTapperred = (ind) => {
    let editableTapperred = tapperredEdit;
    if (!editableTapperred.includes(ind)) {
      editableTapperred.push(ind);
      setTapperredEdit(editableTapperred);
    }
    setFakeStateData(new Date().getTime());
  };

  const handleDeleteGeneric = (ind) => {
    let fd = [...formData.Generic];
    fd.splice(ind, 1);
    setFormData({ ...formData, ["Generic"]: fd });
  };

  const handleDeleteTapperred = (ind) => {
    let fd = formData.Tapperred.filter((item, index) => index !== ind);
    setFormData({ ...formData, ["Tapperred"]: fd });
  };

  const handleFormSubmit = async () => {
    try {
      const postData = {
        resourceType: "MedicationRequest",
        dosageInstruction: [
          {
            text: "one tablet at once",
            additionalInstruction: [
              {
                coding: [
                  {
                    display: formData.additionalInstruction,
                  },
                ],
              },
            ],

            route: {
              coding: [
                {
                  display: formData.Route,
                },
              ],
            },
            timing: {
              repeat: {
                frequency: perDayDose,
                period: formData.period,
                periodUnit: value,
              },
            },
          },
        ],
      };
      console.log("postData:", postData);
      console.log("selected value", value);

      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/MedicationRequest?_lastUpdated=gt2024-02-10",
        postData
      );

      console.log("postData:", postData);
      console.log("API Response:", response.data);

      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  const renderGenericName = () => {
    let output = [];
    if (formData.Generic && formData.Generic.length > 0) {
      formData.Generic.map((option, ind) => {
        output[ind] = (
          <TableRow key={"genD" + ind}>
            <TableCell style={{ width: 350 }}>
              {editable.includes("gen" + ind) === true ? (
                <InputBase
                  className={classes.genericInput}
                  label="Generic Name"
                  placeholder="Generic Name"
                  value={option.name}
                  onChange={handleGenericChange("name", ind)}
                />
              ) : (
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  {option.name}
                </Typography>
              )}
            </TableCell>
            <TableCell style={{ width: 200 }}>
              {editable.includes("gen" + ind) === true ? (
                <InputBase
                  className={classes.genericInput}
                  label="Strength"
                  placeholder="500"
                  value={option.strength}
                  onChange={handleGenericChange("strength", ind)}
                />
              ) : (
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  {option.strength}
                </Typography>
              )}
            </TableCell>
            <TableCell
              style={{ width: 100, flexDirection: "row", display: "flex" }}
            >
              {editable.includes("gen" + ind) === true ? (
                <IconButton
                  style={{ padding: 5 }}
                  disabled={option.name == "" ? true : false}
                  onClick={() => handleGenericNameSave("gen" + ind, editable)}
                >
                  <Done />
                </IconButton>
              ) : (
                <IconButton
                  style={{ padding: 5 }}
                  onClick={() => handleEditGeneric("gen" + ind)}
                >
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                style={{ padding: 5 }}
                onClick={() => handleDeleteGeneric(ind)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      });
    }
    return output;
  };

  const renderAfterPlan = () => {
    let output = [];
    if (formData.Tapperred && formData.Tapperred.length > 0) {
      formData.Tapperred.map((option, ind) => {
        output[ind] = (
          <TableRow key={"ap" + ind}>
            <TableCell style={{ width: 300 }}>
              {tapperredEdit.includes("ap" + ind) === true ? (
                <InputBase
                  className={classes.genericInput}
                  label="Strength"
                  placeholder="500 mg"
                  value={option.strength}
                  onChange={handleTapperredChange("Strength", ind)}
                />
              ) : (
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  {option.strength}
                </Typography>
              )}
            </TableCell>
            <TableCell style={{ width: 300 }}>
              {tapperredEdit.includes("ap" + ind) === true ? (
                <InputBase
                  className={classes.genericInput}
                  label="Dose"
                  placeholder="1-0-1"
                  value={option.dose}
                  onChange={handleTapperredChange("dose", ind)}
                />
              ) : (
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  {option.dose}
                </Typography>
              )}
            </TableCell>
            <TableCell style={{ width: 300 }}>
              {tapperredEdit.includes("ap" + ind) === true ? (
                <InputBase
                  className={classes.genericInput}
                  label="Duration"
                  placeholder="5 Days"
                  value={option.durations}
                  onChange={handleTapperredChange("durations", ind)}
                />
              ) : (
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  {option.durations}
                </Typography>
              )}
            </TableCell>
            <TableCell
              style={{ width: 100, flexDirection: "row", display: "flex" }}
            >
              {tapperredEdit.includes("ap" + ind) === true ? (
                <IconButton
                  style={{ padding: 5 }}
                  disabled={option.strength == "" ? true : false}
                  onClick={() => handleTapperredSave("ap" + ind, tapperredEdit)}
                >
                  <Done />
                </IconButton>
              ) : (
                <IconButton
                  style={{ padding: 5 }}
                  onClick={() => handleEditTapperred("ap" + ind)}
                >
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                style={{ padding: 5 }}
                onClick={() => handleDeleteTapperred(ind)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      });
    }
    return output;
  };

  const handleSSDChange = (name) => (event) => {
    setSsd(event.target.checked);
  };

  const handlePerDayDose = (v) => {
    let pdd = perDayDose + v;
    if (pdd < 1 || pdd > 5) return false;
    setPerDayDose(pdd);
  };

  const handlePerDaySchedule = (v) => {
    let pdd = perDaySchedule + v;
    if (pdd < 6 || pdd > 10) return false;
    setPerDaySchedule(pdd);
  };

  const handleSingleDose = (v, ind) => {
    let sd = singleDose; //[ind] + v;
    if (typeof sd[ind] === "undefined") {
      sd[ind] = v;
    } else {
      sd[ind] = sd[ind] + v;
    }

    if (sd[ind] < 0) return false;
    setSingleDose(sd);
    setFakeStateData(new Date().getTime());
  };

  const getSchedule = (hours) => {
    return moment(hours, ["HH"]).format("hh A");
  };

  const getScheduleTime = (d) => {
    let dose = { 1: 1, 2: 12, 3: 7, 4: 5, 5: 4 };
    if (d == 1) {
      return getSchedule(perDaySchedule);
    } else {
      let hours = perDaySchedule + dose[perDayDose] * (d - 1);
      hours = hours > 24 ? hours - 24 : hours;
      return getSchedule(hours);
    }
  };

  const addMoreGeneric = () => {
    let more = { name: "", strength: "" };
    let fd = formData.Generic;
    fd.push(more);
    setFormData({ ...formData, ["Generic"]: fd });
    handleEditGeneric("gen" + (formData.Generic.length - 1));
  };

  const addMoreTapperred = () => {
    let more = { strength: "", dose: "", duration: "" };
    let fd = formData.Tapperred;
    fd.push(more);
    setFormData({ ...formData, ["Tapperred"]: fd });
    handleEditTapperred("ap" + (formData.Tapperred.length - 1));
  };

  const renderDose = () => {
    let output = [];
    for (let i = 1; i <= perDayDose; i++) {
      output[i] = (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <InputBase
                disabled
                className={classes.frequencyInput}
                name="Dose"
                value={singleDose[i] || 1}
                //onChange={handleCommonData}
                placeholder="Dose"
                type="text"
                inputProps={{
                  style: {
                    height: 25,
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                }}
              />
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  style={{ padding: 1 }}
                  onClick={() => handleSingleDose(0.5, i)}
                >
                  <ExpandLessIcon />
                </IconButton>
                <IconButton
                  style={{ padding: 1 }}
                  onClick={() => handleSingleDose(-0.5, i)}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider style={{ margin: "3px 0", width: "100%" }} />
            <InputBase
              disabled
              className={classes.frequencyInput}
              name="Time"
              value={getScheduleTime(i)}
              //onChange={handleCommonData}
              placeholder="Time"
              type="text"
              inputProps={{
                style: { height: 25, fontSize: 12, textAlign: "center" },
              }}
            />
          </Box>
          {i < perDayDose && (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Divider
                style={{ height: 28, margin: 0 }}
                orientation="vertical"
              />
              <Divider style={{ margin: "3px 0", width: "100%" }} />
              <Divider
                style={{ height: 28, margin: 0 }}
                orientation="vertical"
              />
            </Box>
          )}
        </Box>
      );
    }
    return output;
  };

  return (
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
          height: height - 176,
          maxHeight: height - 176,
          overflow: "auto",
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
              id="Search Here"
              fullWidth
              freeSolo
              autoHighlight
              autoComplete
              autoSelect
              value={search}
              options={Medicines.map((option) => option.BrandName)}
              //getOptionLabel={(option) => option.BrandName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search medicine by generic and brand name"
                  placeholder="Paracetamol"
                  value={search}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <React.Fragment>
                        <Search />
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              onChange={handleBrandChange}
            />
          </Grid>

          <Grid item xs={3} sm={3}>
            <TextField
              select
              fullWidth
              label="Form"
              placeholder="Form"
              value={formData.Form}
              onChange={handleFormChange("Form")}
            >
              {Form.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={9} sm={9}>
            <TextField
              fullWidth
              label="Brand Name"
              placeholder="Dolo 650"
              value={formData.BrandName}
              onChange={handleChange("BrandName")}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TableContainer
              component={Paper}
              elevation={1}
              className={classes.border}
            >
              <Table
                size="small"
                aria-label="a dense table"
                style={{ margin: 0 }}
                className={{ root: classes.tableRoot }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "55%" }}>Generic Name</TableCell>
                    <TableCell>Strength</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderGenericName()}</TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Button
                        startIcon={<AddIcon />}
                        onClick={() => addMoreGeneric()}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ssd}
                  onChange={handleSSDChange("checkedB")}
                  //value={ssd}
                  color="primary"
                />
              }
              label="Single stat dose"
              style={{ marginTop: 15 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ssd}
                  onChange={handleSSDChange("checkedB")}
                  //value={ssd}
                  color="primary"
                />
              }
              label="Take whenever needed"
              style={{ marginTop: 15 }}
            />

            {!ssd && (
              <Paper className={classes.frequencyBox}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    sm={12}
                    style={{ flexDirection: "row", display: "flex" }}
                  >
                    <Box
                      style={{
                        margin: "0 5px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        style={{ padding: 5 }}
                        onClick={() => handlePerDayDose(1)}
                      >
                        <ExpandLessIcon />
                      </IconButton>
                      <Typography variant="caption" noWrap>
                        {perDayDose} Time
                      </Typography>
                      <IconButton
                        style={{ padding: 5 }}
                        onClick={() => handlePerDayDose(-1)}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>
                    <Box
                      style={{
                        margin: "0 20px 0 5px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        style={{ padding: 5 }}
                        onClick={() => handlePerDaySchedule(1)}
                      >
                        <ExpandLessIcon />
                      </IconButton>
                      <Typography variant="caption" noWrap>
                        {getSchedule(perDaySchedule)}
                      </Typography>
                      <IconButton
                        style={{ padding: 5 }}
                        onClick={() => handlePerDaySchedule(-1)}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>
                    {renderDose()}
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Grid>

          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Period"
              placeholder="Period"
              value={formData.period}
              onChange={handleChange("period")}
            />
          </Grid>

          <Grid item sm={12}>
            <FormControl>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                component="fieldset"
              >
                Period Unit
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChangeR}
                row
              >
                <FormControlLabel
                  value="h"
                  control={<Radio />}
                  label="Hours"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="d"
                  control={<Radio />}
                  label="Days"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="wk"
                  control={<Radio />}
                  label="Weeks"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="mo"
                  control={<Radio />}
                  label="Months"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="a"
                  control={<Radio />}
                  label="Year"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <TextField
              select
              fullWidth
              label="Route"
              placeholder="Route"
              value={formData.Route}
              onChange={handleRouteChange("Route")}
            >
              {Route.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={6}>
            <TextField
              select
              fullWidth
              label="After Plan"
              placeholder="After Plan"
              value={formData.After}
              onChange={handleAfterChange("After")}
            >
              {AfterPlan.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Link Condition"
              placeholder="Link"
              value={formData.Link}
              onChange={handleChange("Link")}
            />
          </Grid>

          {showAfterChangeInput && (
            <Grid item xs={12} sm={12}>
              <TableContainer
                component={Paper}
                elevation={1}
                className={classes.border}
              >
                <Table
                  size="small"
                  aria-label="a dense table"
                  style={{ margin: 0 }}
                  className={{ root: classes.tableRoot }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Strenght</TableCell>
                      <TableCell>Dose</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderAfterPlan()}</TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={5} align="right">
                        <Button
                          onClick={() => addMoreTapperred()}
                          startIcon={<AddIcon />}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Grid>
          )}

          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Aadditional Instruction"
              placeholder="additional Instruction"
              value={formData.additionalInstruction}
              onChange={handleChange("additionalInstruction")}
            />
          </Grid>
        </Grid>
      </div>
      <div className={css.buttonArea}>
        <Button type="button" onClick={() => setOpenDiagnosesForm(false)}>
          {" "}
          Discard{" "}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFormSubmit}
        >
          Save&nbsp;
          <Send className={classes.sendIcon} />
        </Button>
      </div>
    </Box>
  );
}

AddMedication.propTypes = {
  classes: PropTypes.object.isRequired,
  //inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddMedication);
