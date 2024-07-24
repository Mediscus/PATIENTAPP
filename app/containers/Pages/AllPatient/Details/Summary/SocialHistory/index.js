import React, { useEffect, useState } from "react";
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
import {
  AddCircleOutlineOutlined,
  DeleteForever,
  Edit,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import SocialHistoryForm from "./SocialHistoryForm";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar } from "dan-components";
import styles from "../List-jss";

function SocialHistory(props) {
  const { classes, add, shadow } = props;
  const patient = useParams();
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: "add" });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });

  const openForm = () => setForm({ ...form, open: true, type: "add" });
  const closeForm = () => setForm({ ...form, open: false });

  useEffect(() => {
    getSocialHistory();
    return () => {
      setApiData([]);
    };
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getSocialHistory();
    }
  };

  async function getSocialHistory() {
    if (Object.keys(patient).length > 0) {
      try {
        const res = await apiCall("ehr/social-history", "get", patient);
        if (res && res.Data && res.Status === "Success") {
          setApiData(res.Data);
        }
      } catch (error) {
        handleSnackBar(true, "error", error.ErrorMessage);
      }
    }
  }

  const handleDelete = async (id, patientRef) => {
    const prepareData = {
      patientRef,
      socialRef: id,
    };
    if (confirm("Are You Sure You Want To Delete This Social Info")) {
      try {
        const res = await apiCall("ehr/social-history", "delete", prepareData);
        if (res && res.Status === "Success") {
          handleSnackBar(true, "success", "Data Deleted Successfully");
          getSocialHistory();
        }
      } catch (error) {
        handleSnackBar(true, "error", error.ErrorMessage);
      }
    }
  };

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, open, type, msg });
  };

  const handleEdit = (data) => {
    setForm({ ...form, data, open: true, type: "edit" });
  };

  return (
    <Paper className={classes.root} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Social History
        </Typography>
        {add && (
          <IconButton color="secondary" onClick={openForm}>
            <AddCircleOutlineOutlined />
          </IconButton>
        )}
      </Box>
      <Divider />
      <Box p={1}>
        {apiData.length > 0 &&
          apiData.map((data, index) => (
            <List key={index} component="nav" aria-label="main mailbox folders">
              <ListItem className={classes.listStyle}>
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
                {add && (
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleEdit(data)} size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDelete(data.social_id, data.patient_ref)
                      }
                      size="small"
                    >
                      <DeleteForever fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            </List>
          ))}
      </Box>
      {form.open && (
        <SocialHistoryForm
          open={form.open}
          data={form.data}
          type={form.type}
          callBack={callBackResponse}
          setMessage={handleSnackBar}
          closeForm={closeForm}
        />
      )}
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, open: false })}
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
