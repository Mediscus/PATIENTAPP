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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { withStyles } from "@material-ui/core/styles";
import styles from "../PatientEncounter-jss";
import { Assets } from "dan-api/dummy/FlowSheet";

const colors = {
  red: "#e6b8af",
  yellow: "#ffff02bd",
  blue: "#4472c491",
  green: "#93c47db5",
};

function HeightElementForm(props) {
  const { classes, ElementName, getData } = props;
  const [FormData, setFormData] = useState({
    Height: "",
    Weight: "",
    BMI: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...FormData, [name]: value });
    handleData({ ...FormData, [name]: value });
  };

  const handleData = (data) => {
    getData({ elementName: ElementName, data: data });
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Paper className={classes.primaryInputBox}>
        <InputBase
          className={classes.primaryInput}
          name="Height"
          value={FormData.Height}
          onChange={handleChange}
          placeholder="Height in CM"
          type="number"
          inputProps={{ maxLength: 3 }}
        />
      </Paper>
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
    let name = e.target.name;
    let value = e.target.value;
    if (name == "BPSystolic" || name == "BPDiastolic") {
      setBpData({ ...bpData, [name]: value });
      let cpyFormData = { ...FormData };
      if (name === "BPSystolic") {
        cpyFormData.Common = value + "/" + bpData.BPDiastolic;
      } else {
        cpyFormData.Common = bpData.BPSystolic + "/" + value;
      }
      setFormData({
        ...cpyFormData,
      });
      handleData({
        ...cpyFormData,
      });
    } else {
      let newData = [];
      for (let detail of FormData.detail) {
        if (detail.name == name) {
          detail.value = value;
        }
        newData.push(detail);
      }
      setFormData({ ...FormData, ["detail"]: newData });
      handleData({ ...FormData, ["detail"]: newData });
    }
  };
  const handleData = (data) => {
    console.log(data);
    getData({ elementName: ElementName, data: data });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 300 || e.target.value < 0) return false;

    handleChange(e);
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
      handleData({ ...FormData, [e.target.name]: e.target.value });
    } else {
      let newData = [];
      for (let detail of FormData.detail) {
        if (detail.name == e.target.name) {
          detail.value = e.target.value;
        }
        newData.push(detail);
      }
      setFormData({ ...FormData, ["detail"]: newData });
      handleData({ ...FormData, ["detail"]: newData });
    }
  };
  const handleData = (data) => {
    getData({ elementName: ElementName, data: data });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 200 || e.target.value < 0) return false;
    handleChange(e);
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
      handleData({ ...FormData, [e.target.name]: e.target.value });
    } else {
      let newData = [];
      for (let detail of FormData.detail) {
        if (detail.name == e.target.name) {
          detail.value = e.target.value;
        }
        newData.push(detail);
      }
      setFormData({ ...FormData, ["detail"]: newData });
      handleData({ ...FormData, ["detail"]: newData });
    }
  };
  const handleData = (data) => {
    getData({ elementName: ElementName, data: data });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 100 || e.target.value < 0) return false;
    handleChange(e);
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
  const [FormData, setFormData] = useState({
    Common: "",
    detail: [
      { name: "Measurement", description: "Site of measurement", value: "" },
      { name: "Pattern", description: "Oxygen delivery", value: "" },
    ],
  });

  const handleShowMoreFields = (status) => {
    if (status === "toggle") setShowMoreField(!showMoreField);
    else setShowMoreField(status);
  };
  const handleChange = (e) => {
    if (e.target.name == "Common") {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
      handleData({ ...FormData, [e.target.name]: e.target.value });
    } else {
      let newData = [];
      for (let detail of FormData.detail) {
        if (detail.name == e.target.name) {
          detail.value = e.target.value;
        }
        newData.push(detail);
      }
      setFormData({ ...FormData, ["detail"]: newData });
      handleData({ ...FormData, ["detail"]: newData });
    }
  };
  const handleData = (data) => {
    getData({ elementName: ElementName, data: data });
  };
  const handleCommonData = (e) => {
    if (e.target.value > 130 || e.target.value <= 0) return false;
    handleChange(e);
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
          fahrenheit
        </Typography>
        <Divider style={{ height: 28, margin: 1 }} orientation="vertical" />
        <IconButton
          style={{ padding: "10px" }}
          aria-label="menu"
          onClick={() => handleShowMoreFields("toggle")}
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

function BodyMeasurementForm(props) {
  switch (props.ElementName) {
    case "Height":
      return <HeightElementForm {...props} />;
    case "Weight":
      return <BPElementForm {...props} />;
    case "BMI":
      return <RRateElementForm {...props} />;
    case "Oxygen Saturation SPO2":
      return <SPElementForm {...props} />;
    case "Temperature":
      return <TemperatureElementForm {...props} />;
    default:
      return null;
  }
}

BodyMeasurementForm.propTypes = {
  getData: PropTypes.func,
  ElementName: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BodyMeasurementForm);
