import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import FloatingPanel from "../../Panel/FloatingPanel";
import styles from "../PatientEncounter-jss";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import apiCall from "dan-redux/apiInterface";
import {
  Box,
  Divider,
  Grid,
  InputBase,
  IconButton,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import Send from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PieChartIcon from "@mui/icons-material/PieChart";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import AdviseHelper from "./AdviseHelper";
import { useParams } from "react-router-dom";

function AdviseForm(props) {
  const patientRef = useParams();
  const branch = "HELLO";
  const { classes, encounterData, open, closeForm, data, callBack, setMessage } = props;
  const { height } = useWindowDimensions();
  const [popupOpen, setPopupOpen] = useState(false);
  const [dietText, setDietText] = useState("");
  const [exercise, setExercise] = useState("");

  const [formData, setFormData] = useState({
    patientRef: patientRef.patientRef,
    encounterRef: encounterData.appointment_id,
    diet: [],
    exercise: [],
    comment: "",
  });

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleChange = (name) => (event) => {
    if (name == "diet") {
      setDietText(event.target.value);
    }
    if (name == "exercise") {
      setExercise(event.target.value);
    }
    if (name == "comment") {
      setFormData({ ...formData, ["comment"]: event.target.value });
    }
  };

  const handleAddMoreDiet = (name) => {
    let value = name == "diet" ? dietText : exercise;
    if (value == "") {
      return false;
    }
    let fd = formData[name];
    fd.push(value);
    setFormData({ ...formData, [name]: fd });
    setDietText("");
    setExercise("");
  };

  const submitForm = async () => {
    await apiCall("ehr/advice-comment", "post", formData)
      .then((res) => {
        if (res && res.Status === "Success") {
          setMessage("success", "Data saved successfully!");
          callBack(true);
        }
      })
      .catch((Error) => {
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        setMessage("error", ErrorMessage);
      });
  };

  const handleDeleteDiet = (value) => {
    let fd = formData.diet;
    const index = fd.indexOf(value);
    if (index > -1) {
      fd.splice(index, 1);
    }
    setFormData({ ...formData, ["diet"]: fd });
  };

  const handleDeleteExersice = (value) => {
    let fd = formData.exercise;
    const index = fd.indexOf(value);
    if (index > -1) {
      fd.splice(index, 1);
    }
    setFormData({ ...formData, ["exercise"]: fd });
  };

  const renderDietList = () => {
    let dietList = [];
    const { diet } = formData;
    if (diet && diet.length > 0) {
      for (let ind = 0; ind < diet.length; ind++) {
        dietList[ind] = (
          <Grid item key={"1000" + ind} sm={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{diet[ind]}</Typography>
              <IconButton
                style={{ color: "red", padding: 0 }}
                onClick={() => handleDeleteDiet(diet[ind])}
                size="large">
                <DeleteForeverIcon />
              </IconButton>
            </Box>
            <Divider style={{ marginTop: 10 }} />
          </Grid>
        );
      }
    }
    return dietList;
  };

  const renderExersiceList = () => {
    let dietList = [];
    const { exercise } = formData;
    if (exercise && exercise.length > 0) {
      for (let ind = 0; ind < exercise.length; ind++) {
        dietList[ind] = (
          <Grid item key={"1000" + ind} sm={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{exercise[ind]}</Typography>
              <IconButton
                style={{ color: "red", padding: 0 }}
                onClick={() => handleDeleteExersice(exercise[ind])}
                size="large">
                <DeleteForeverIcon />
              </IconButton>
            </Box>
            <Divider style={{ marginTop: 10 }} />
          </Grid>
        );
      }
    }
    return dietList;
  };

  return (
    <FloatingPanel
      openForm={open}
      branch={branch}
      closeForm={closeForm}
      title="Advise & comment"
      extraSize={false}
      helper={true}
      helperComponent={<AdviseHelper encounterData={encounterData} />}
    >
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
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
              className={classes.inputBorder}
            >
              <InputBase
                style={{
                  width: 350,
                }}
                name="diet"
                value={dietText}
                onChange={handleChange("diet")}
                placeholder="diet"
                type="text"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Divider
                  style={{ height: 28, margin: 1 }}
                  orientation="vertical"
                />
                <IconButton
                  style={{ padding: "5px" }}
                  aria-label="add new"
                  color="secondary"
                  onClick={() => handleAddMoreDiet("diet")}
                  size="large">
                  <AddIcon />
                </IconButton>
                <Divider
                  style={{ height: 28, margin: 1 }}
                  orientation="vertical"
                />
                <IconButton
                  style={{ padding: "5px" }}
                  aria-label="show chart"
                  color="secondary"
                  onClick={() => { }}
                  size="large">
                  <PieChartIcon />
                </IconButton>
              </Box>
            </Grid>

            {renderDietList()}

            <Grid
              item
              xs={12}
              sm={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
              className={classes.inputBorder}
            >
              <InputBase
                style={{
                  width: 350,
                }}
                name="Exersice"
                value={exercise}
                onChange={handleChange("exercise")}
                placeholder="Exersice"
                type="text"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Divider
                  style={{ height: 28, margin: 1 }}
                  orientation="vertical"
                />
                <IconButton
                  style={{ padding: "5px" }}
                  aria-label="add new"
                  color="secondary"
                  onClick={() => handleAddMoreDiet("exercise")}
                  size="large">
                  <AddIcon />
                </IconButton>
                <Divider
                  style={{ height: 28, margin: 1 }}
                  orientation="vertical"
                />
                <IconButton
                  style={{ padding: "5px" }}
                  aria-label="show chart"
                  color="secondary"
                  onClick={() => { }}
                  size="large">
                  <PieChartIcon />
                </IconButton>
              </Box>
            </Grid>

            {renderExersiceList()}

            <Grid
              item
              xs={12}
              sm={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
              className={classes.inputBorder}
            >
              <InputBase
                fullWidth
                variant="outlined"
                placeholder="comment"
                type="text"
                multiline
                minRows={4}
                value={formData.comment}
                onChange={handleChange("comment")}
              />
            </Grid>
          </Grid>
        </div>
        <Dialog
          open={popupOpen}
          onClose={handlePopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{
              marginBottom: 5,
            }}
            id="alert-dialog-title"
          >
            {"Template"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="diet"
                  placeholder="diet"
                  helperText="Keep it blank if you dont want save"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="exercise"
                  placeholder="exercise"
                  helperText="Keep it blank if you dont want save"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="comment"
                  placeholder="comment"
                  helperText="Keep it blank if you dont want save"
                  type="text"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose} color="primary">
              Discard
            </Button>
            <Button
              variant="contained"
              onClick={handlePopupClose}
              color="primary"
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <div className={css.buttonArea}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
          >
            <Button onClick={handlePopupOpen}>Save as Template</Button>
            <Box>
              <Button type="button" onClick={() => closeForm()}>Discard</Button>
              <Button
                disabled={formData.diet.length === 0 && formData.exercise.length === 0 ? true : false}
                variant="contained"
                color="secondary"
                onClick={() => submitForm()}
              >
                Save&nbsp;
                <Send className={classes.sendIcon} />
              </Button>
            </Box>
          </Grid>
        </div>
      </Box>
    </FloatingPanel>
  );
}

AdviseForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviseForm);
