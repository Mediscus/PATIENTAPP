import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  IconButton,
  TextField,
  InputBase,
  Paper,
  Divider,
  MenuItem,
  Popover,
  CardActions,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import classNames from "classnames";
import withStyles from "@mui/styles/withStyles";
import styles from "../PatientEncounter-jss";
import { Assets } from "dan-api/dummy/FlowSheet";

const colors = {
  red: "#e6b8af",
  yellow: "#ffff02bd",
  blue: "#4472c491",
  green: "#93c47db5",
};

function PulseElementForm(props) {
  const { classes, ElementName, getData } = props;
  const [showMoreField, setShowMoreField] = useState(false);
  const [FormData, setFormData] = useState({
    Common: "",
    detail: [
      { name: "Measurement", description: "Site of measurement", value: "" },
      {
        name: "Character",
        description: "An impression of the pulse waveform or shape",
        value: "",
      },
      {
        name: "Volume",
        description: "The perceived degree of pulsation",
        value: "",
      },
      {
        name: "Rhythm",
        description: "The pattern or regularity of pulses",
        value: "",
      },
      {
        name: "Tension",
        description: "It corresponds to diastolic blood pressure",
        value: "",
      },
    ],
  });

  const handleShowMoreFields = (status) => {
    if (status === "toggle") setShowMoreField(!showMoreField);
    else setShowMoreField(status);
  };
  const handleChange = (e) => {
    if (e.target.name == "Common") {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
    } else {
      let newData = [];
      for (let detail of FormData.detail) {
        if (detail.name == e.target.name) {
          detail.value = e.target.value;
        }
        newData.push(detail);
      }
      setFormData({ ...FormData, ["detail"]: newData });
    }
  };
  const handleData = () => {
    getData({ elementName: ElementName, data: FormData });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 999 || e.target.value < 0) return false;
    handleChange(e);
    handleData();
  };
  const getDD = (name) => {
    let detail = FormData.detail.filter((itm) => itm.name == name);
    return Array.isArray(detail) ? detail[0].value : "";
  };
  const getBGColor = () => {
    if (
      FormData.Common != "" &&
      (FormData.Common <= 39 || FormData.Common >= 121)
    )
      return colors.red;
    else if (FormData.Common >= 40 && FormData.Common <= 59)
      return colors.yellow;
    else if (FormData.Common >= 60 && FormData.Common <= 100)
      return colors.green;
    else if (FormData.Common >= 101 && FormData.Common <= 120)
      return colors.yellow;
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Paper
        className={classes.primaryInputBox}
        style={{ backgroundColor: getBGColor() }}
      >
        <InputBase
          className={classes.primaryInput}
          name="Common"
          value={FormData.Common}
          onChange={handleCommonData}
          placeholder="70"
          type="number"
          inputProps={{ maxLength: 3 }}
        />
        <Typography variant="body2" noWrap={true} style={{ paddingRight: 5 }}>
          /min
        </Typography>
        <Divider style={{ height: 28, margin: 1 }} orientation="vertical" />
        <IconButton
          style={{ padding: "10px" }}
          aria-label="menu"
          onClick={() => handleShowMoreFields("toggle")}
          size="large"
        >
          {showMoreField ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Paper>

      <Box style={{ marginTop: 5, display: showMoreField ? "block" : "none" }}>
        <TextField
          select={true}
          label="Site of measurement"
          name="Measurement"
          value={getDD("Measurement")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.Pulse.Measurement.map((value) => (
            <MenuItem key={"10" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select={true}
          label="Character"
          name="Character"
          value={getDD("Character")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.Pulse.Character.map((value) => (
            <MenuItem key={"20" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select={true}
          label="Volume"
          name="Volume"
          value={getDD("Volume")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.Pulse.Volume.map((value) => (
            <MenuItem key={"30" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select={true}
          label="Rhythm"
          name="Rhythm"
          value={getDD("Rhythm")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.Pulse.Rhythm.map((value) => (
            <MenuItem key={"40" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select={true}
          label="Tension"
          name="Tension"
          value={getDD("Tension")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.Pulse.Tension.map((value) => (
            <MenuItem key={"50" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        {/* <Divider style={{marginTop:10}} />
            <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                <Button size="small" variant="outlined" onClick={() => handleShowMoreFields(false)}>Cancel</Button>
                <Button size="small" variant='contained' color='secondary' onClick={() => handleShowMoreFields(false)}>DONE</Button>
            </CardActions> */}
      </Box>
    </Box>
  );
}

function BPElementForm(props) {
  const { classes, ElementName, getData } = props;
  const [showMoreField, setShowMoreField] = useState(false);
  const [bpData, setBpData] = useState({ BPSystolic: "", BPDiastolic: "" });

  const [FormData, setFormData] = useState({
    Common: "",
    detail: [
      { name: "Measurement", description: "Site of measurement", value: "" },
      {
        name: "Position",
        description: "Position while measurement",
        value: "",
      },
      { name: "Medications", description: "Active medications", value: "" },
    ],
  });

  const handleShowMoreFields = (status) => {
    if (status === "toggle") setShowMoreField(!showMoreField);
    else setShowMoreField(status);
  };
  const handleChange = (e) => {
    if (e.target.name == "BPSystolic" || e.target.name == "BPDiastolic") {
      setBpData({ ...bpData, [e.target.name]: e.target.value });
      setFormData({
        ...FormData,
        ["Common"]: bpData.BPSystolic + "/" + bpData.BPDiastolic,
      });
    } else {
      let newData = [];
      for (let detail of FormData.detail) {
        if (detail.name == e.target.name) {
          detail.value = e.target.value;
        }
        newData.push(detail);
      }
      setFormData({ ...FormData, ["detail"]: newData });
    }
  };
  const handleData = () => {
    getData({ elementName: ElementName, data: FormData });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 300 || e.target.value < 0) return false;

    handleChange(e);
    handleData();
  };

  const getDD = (name) => {
    let detail = FormData.detail.filter((itm) => itm.name == name);
    return Array.isArray(detail) ? detail[0].value : "";
  };

  const getBGColor = (bpType) => {
    if (bpType == "BPSystolic") {
      let bp = bpData.BPSystolic;
      if (bp != "" && (bp < 90 || bp > 140)) return colors.red;
      else if (bp >= 90 && bp <= 100) return colors.yellow;
      else if (bp >= 101 && bp <= 130) return colors.green;
      else if (bp >= 131 && bp <= 140) return colors.yellow;
    }
    if (bpType == "BPDiastolic") {
      let bp = bpData.BPDiastolic;
      if (bp > 100) return colors.red;
      else if (bp != "" && bp > 0 && bp <= 60) return colors.yellow;
      else if (bp >= 61 && bp <= 90) return colors.green;
      else if (bp >= 91 && bp <= 100) return colors.yellow;
    }
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Paper className={classes.primaryInputBox} style={{ padding: 0 }}>
        <InputBase
          className={classes.primaryInput}
          style={{ backgroundColor: getBGColor("BPSystolic") }}
          name="BPSystolic"
          value={bpData.BPSystolic}
          onChange={handleCommonData}
          placeholder="120"
          type="number"
          inputProps={{ style: { height: 26, fontColor: "red" } }}
        />
        <Divider style={{ height: 28, margin: 0.5 }} orientation="vertical" />
        <InputBase
          className={classes.primaryInput}
          style={{ backgroundColor: getBGColor("BPDiastolic"), margin: 0 }}
          name="BPDiastolic"
          value={bpData.BPDiastolic}
          onChange={handleCommonData}
          placeholder="80"
          type="number"
          inputProps={{ style: { height: 26, fontColor: "red" } }}
        />
        <Typography variant="body2" noWrap={true} style={{ paddingRight: 5 }}>
          mmHg
        </Typography>
        <Divider style={{ height: 28, margin: 1 }} orientation="vertical" />
        <IconButton
          style={{ padding: "10px" }}
          aria-label="menu"
          onClick={() => handleShowMoreFields("toggle")}
          size="large"
        >
          {showMoreField ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Paper>

      <Box style={{ marginTop: 10, display: showMoreField ? "block" : "none" }}>
        <TextField
          select={true}
          label="Site of measurement"
          name="Measurement"
          value={getDD("Measurement")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.BP.Measurement.map((value) => (
            <MenuItem key={"60" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select={true}
          label="Select Position"
          name="Position"
          value={getDD("Position")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.BP.Position.map((value) => (
            <MenuItem key={"70" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          type="text"
          label="Medications"
          name="Medications"
          value={getDD("Medications")}
          onChange={handleCommonData}
          className={classes.textField}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        />

        {/* <Divider style={{marginTop:10}} />
            <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                <Button size="small" variant="outlined" onClick={() => handleShowMoreFields(false)}>Cancel</Button>
                <Button size="small" variant='contained' color='secondary' onClick={() => handleShowMoreFields(false)}>DONE</Button>
            </CardActions> */}
      </Box>
    </Box>
  );
}

function RRateElementForm(props) {
  const { classes, ElementName, getData } = props;
  const [showMoreField, setShowMoreField] = useState(false);
  const [FormData, setFormData] = useState({
    Common: "",
    detail: [
      {
        name: "Position",
        description: "Position while measurement",
        value: "",
      },
      { name: "Pattern", description: "Breathing pattern", value: "" },
    ],
  });

  const handleShowMoreFields = (status) => {
    if (status === "toggle") setShowMoreField(!showMoreField);
    else setShowMoreField(status);
  };
  const handleChange = (e) => {
    if (e.target.name == "Common") {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
    } else {
      let newData = [];
      for (let detail of FormData.detail) {
        if (detail.name == e.target.name) {
          detail.value = e.target.value;
        }
        newData.push(detail);
      }
      setFormData({ ...FormData, ["detail"]: newData });
    }
  };
  const handleData = () => {
    getData({ elementName: ElementName, data: FormData });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 200 || e.target.value < 0) return false;
    handleChange(e);
    handleData();
  };
  const getDD = (name) => {
    let detail = FormData.detail.filter((itm) => itm.name == name);
    return Array.isArray(detail) ? detail[0].value : "";
  };
  const getBGColor = () => {
    if (FormData.Common != "" && (FormData.Common < 8 || FormData.Common > 30))
      return colors.red;
    else if (FormData.Common >= 8 && FormData.Common <= 12)
      return colors.yellow;
    else if (FormData.Common >= 13 && FormData.Common <= 20)
      return colors.green;
    else if (FormData.Common >= 21 && FormData.Common <= 30)
      return colors.yellow;
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Paper
        className={classes.primaryInputBox}
        style={{ backgroundColor: getBGColor() }}
      >
        <InputBase
          className={classes.primaryInput}
          name="Common"
          value={FormData.Common}
          onChange={handleCommonData}
          placeholder="14"
          type="number"
          inputProps={{ maxLength: 3 }}
        />
        <Typography variant="body2" noWrap={true} style={{ paddingRight: 5 }}>
          /min
        </Typography>
        <Divider style={{ height: 28, margin: 1 }} orientation="vertical" />
        <IconButton
          style={{ padding: "10px" }}
          aria-label="menu"
          onClick={() => handleShowMoreFields("toggle")}
          size="large"
        >
          {showMoreField ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Paper>

      <Box style={{ marginTop: 10, display: showMoreField ? "block" : "none" }}>
        <TextField
          select={true}
          label="Position"
          name="Position"
          value={getDD("Position")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.RRate.Position.map((value) => (
            <MenuItem key={"80" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select={true}
          label="Pattern"
          name="Pattern"
          value={getDD("Pattern")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.RRate.Pattern.map((value) => (
            <MenuItem key={"90" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>

        {/* <Divider style={{marginTop:10}} />
            <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                <Button size="small" variant="outlined" onClick={() => handleShowMoreFields(false)}>Cancel</Button>
                <Button size="small" variant='contained' color='secondary' onClick={() => handleShowMoreFields(false)}>DONE</Button>
            </CardActions> */}
      </Box>
    </Box>
  );
}

function SPElementForm(props) {
  const { classes, ElementName, getData } = props;
  const [showMoreField, setShowMoreField] = useState(false);
  const [FormData, setFormData] = useState({
    Common: "",
    detail: [
      {
        name: "Position",
        description: "Position while measurement",
        value: "",
      },
      { name: "Delivery", description: "Oxygen delivery", value: "" },
    ],
  });

  const handleShowMoreFields = (status) => {
    if (status === "toggle") setShowMoreField(!showMoreField);
    else setShowMoreField(status);
  };
  const handleChange = (e) => {
    if (e.target.name == "Common") {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
    } else {
      let newData = [];
      for (let detail of FormData.detail) {
        if (detail.name == e.target.name) {
          detail.value = e.target.value;
        }
        newData.push(detail);
      }
      setFormData({ ...FormData, ["detail"]: newData });
    }
  };
  const handleData = () => {
    getData({ elementName: ElementName, data: FormData });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 100 || e.target.value < 0) return false;
    handleChange(e);
    handleData();
  };
  const getDD = (name) => {
    let detail = FormData.detail.filter((itm) => itm.name == name);
    return Array.isArray(detail) ? detail[0].value : "";
  };
  const getBGColor = () => {
    if (FormData.Common != "" && FormData.Common < 88) return colors.red;
    else if (FormData.Common >= 88 && FormData.Common <= 94)
      return colors.yellow;
    else if (FormData.Common >= 95 && FormData.Common <= 100)
      return colors.green;
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Paper
        className={classes.primaryInputBox}
        style={{ backgroundColor: getBGColor() }}
      >
        <InputBase
          className={classes.primaryInput}
          name="Common"
          value={FormData.Common}
          onChange={handleCommonData}
          placeholder="100"
          type="number"
          inputProps={{ maxLength: 3 }}
        />
        <Typography variant="body2" noWrap={true} style={{ paddingRight: 5 }}>
          %
        </Typography>
        <Divider style={{ height: 28, margin: 1 }} orientation="vertical" />
        <IconButton
          style={{ padding: "10px" }}
          aria-label="menu"
          onClick={() => handleShowMoreFields("toggle")}
          size="large"
        >
          {showMoreField ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Paper>

      <Box style={{ marginTop: 10, display: showMoreField ? "block" : "none" }}>
        <TextField
          select={true}
          label="Select Position"
          name="Position"
          value={getDD("Position")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.SPO2.Position.map((value) => (
            <MenuItem key={"100" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select={true}
          label="Select Delivery"
          name="Delivery"
          value={getDD("Delivery")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.SPO2.Delivery.map((value) => (
            <MenuItem key={"101" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>

        {/* <Divider style={{marginTop:10}} />
            <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                <Button size="small" variant="outlined" onClick={() => handleShowMoreFields(false)}>Cancel</Button>
                <Button size="small" variant='contained' color='secondary' onClick={() => handleShowMoreFields(false)}>DONE</Button>
            </CardActions> */}
      </Box>
    </Box>
  );
}

function TemperatureElementForm(props) {
  const { classes, ElementName, getData } = props;
  const [showMoreField, setShowMoreField] = useState(false);
  const [button, setButton] = useState(false);
  const [FormData, setFormData] = useState({
    Common: "",
    detail: [
      { name: "Measurement", description: "Site of measurement", value: "" },
      { name: "Pattern", description: "Oxygen delivery", value: "" },
    ],
  });

  // const handleShowMoreFields = () => {
  //   if (status === "toggle") setShowMoreField(!showMoreField);
  //   else setShowMoreField(status);
  // };
  // const handleChange = (e) => {
  //   if (e.target.name == "Common") {
  //     setFormData({ ...FormData, [e.target.name]: e.target.value });
  //   } else {
  //     let newData = [];
  //     for (let detail of FormData.detail) {
  //       if (detail.name == e.target.name) {
  //         detail.value = e.target.value;
  //       }
  //       newData.push(detail);
  //     }
  //     setFormData({ ...FormData, ["detail"]: newData });
  //   }
  // };

  const handller = () => {
    setButton(!button);
  };

  const handleData = () => {
    getData({ elementName: ElementName, data: FormData });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 130 || e.target.value <= 0) return false;
    handleChange(e);
    handleData();
  };
  const getDD = (name) => {
    let detail = FormData.detail.filter((itm) => itm.name == name);
    return Array.isArray(detail) ? detail[0].value : "";
  };
  const getBGColor = () => {
    if (
      FormData.Common != "" &&
      (FormData.Common < 94 || FormData.Common > 102)
    )
      return colors.red;
    else if (FormData.Common >= 94 && FormData.Common <= 96.5)
      return colors.yellow;
    else if (FormData.Common >= 97 && FormData.Common <= 99.5)
      return colors.green;
    else if (FormData.Common >= 100 && FormData.Common <= 102)
      return colors.yellow;
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Paper
        className={classes.primaryInputBox}
        style={{ backgroundColor: getBGColor() }}
      >
        <InputBase
          className={classes.primaryInput}
          name="Common"
          value={FormData.Common}
          onChange={handleCommonData}
          placeholder="98"
          type="number"
          inputProps={{ maxLength: 3 }}
          error={true}
          color="secondary"
        />
        <Typography variant="body2" noWrap={true} style={{ paddingRight: 5 }}>
          {button ? "cm" : "inch"}
        </Typography>
        <Divider style={{ height: 28, margin: 1 }} orientation="vertical" />
        <IconButton
          style={{ padding: "10px" }}
          aria-label="menu"
          onClick={() => handller("toggle")}
          size="large"
        >
          {showMoreField ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Paper>

      <Box style={{ marginTop: 10, display: showMoreField ? "block" : "none" }}>
        <TextField
          select={true}
          label="Site of measurement"
          name="Measurement"
          value={getDD("Measurement")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.Temperature.Measurement.map((value) => (
            <MenuItem key={"102" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select={true}
          label="Pattern"
          name="Pattern"
          value={getDD("Pattern")}
          onChange={handleCommonData}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{ style: { top: 0 } }}
          InputProps={{ style: { marginTop: 5 } }}
        >
          {Assets.Temperature.Pattern.map((value) => (
            <MenuItem key={"103" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>

        {/* <Divider style={{marginTop:10}} />
            <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                <Button size="small" variant="outlined" onClick={() => handleShowMoreFields(false)}>Cancel</Button>
                <Button size="small" variant='contained' color='secondary' onClick={() => handleShowMoreFields(false)}>DONE</Button>
            </CardActions> */}
      </Box>
    </Box>
  );
}

function FlowSheetElementForm(props) {
  switch (props.ElementName) {
    case "Pulse":
      return <PulseElementForm {...props} />;
    case "Blood Pressure":
      return <BPElementForm {...props} />;
    case "Respiratory Rate":
      return <RRateElementForm {...props} />;
    case "Oxygen Saturation SPO2":
      return <SPElementForm {...props} />;
    case "Temperature":
      return <TemperatureElementForm {...props} />;
    case "Height":
      return <TemperatureElementForm {...props} />;
    default:
      return null;
  }
}

FlowSheetElementForm.propTypes = {
  getData: PropTypes.func,
  ElementName: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlowSheetElementForm);
