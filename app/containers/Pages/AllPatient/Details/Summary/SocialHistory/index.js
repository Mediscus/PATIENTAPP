import { Box, Divider, Paper, Typography, List, ListItem, IconButton, ListItemSecondaryAction } from "@mui/material";
import { AddCircleOutlineOutlined, DeleteForever, Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SocialHistoryForm from "./SocialHistoryForm";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar } from "dan-components";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../List-jss";

function SocialHistory(props) {
  const patient = useParams();
  const { classes, add, shadow } = props;
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getSocialHistory();
    return () => {
      setApiData([]);
    }
  }, []);

  const callBackResponse = (refresh) => {
    closeForm()
    if (refresh) {
      getSocialHistory();
    }
  }

  async function getSocialHistory() {
    if (Object.keys(patient).length > 0) {
      await apiCall('ehr/social-history', "get", patient)
        .then((res) => {
          if (res && res.Data && res.Status === "Success") {
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

  const handleDelete = async (id, patientRef) => {
    let prepareData = {
      patientRef: patientRef,
      socialRef: id
    }
    if (prepareData) {
      if (
        confirm("Are You Sure You Want To Delete This Social Info") == true
      ) {
        await apiCall(
          'ehr/social-history',
          "delete", prepareData
        )
          .then((res) => {
            let data = res.Data;
            if (res && res.Status === "Success") {
              handleSnackBar(true, "success", "Data Deleted Successffuly");
              getSocialHistory();
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

  const handleMessage = (type, msg) => {
    handleSnackBar(true, type, msg);
  };

  return (
    <Paper className={classNames(classes.root)} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Social History
        </Typography>
        {add && <IconButton color="secondary" onClick={() => openForm()} size="large">
          <AddCircleOutlineOutlined />
        </IconButton>}
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
                    {data.activity_name}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: 12 }}>
                    {data.status}
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
                        handleDelete(data.social_id, data.patient_ref)
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
        <SocialHistoryForm
          open={form.open}
          data={form.data}
          type={form.type}
          callBack={callBackResponse}
          setMessage={(type, msg) => handleMessage(type, msg)}
          closeForm={closeForm}
        />
      )}
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
    </Paper>
  );
}

SocialHistory.propTypes = {
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};

SocialHistory.defaultProps = {
  add: true,
  shadow: 1,
};

export default withStyles(styles)(SocialHistory);
