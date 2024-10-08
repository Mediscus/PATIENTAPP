import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import classNames from "classnames";``
import VaccinationsHistoryForm from "./VaccinationsHistoryForm";
import {
  AddCircleOutlineOutlined,
  DeleteForever,
  Edit,
} from "@mui/icons-material";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar } from "dan-components";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../List-jss";

function VaccinationsHistory(props) {
  const patient = useParams();
  const { classes, add, shadow } = props;
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ open: false, data: null, type: "add" });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });
  const openForm = () => setForm({ ...form, ["open"]: true, ["type"]: "add" });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getVaccinationHistory();
    return () => {
      setApiData([]);
    };
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getVaccinationHistory();
    }
  };

  async function getVaccinationHistory() {
    if (Object.keys(patient).length > 0) {
      await apiCall("ehr/vaccinations-history", "get", patient)
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
  }

  const handleDelete = async (id, patientRef) => {
    let prepareData = {
      patientRef: patientRef,
      vaccinationRef: id,
    };
    if (prepareData) {
      if (confirm("Are You Sure You Want To Delete This Data") == true) {
        await apiCall("ehr/vaccinations-history", "delete", prepareData)
          .then((res) => {
            if (res && res.Data && res.Status === "Success") {
              let data = res.Data;
              handleSnackBar(true, "success", "Data Deleted Successffuly");
              getVaccinationHistory();
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
    setForm({ ...form, ["data"]: data, ["open"]: true, ["type"]: "edit" });
  };

  const handleMessage = (type, msg) => {
    handleSnackBar(true, type, msg);
  };

  return (
    <Paper className={classNames(classes.root)} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Vaccinations History
        </Typography>
        {add && (
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <AddCircleOutlineOutlined />
          </IconButton>
        )}
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
                  button
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
                    {data.against_disease}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: 12 }}>
                    {data.schedule}
                  </Typography>
                </ListItem>
                {add && (
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
                        handleDelete(data.vaccination_id, data.patient_ref)
                      }
                      size="small"
                    >
                      <DeleteForever fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </List>
            );
          })}
      </Box>
      {form.open && (
        <VaccinationsHistoryForm
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

VaccinationsHistory.propTypes = {
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};

VaccinationsHistory.defaultProps = {
  add: true,
  shadow: 1,
};

export default withStyles(styles)(VaccinationsHistory);
