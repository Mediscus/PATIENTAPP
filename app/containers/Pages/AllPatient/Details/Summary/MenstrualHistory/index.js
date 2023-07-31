import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import classNames from "classnames";
import MenstrualHistoryForm from "./MenstrualHistoryForm";
import { AddCircleOutlineOutlined, DeleteForever, Edit } from "@mui/icons-material";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar, MenstrualCycle } from "dan-components";
import styles from "../List-jss";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MenstrualHistory(props) {
  const patient = useParams();
  const { classes, add, shadow } = props;
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];


  const callBackResponse = (refresh) => {
    closeForm()
    if (refresh) {
      getMenstrualHistory();
    }
  }

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleMessage = (type, msg) => {
    handleSnackBar(true, type, msg);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Paper className={classNames(classes.root)} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Menstrual History
        </Typography>
        {add &&
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <AddCircleOutlineOutlined />
          </IconButton>
        }
      </Box>
      <Divider />
      {form.open && (
        <MenstrualHistoryForm
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

MenstrualHistory.propTypes = {
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};

MenstrualHistory.defaultProps = {
  add: true,
  shadow: 1,
};

export default withStyles(styles)(MenstrualHistory);
