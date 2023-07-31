import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { Box, IconButton, Paper, Typography } from "@mui/material";
import AdviseForm from "./AdviseForm";
import apiCall from "dan-redux/apiInterface";
import AdviseTable from "./AdviseTable";
import classNames from "classnames";
import { CustomSnackbar } from "dan-components";
import { useParams } from "react-router-dom";
import Add from "@mui/icons-material/Add";

function Advise(props) {
  const { classes, encounterData } = props;
  const patientRef = useParams();
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => setForm({ ...form, ["open"]: false });

  useEffect(() => {
    getAdviceComment();
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getAdviceComment();
    }
  }

  async function getAdviceComment() {
    if (Object.keys(patientRef).length > 0) {
      await apiCall('ehr/advice-comment', "get", patientRef)
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

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleMessage = (type, msg) => {
    handleSnackBar(true, type, msg);
  };

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Box style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}>
        <Typography variant="h6" component={"span"}>
          Advice & Comment
        </Typography>
        <IconButton color="secondary" onClick={() => openForm()} size="large">
          <Add />
        </IconButton>
      </Box>
      <AdviseTable adviceData={apiData} encounterData={encounterData} />
      {form.open && (
        <AdviseForm
          open={form.open}
          data={form.data}
          closeForm={closeForm}
          callBack={callBackResponse}
          setMessage={(type, msg) => handleMessage(type, msg)}
          encounterData={encounterData}
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

Advise.propTypes = {
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

export default withStyles(styles)(Advise);
