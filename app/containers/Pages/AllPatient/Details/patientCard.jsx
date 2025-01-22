import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import styles from "./settings-jss";
import { Box, Avatar, Divider, Typography } from "@mui/material";
import avatarApi from "dan-api/images/avatars";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";

const PatientCard = (props) => {
  const { classes } = props;

  const location = useLocation();
  const userData = {};
  const { loggedInUser } = useSelector((state) => state.login);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        key={loggedInUser.user_id}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          alt={loggedInUser.first_name}
          src={avatarApi[8]}
          className={classes.avatar}
        />
        <Typography variant="h6">
          {loggedInUser.first_name + " " + loggedInUser.last_name}
        </Typography>
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="body2">{userData.healthId}</Typography>
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="body2">
          {moment(loggedInUser.dob).format("DD MMM YYYY")}
        </Typography>
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="body2">{userData.gender}</Typography>
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="body2">{loggedInUser.mobile}</Typography>
      </Box>
    </Box>
  );
};

export default withStyles(styles)(PatientCard);
