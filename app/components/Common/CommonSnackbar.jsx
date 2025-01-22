import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_SNACKBAR_ALERT_STATE } from "../../redux/constants/reduxFormConstants";

const CommonSnackbar = () => {
  const dispatch = useDispatch();
  const { isSnackbarAlert } = useSelector((state) => state.common);

  const handleClose = () => {
    dispatch({
      type: UPDATE_SNACKBAR_ALERT_STATE,
      payload: {
        open: false,
        type: "success",
        msg: "",
      },
    });
  };

  return (
    <Snackbar
      open={isSnackbarAlert.open}
      autoHideDuration={6000}
      //   onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: 1200 }}
    >
      <Alert
        // onClose={handleClose}
        severity={isSnackbarAlert.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {isSnackbarAlert.msg}{" "}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
