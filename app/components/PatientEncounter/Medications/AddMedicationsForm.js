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
  Paper,
  InputBase,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
  MenuItem,
  TableHead,
} from "@mui/material";
import { withStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import {
  Medicines,
  Form,
  Route,
  AfterPlan,
} from "dan-api/dummy/getmedicationFormData";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import Send from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import Done from "@mui/icons-material/Done";
import moment from "moment";
import { useParams } from "react-router-dom";

function AddMedicationForm(props) {
  const patient = useParams();
  const { classes, closeForm } = props;
  const { height } = useWindowDimensions();
  const [editable, setEditable] = useState(["gen0"]);
  const [tapperredEdit, setTapperredEdit] = useState(["ap0"]);
  const [showAfterChangeInput, setShowAfterChangeInput] = useState(false);
  const [perDayDose, setPerDayDose] = useState(3);
  const [perDaySchedule, setPerDaySchedule] = useState(8);
  const [singleDose, setSingleDose] = useState([]);
  const [search, setSearch] = useState("");
  const [FakeStateData, setFakeStateData] = useState("");

  const [formData, setFormData] = useState({
    patientRef: patient.patientRef,
    medicationRef: '',
    form: '',
    brandName: "",
    genericName: [{ name: "", strength: "" }],
    singleState: "",
    wheneverNeeded: "",
    frequency: "3",
    usesSchedule: [{ time: "", dose: "" }],
    route: "Oral",
    duration: "2 week",
    afterPlan: "Tapperred",
    toBeTapperred: [{ strength: "", dose: "", durations: "" }],
    linkedDiagnosis: "",
    administration: "administrater",
  });

  const handleChange = (name) => (event) => {
    if (name == 'singleState' || name == 'wheneverNeeded') {
      setFormData({
        ...formData,
        [name]: event.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: event.target.value,
      });
    }
  };

  const handleFormChange = (name) => (event) => {
    setFormData({ ...formData, ["form"]: event.target.value });
  };

  const handleBrandChange = (event, value) => {
    if (value) {
      setEditable([]);
    }
    let medicine = Medicines.filter((itm) => itm.BrandName == value);
    setFormData({ ...formData, ...medicine[0] });
  };

  const handleGenericChange = (name, index) => (event) => {
    let fdg = formData.genericName;
    let generic = fdg[index];
    fdg[index] = { ...generic, [name]: event.target.value };
    setFormData({ ...formData, ["genericName"]: fdg });
  };

  const handleTapperredChange = (name, index) => (event) => {
    let fdg = formData.toBeTapperred;
    let tapperred = fdg[index];
    fdg[index] = { ...tapperred, [name]: event.target.value };
    setFormData({ ...formData, ["toBeTapperred"]: fdg });
  };

  const handleRouteChange = (name) => (event) => {
    setFormData({ ...formData, ["route"]: event.target.value });
  };

  const handleAfterChange = (name) => (event) => {
    if (event.target.value == "Tapperred") {
      setShowAfterChangeInput(true);
    } else {
      setShowAfterChangeInput(false);
    }
    setFormData({ ...formData, ["afterPlan"]: event.target.value });
  };

  // Generic
  const handleGenericNameSave = (ind, editableList) => {
    if (editableList.includes(ind)) {
      editableList = editableList.filter((itm) => itm != ind);
    }
    setEditable(editableList);
  };

  const handleEditGeneric = (ind) => {
    let editableGen = editable;
    if (!editableGen.includes(ind)) {
      editableGen.push(ind);
      setEditable(editableGen);
    }
    setFakeStateData(new Date().getTime());
  };

  const handleDeleteGeneric = (ind) => {
    let fd = formData.genericName;
    delete fd[ind];
    setFormData({ ...formData, ["genericName"]: fd });
  };

  const renderGenericName = () => {
    let output = [];
    if (formData.genericName && formData.genericName.length > 0) {
      formData.genericName.map((option, ind) => {
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
                  size="large">
                  <Done />
                </IconButton>
              ) : (
                <IconButton
                  style={{ padding: 5 }}
                  onClick={() => handleEditGeneric("gen" + ind)}
                  size="large">
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                style={{ padding: 5 }}
                onClick={() => handleDeleteGeneric(ind)}
                size="large">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      });
    }
    return output;
  };

  const addMoreGeneric = () => {
    let more = { name: "", strength: "" };
    let fd = formData.genericName;
    fd.push(more);
    setFormData({ ...formData, ["genericName"]: fd });
    handleEditGeneric("gen" + (formData.genericName.length - 1));
  };

  // Tapperred
  const handleTapperredSave = (ind, editableList) => {
    if (editableList.includes(ind)) {
      editableList = editableList.filter((itm) => itm != ind);
    }
    setTapperredEdit(editableList);
  };

  const handleEditTapperred = (ind) => {
    let editableTapperred = tapperredEdit;
    if (!editableTapperred.includes(ind)) {
      editableTapperred.push(ind);
      setTapperredEdit(editableTapperred);
    }
    setFakeStateData(new Date().getTime());
  };

  const handleDeleteTapperred = (ind) => {
    let fd = formData.toBeTapperred;
    delete fd[ind];
    setFormData({ ...formData, ["toBeTapperred"]: fd });
  };

  const renderAfterPlan = () => {
    let output = [];
    if (formData.toBeTapperred && formData.toBeTapperred.length > 0) {
      formData.toBeTapperred.map((option, ind) => {
        output[ind] = (
          <TableRow key={"ap" + ind}>
            <TableCell style={{ width: 300 }}>
              {tapperredEdit.includes("ap" + ind) === true ? (
                <InputBase
                  className={classes.genericInput}
                  label="Strength"
                  placeholder="500 mg"
                  value={option.strength}
                  onChange={handleTapperredChange("strength", ind)}
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
                  size="large">
                  <Done />
                </IconButton>
              ) : (
                <IconButton
                  style={{ padding: 5 }}
                  onClick={() => handleEditTapperred("ap" + ind)}
                  size="large">
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                style={{ padding: 5 }}
                onClick={() => handleDeleteTapperred(ind)}
                size="large">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      });
    }
    return output;
  };

  const addMoreTapperred = () => {
    let more = { strength: "", dose: "", duration: "" };
    let fd = formData.toBeTapperred;
    fd.push(more);
    setFormData({ ...formData, ["toBeTapperred"]: fd });
    handleEditTapperred("ap" + (formData.toBeTapperred.length - 1));
  };

  //
  const handlePerDayDose = (v) => {
    let pdd = perDayDose + v;
    if (pdd < 1 || pdd > 5) return false;
    if (pdd < perDayDose) {
      let singleDoseValue = singleDose;
      singleDoseValue.pop();
      setSingleDose(singleDoseValue);
    }
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

  const renderDose = (pdd) => {
    let output = [];
    for (let i = 0; i < pdd; i++) {

      output[i] = (
        <Box key={'dose' + i}
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
                value={singleDose[i] || 0}
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
                  size="large">
                  <ExpandLessIcon />
                </IconButton>
                <IconButton
                  style={{ padding: 1 }}
                  onClick={() => handleSingleDose(-0.5, i)}
                  size="large">
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider style={{ margin: "3px 0", width: "100%" }} />
            <InputBase
              disabled
              className={classes.frequencyInput}
              name="Time"
              value={getScheduleTime((i + 1))}
              //onChange={handleCommonData}
              placeholder="Time"
              type="text"
              inputProps={{
                style: { height: 25, fontSize: 12, textAlign: "center" },
              }}
            />
          </Box>
          {i < (pdd - 1) && (
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
              value={formData.form}
              onChange={handleFormChange("form")}
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
              value={formData.brandName}
              onChange={handleChange("brandName")}
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
                classes={{ root: classes.tableRoot }}
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
                  name="singleState"
                  checked={formData.singleState}
                  onChange={handleChange("singleState")}
                  value={"Yes"}
                  color="primary"
                />
              }
              label="Single stat dose"
              style={{ marginTop: 15 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="wheneverNeeded"
                  checked={formData.wheneverNeeded}
                  onChange={handleChange("wheneverNeeded")}
                  value={"Yes"}
                  color="primary"
                />
              }
              label="Take whenever needed"
              style={{ marginTop: 15 }}
            />

            {(!formData.singleState && !formData.wheneverNeeded) && (
              <Paper className={classes.frequencyBox}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    sm={12}
                    style={{ flexDirection: "row", display: "flex" }}
                  >
                    {/* Handle Per day dose */}
                    <Box
                      style={{
                        margin: "0 5px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <IconButton style={{ padding: 5 }} onClick={() => handlePerDayDose(1)} size="large">
                        <ExpandLessIcon />
                      </IconButton>
                      <Typography variant="caption" noWrap>
                        {perDayDose} Time
                      </Typography>
                      <IconButton style={{ padding: 5 }} onClick={() => handlePerDayDose(-1)} size="large">
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>
                    {/* handle Per Day Schedule */}
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
                        size="large">
                        <ExpandLessIcon />
                      </IconButton>
                      <Typography variant="caption" noWrap>
                        {getSchedule(perDaySchedule)}
                      </Typography>
                      <IconButton
                        style={{ padding: 5 }}
                        onClick={() => handlePerDaySchedule(-1)}
                        size="large">
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>
                    {/* render Per Day dose Schedule */}
                    {renderDose(perDayDose)}
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Grid>

          <Grid item sm={6}>
            <TextField
              select
              fullWidth
              label="Route"
              placeholder="Route"
              value={formData.route}
              onChange={handleRouteChange("route")}
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
              fullWidth
              label="Duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange("duration")}
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              select
              fullWidth
              label="After Plan"
              placeholder="After Plan"
              value={formData.afterPlan}
              onChange={handleAfterChange("afterPlan")}
            >
              {AfterPlan.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Link Diagnosis"
              placeholder="Link"
              value={formData.linkedDiagnosis}
              onChange={handleChange("linkedDiagnosis")}
            />
          </Grid>

          {showAfterChangeInput &&
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
                  classes={{ root: classes.tableRoot }}
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
          }

          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Frequency"
              placeholder="Frequency"
              value={formData.frequency}
              onChange={handleChange("frequency")}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Administration"
              placeholder="Administration"
              value={formData.administration}
              onChange={handleChange("administration")}
            />
          </Grid>
        </Grid>
      </div>
      <div className={css.buttonArea}>
        <Box>
          <Button type="button" onClick={() => closeForm()}>Discard</Button>
          <Button variant="contained" color="secondary" onClick={() => closeForm()}>
            Save&nbsp;
            <Send />
          </Button>
        </Box>
      </div>
    </Box>
  );
}

AddMedicationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  //inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddMedicationForm);
