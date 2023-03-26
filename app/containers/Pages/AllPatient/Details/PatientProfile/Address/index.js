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
import AddressForm from "./AddressForm";
import styles from "../patientProfile-jss";

function Address(props) {
  const patient = useParams();
  const { classes, ...other } = props;
  const [apiData, setApiData] = useState([]);
  const [editData, setEditData] = useState({
    open: false,
    data: {},
    type: "",
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    type: "",
    msg: "",
  });

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ['type']: type, ["msg"]: msg });
  };

  const getAddressInfo = async () => {
    if (patient) {
      await apiCall('patient/address', "get", patient)
        .then((res) => {
          if (res && res.Status === "Success") {
            let data = res.Data;
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

  const handleDeleteInfo = async (addressId, patientId) => {
    if (patient) {
      if (confirm("Are You Sure You Want To Delete This Address") == true) {
        await apiCall(
          'patient/address',
          "delete", { patientRef: patientId, addressRef: addressId }
        )
          .then((res) => {
            if (res && res.Status === "Success") {
              let data = res.Data;
              handleSnackBar(true, "success", "Data Deleted Successffuly");
              getAddressInfo();
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
    getAddressInfo();
  }, []);

  const callBackResponse = (refresh) => {
    setEditData({ ...editData, ["open"]: false })
    if (refresh) {
      getAddressInfo();
    }
  }

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Address
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
          {apiData && apiData.length > 0 &&
            apiData.map((obj, ind) => {
              return (
                <Grid
                  key={obj.address_id}
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
                        Address Type
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.address_type}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Country
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.country}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        State
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.state}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        City
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.city}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Zip Code
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.zip_code}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Address Line 1
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.address_line1}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography
                        variant="body2"
                        style={{ fontSize: 14 }}
                        color="primary"
                      >
                        Address Line 2
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        {obj.address_line2}
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
                          handleDeleteInfo(obj.address_id, obj.patient_ref)
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

        <AddressForm
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

Address.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Address);
