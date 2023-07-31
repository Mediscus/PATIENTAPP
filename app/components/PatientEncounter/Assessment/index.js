import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { Grid, Paper, Typography, IconButton, Box } from "@mui/material";
import AssessmentForm from "./AssessmentForm";
import AssessmentTable from "./AssessmentTable";
import classNames from "classnames";
import { CustomSnackbar } from "dan-components";
import { useParams } from "react-router-dom";
import apiCall from "dan-redux/apiInterface";
import { Add } from "@mui/icons-material";

function Assessment(props) {
  const patient = useParams();
  const { classes, encounterData } = props;
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getAssessment();
  }, []);

  const callBackResponse = (refresh) => {
    closeForm()
    if (refresh) {
      getAssessment();
    }
  }

  async function getAssessment() {
    if (Object.keys(patient).length > 0) {
      await apiCall('ehr/assessment', "get", patient)
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

  const handleDelete = async (id, patientRef) => {
    let prepareData = {
      patientRef: patientRef,
      assessmentRef: id
    }
    if (prepareData) {
      if (
        confirm("Are You Sure You Want To Delete This Data") == true
      ) {
        await apiCall(
          'ehr/assessment',
          "delete", prepareData
        )
          .then((res) => {
            if (res && res.Status === "Success") {
              let data = res.Data;
              handleSnackBar(true, "success", "Data Deleted Successffuly");
              getAssessment();
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
    <Grid item xs={12} md={12}>
      <Paper className={classNames(classes.root)} elevation={1}>
        <Box sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
          <Typography variant="h6" className={classes.title}>
            Assessment
          </Typography>
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <Add />
          </IconButton>
        </Box>
        <AssessmentTable
          assessmentData={apiData}
          handleEdit={(data) => handleEdit(data)}
          handleDelete={(id, patientRef) => handleDelete(id, patientRef)}
        />
      </Paper>
      {form.open && (
        <AssessmentForm
          open={form.open}
          data={form.data}
          type={form.type}
          callBack={callBackResponse}
          setMessage={(type, msg) => handleMessage(type, msg)}
          closeForm={closeForm}
          encounterData={encounterData}
        />
      )}
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
    </Grid>
  );
}

Assessment.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },

  },
});

export default withStyles(styles)(Assessment);
