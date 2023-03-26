import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import styles from "../PatientEncounter-jss";
import css from "dan-styles/Form.scss";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import apiCall from "dan-redux/apiInterface";
import Send from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteForever from "@mui/icons-material/DeleteForever";

function PrevDiagnosis(props) {
  const { classes, closeForm, setMessage, callBack } = props;
  const { height } = useWindowDimensions();
  const [popupOpen, setPopupOpen] = useState(false);
  const [DiagnosisData, setDiagnosisData] = useState([]);

  const handleDelete = (data) => {
    console.log('data:', data)
  };

  const handleEdit = (data) => {
    console.log('data:', data)
  };

  const [tempData, setTempData] = useState({
    templateRef: "",
    eventName: "Diagnosis",
    templateName: "",
    templateData: DiagnosisData
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

  const handleSaveDiagnosis = async () => {
    await apiCall("ehr/diagnosis", "post", { bulkData: DiagnosisData })
      .then((res) => {
        if (res && res.Status === "Success") {
          setMessage("success", "Data saved successfully!");
          callBack(true);
        }
      })
      .catch((Error) => {
        console.log('Error:', Error)
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        setMessage("error", ErrorMessage);
      });
  };

  const handleSaveTemp = async () => {
    await apiCall('ehr/template', "post", tempData)
      .then((res) => {
        if (res && res.Data && res.Status === "Success") {
          let data = res.Data;
          setMessage("success", "Template saved successfully!");
          setPopupOpen(false);
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

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justify: "space-between",
      }}
    >
      <div style={{ height: height - 175, overflow: "auto" }}>
        <Box
          m={2}
          border={1}
          sx={{ borderRadius: "5px", borderColor: "#E4E4E4" }}
        >
          {DiagnosisData && DiagnosisData.length > 0 && DiagnosisData.map((data, index) => {
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
                  <Typography color="primary">{data.diagnosis_name}</Typography>
                  <Typography>Status: {data.status}</Typography>
                  <Typography>Date: {data.from_date}</Typography>
                  <Typography> Sequence: {data.sequence}</Typography>
                </Grid>
                <Grid item xs={1} sm={1}>
                  <IconButton onClick={() => handleEdit(data)} size="large">
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(data)} size="large">
                    <DeleteForever />
                  </IconButton>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10 }}>
                  <Divider />
                </Grid>
              </Grid>
            );
          })}
        </Box>
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
                  label="Enter Diagnosis Template Name"
                  placeholder="Enter Diagnosis Template Name"
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
      </div>
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
            <Button variant="contained" color="secondary" onClick={handleSaveDiagnosis}>
              Save&nbsp;
              <Send className={classes.sendIcon} />
            </Button>
          </Box>
        </Grid>
      </div>
    </Box>
  );
}

PrevDiagnosis.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrevDiagnosis);
