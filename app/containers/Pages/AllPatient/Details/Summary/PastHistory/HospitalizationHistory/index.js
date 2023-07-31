import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import styles from "../../List-jss";
import HospitalizationForm from "./HospitalizationForm";
import { AddCircleOutlineOutlined, DeleteForever, Edit } from "@mui/icons-material";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar } from "dan-components";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";

function HospitalizationHistory(props) {
  const patient = useParams();
  const { classes, add } = props;
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getHospitalization();
    return () => {
      setApiData([]);
    }
  }, []);

  const callBackResponse = (refresh) => {
    closeForm()
    if (refresh) {
      getHospitalization();
    }
  }

  async function getHospitalization() {
    if (Object.keys(patient).length > 0) {
      await apiCall('ehr/hospitalization-history', "get", patient)
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
  const handleDelete = async (id, patientRef) => {
    let prepareData = {
      patientRef: patientRef,
      hospitalizeRef: id
    }
    if (prepareData) {
      if (
        confirm("Are You Sure You Want To Delete This Data") == true
      ) {
        await apiCall(
          'ehr/hospitalization-history',
          "delete", prepareData
        )
          .then((res) => {
            if (res && res.Status === "Success") {
              let data = res.Data;
              handleSnackBar(true, "success", "Data Deleted Successffuly");
              getHospitalization();
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

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleEdit = (data) => {
    setForm({ ...form, ["data"]: data, ["open"]: true, ['type']: 'edit' });
  };

  const handleMessage = (msg) => {
    handleSnackBar(true, "success", msg);
  };

  return <>
    <Box className={classes.header}>
      <Typography variant="body2" className={classes.title}>
        Previous hospitilazions
      </Typography>
      {add &&
        <IconButton color="secondary" onClick={() => openForm()} size="large">
          <AddCircleOutlineOutlined />
        </IconButton>
      }
    </Box>
    <Divider />
    <Box p={1}>
      {apiData && apiData.length > 0 &&
        apiData.map((data, index) => {
          return (
            <List
              key={index}
              component="nav"
              aria-label="main mailbox folders"
            >
              <ListItem
                className={classes.listStyle}
                classes={{
                  root: classes.listItemRoot,
                }}
              >
                <Typography
                  variant="body2"
                  style={{ fontSize: 14 }}
                  color="primary"
                >
                  {data.diagnosis}
                </Typography>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  {data.admit_date}
                </Typography>
              </ListItem>
              {add &&
                <ListItemSecondaryAction
                  classes={{
                    root: classes.secondaryAction,
                  }}
                >
                  <IconButton
                    color="secondary"
                    classes={{
                      root: classes.iconBtn,
                    }}
                    onClick={() => handleEdit(data)}
                    size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    classes={{
                      root: classes.iconBtn,
                    }}
                    onClick={() =>
                      handleDelete(data.hospitalize_id, data.patient_ref)
                    }
                    size="small">
                    <DeleteForever fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              }
            </List>
          );
        })}
    </Box>
    {form.open && (
      <HospitalizationForm
        open={form.open}
        data={form.data}
        type={form.type}
        callBack={callBackResponse}
        setMessage={(msg) => handleMessage(msg)}
        closeForm={closeForm}
      />
    )}
    <CustomSnackbar
      open={snackBar.open}
      msg={snackBar.msg}
      type={snackBar.type}
      onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
    />
  </>;
}

HospitalizationHistory.propTypes = {
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};

HospitalizationHistory.defaultProps = {
  add: true,
  shadow: 1,
};


export default withStyles(styles)(HospitalizationHistory);
