import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import styles from "./settings-jss";
import { Box, Avatar, Divider, Typography } from "@mui/material";
import avatarApi from "dan-api/images/avatars";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PatientCard = (props) => {
  const { classes } = props;

  const location = useLocation();
  // const userData = location.state.userData;
  const userData = {};

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box key={userData.id} sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={userData.firstName}
          src={avatarApi[8]}
          className={classes.avatar}
        />
        <Typography variant="h6">
          {userData.firstName + " " + userData.lastName}
        </Typography>
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="body2">{userData.healthId}</Typography>
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="body2">
          {`${userData.dayOfBirth}-${userData.monthOfBirth}-${userData.yearOfBirth}`}
        </Typography>
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="body2">{userData.gender}</Typography>
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="body2">{userData.mobile}</Typography>
      </Box>
    </Box>
  );
};

export default withStyles(styles)(PatientCard);
