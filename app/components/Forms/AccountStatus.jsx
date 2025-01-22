import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.svg";
import useStyles from "./user-jss";
import { Box, Button, Hidden, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_SHOW_ACCOUNT_STATUS } from "../../redux/constants/reduxFormConstants";

const AccountStatus = () => {
  const { classes } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    history.push("/");
    dispatch({
      type: SET_SHOW_ACCOUNT_STATUS,
      payload: {
        isShow: false,
        status: "",
      },
    });
  };
  const handleCancel = () => {
    dispatch({
      type: SET_SHOW_ACCOUNT_STATUS,
      payload: {
        isShow: false,
        status: "",
      },
    });
  };

  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap)}>
        <Hidden mdDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
          </div>
        </Hidden>
        <Box style={{ padding: "30px" }}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Woops!
          </Typography>
          <Typography align="center" variant="h6">
            Looks like you have an existing account. Please press continue to
            Sign in.
          </Typography>
        </Box>

        <div
          className={classes.btnArea}
          style={{ justifyContent: "center", gap: "30px" }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSignIn()}
          >
            Sign In
          </Button>
        </div>
      </Paper>
    </Fragment>
  );
};

export default AccountStatus;
