import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Button,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Send from "@mui/icons-material/Send";
import css from "dan-styles/Form.scss";
import withStyles from '@mui/styles/withStyles';
import styles from "../PatientEncounter-jss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function PrevMedications(props) {
  const { classes, closeForm } = props;
  const { height } = useWindowDimensions();
  const [popupOpen, setPopupOpen] = useState(false);
  const [MedicationData, setMedicationData] = useState([]);

  const [tempData, setTempData] = useState({
    templateRef: "",
    eventName: "Medication",
    templateName: "",
    templateData: MedicationData
  });

  const handleChange = (name) => (event) => {
    setTempData({
      ...tempData,
      [name]: event.target.value,
    });
  };

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
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
      <div style={{ height: height - 176, overflow: "auto" }}>
        <Box
          m={2}
          border={1}
          sx={{ borderRadius: "5px", borderColor: "#E4E4E4" }}
        >
          {MedicationData && MedicationData.length > 0 && MedicationData.map((data, index) => {
            return (
              <Grid
                key={data.title + "-" + index}
                container
                justifyContent="space-between"
                style={{ marginTop: 10 }}
              >
                <Grid
                  item
                  xs={10}
                  sm={10}
                  style={{ marginTop: 5, marginLeft: 10 }}
                >
                  <Typography color="primary">{data.form}</Typography>
                  <Typography>FORM: {data.form}</Typography>
                  <Typography>BRAND NAME: {data.brandName}</Typography>
                </Grid>
                <Grid item xs={1} sm={1}>
                  <IconButton onClick={() => { }} size="large">
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => { }} size="large">
                    <DeleteForever />
                  </IconButton>
                </Grid>
                <Grid xs={12} style={{ marginTop: 10 }}>
                  <Divider />
                </Grid>
              </Grid>
            );
          })}
        </Box>
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
          <Grid container style={{ width: 500 }}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Enter Medication Template Name"
                placeholder="Enter Medication Template Name"
                type="text"
                name="templateName"
                value={tempData.templateName}
                onChange={handleChange('templateName')}
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
            onClick={() => handleSaveTemp()}
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
          xs={12}
          md={12}
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
        >
          <Button onClick={handlePopupOpen}>Save as Template</Button>
          <Box>
            <Button type="button" onClick={() => closeForm()}>Discard</Button>
            <Button variant="contained" color="secondary" onClick={() => closeForm()}>
              Save&nbsp;
              <Send className={classes.sendIcon} />
            </Button>
          </Box>
        </Grid>
      </div>
    </Box>
  );
}

PrevMedications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrevMedications);
