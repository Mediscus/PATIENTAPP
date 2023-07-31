import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
// project imports
import { CustomSnackbar } from "dan-components";
import { useParams } from "react-router-dom";
import apiCall from "dan-redux/apiInterface";
import NotFound from "../NotFound";
import { Add, DeleteForever, Edit } from "@mui/icons-material";
import ContactForm from "./ContactForm";
import styles from "../patientProfile-jss";

function EmergencyContact(props) {
  const { classes, ...other } = props;
  const patientId = useParams();
  const [apiData, setApiData] = useState([]);
  const [editData, setEditData] = useState({ open: false, data: {}, type: "" });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ['type']: type, ["msg"]: msg });
  };

  const getContactInfo = async () => {
    if (patientId) {
      await apiCall('patient/emergency-contact', "get", patientId)
        .then((res) => {
          let data = res.Data;
          if (res && res.Status === "Success") {
            setApiData(data);
          }
        })
        .catch((Error) => {
          let ErrorMessage = Error.ErrorMessage;
          if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
            ErrorMessage = Error.ErrorMessage.join("\n");
          }
          handleSnackBar(true, "error", ErrorMessage);
        });
    }
  };

  const handleDeleteInfo = async (id, patientId) => {
    if (id) {
      if (patientId) {
        if (confirm("Are You Sure You Want To Delete This Contact") == true) {
          await apiCall(
            'patient/emergency-contact',
            "delete", { patientRef: patientId, contactRef: id }
          )
            .then((res) => {
              let data = res.Data;
              if (res && res.Status === "Success") {
                handleSnackBar(true, "success", "Data Deleted Successffuly");
                getContactInfo();
              }
            })
            .catch((Error) => {
              let ErrorMessage = Error.ErrorMessage;
              if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
                ErrorMessage = Error.ErrorMessage.join("\n");
              }
              handleSnackBar(true, "error", ErrorMessage);
            });
        }
      } else alert("Patient Id Not Found");
    } else alert("Contact Id Not Found");
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  const handleMessage = (msg) => {
    handleSnackBar(true, "success", msg);
  };

  const handleEdit = (array) => {
    if (array) {
      setEditData({
        ...editData,
        ["open"]: true,
        ["data"]: array,
      });
    }
  };

  const callBackResponse = (refresh) => {
    setEditData({ ...editData, ["open"]: false })
    if (refresh) {
      getContactInfo();
    }
  }

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Emergency Contact
        </Typography>
        <IconButton
          color="secondary"
          onClick={() =>
            setEditData({ ...editData, ["open"]: true, ["data"]: null })
          }
          size="large">
          <Add />
        </IconButton>
      </Box>
      <Divider />
      <Box>
        <Grid container spacing={1} alignItems="center">
          {apiData.length > 0 &&
            apiData.map((obj, ind) => {
              return (
                <Grid
                  key={ind}
                  item
                  xs={12}
                  sm={12}
                  container
                  style={{ padding: 15 }}
                >
                  <Grid
                    item
                    xs={12}
                    md={11}
                    spacing={1}
                    alignItems="center"
                    container
                  >
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Contact Type
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.contact_type}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        First Name
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.first_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Last Name
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.last_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Country Code
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.dial_country_code}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Phone Number
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.phone_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Relationship
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.relationship}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Comment
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.comment}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={1} container>
                    <Grid item xs={4} sm={6}>
                      <IconButton color="secondary" onClick={() => handleEdit(obj)} size="large">
                        <Edit />
                      </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={6}>
                      <IconButton
                        onClick={() =>
                          handleDeleteInfo(obj.contact_id, obj.patient_ref)
                        }
                        color="secondary"
                        size="large">
                        <DeleteForever />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}

          {apiData.length === 0 && <NotFound />}
        </Grid>
      </Box>
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
      {editData.open && (
        <ContactForm
          data={editData.data}
          openForm={editData.open}
          callBack={callBackResponse}
          closeForm={() => setEditData({ ...editData, ["open"]: false })}
          setMessage={(msg) => handleMessage(msg)}
        />
      )}
    </Paper>
  );
}

EmergencyContact.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(EmergencyContact);
