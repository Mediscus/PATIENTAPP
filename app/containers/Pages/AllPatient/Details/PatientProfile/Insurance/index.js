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
import InsuranceForm from "./InsuranceForm";
import styles from "../patientProfile-jss";

function Insurance(props) {
  const { classes, ...other } = props;
  const patientId = useParams();
  const [apiData, setApiData] = useState([]);

  const [editData, setEditData] = useState({
    open: false,
    data: {},
    type: "",
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    type: "success",
    msg: "Sucess",
  });

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["msg"]: msg });
  };

  const getInsuranceInfo = async () => {
    if (patientId) {
      await apiCall('patient/insurance', "get", patientId)
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
        if (confirm("Are You Sure You Want To Delete This Insurance") == true) {
          await apiCall(
            'patient/insurance',
            "delete", { patientRef: patientId, insuranceRef: id }
          )
            .then((res) => {
              let data = res.Data;
              if (res && res.Status === "Success") {
                handleSnackBar(true, "success", "Data Deleted Successffuly");
                getInsuranceInfo();
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
    } else alert("Insurance Id Not Found");
  };

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

  useEffect(() => {
    getInsuranceInfo();
  }, []);

  const callBackResponse = (refresh) => {
    setEditData({ ...editData, ["open"]: false })
    if (refresh) {
      getInsuranceInfo();
    }
  }

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Insurance
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
                        Insurance Name
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.insurance_name}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Provider Name
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.provider_name}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Card Number
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.card_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Insurance Number
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.insurance_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        IMIS code
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.imis_code}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Initial Balance
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.initial_balance}
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
                          handleDeleteInfo(obj.insurance_id, obj.patient_ref)
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

        <InsuranceForm
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

Insurance.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Insurance);
