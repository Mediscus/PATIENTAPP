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
import SurgeryForm from "./SurgeryForm";
import { AddCircleOutlineOutlined, DeleteForever, Edit } from "@mui/icons-material";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar } from "dan-components";
import styles from "../../List-jss";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";

function SurgeryHistory(props) {
  const patient = useParams();
  const { classes, add } = props;
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getSurgery();
    return () => {
      setApiData([]);
    }
  }, []);

  const callBackResponse = (refresh) => {
    closeForm()
    if (refresh) {
      getSurgery();
    }
  }

  async function getSurgery() {
    if (Object.keys(patient).length > 0) {
      await apiCall('ehr/surgery-history', "get", patient)
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
      surgeryRef: id
    }
    if (prepareData) {
      if (
        confirm("Are You Sure You Want To Delete This Data") == true
      ) {
        await apiCall(
          'ehr/surgery-history',
          "delete", prepareData
        )
          .then((res) => {
            if (res && res.Status === "Success") {
              let data = res.Data;
              handleSnackBar(true, "success", "Data Deleted Successffuly");
              getSurgery();
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

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="body2" className={classes.title}>
          Previous surgeries
        </Typography>
        {add &&
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <AddCircleOutlineOutlined />
          </IconButton>
        }
      </Box>
      <Divider />
      <Box p={1}>
        {apiData &&
          apiData.length > 0 &&
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
                    {data.surgery_name}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: 12 }}>
                    {data.surgery_type}
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
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      classes={{
                        root: classes.iconBtn,
                      }}
                      onClick={() =>
                        handleDelete(data.surgery_id, data.patient_ref)
                      }
                      size="small"
                    >
                      <DeleteForever fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                }
              </List>
            );
          })}
      </Box>
      {form.open && (
        <SurgeryForm
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
    </>
  );
}

SurgeryHistory.propTypes = {
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};

SurgeryHistory.defaultProps = {
  add: true,
  shadow: 1,
};

export default withStyles(styles)(SurgeryHistory);
