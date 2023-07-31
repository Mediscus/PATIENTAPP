import React from "react";
import { withStyles } from "@mui/styles";
import styles from "./settings-jss";
import { Box, Avatar, Divider, Typography } from "@mui/material";
import avatarApi from "dan-api/images/avatars";
import { useSelector } from "react-redux";

const patientCard = (props) => {
  const { classes } = props;
  const patientDetails = useSelector((state) => state.patients.patient);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={patientDetails.first_name}
          src={avatarApi[8]}
          className={classes.avatar}
        />
        <Typography variant="h6">
          {patientDetails.first_name + " " + patientDetails.last_name}
        </Typography>
      </Box>
      <Divider className={classes.dividerVertical} orientation="vertical" />
      <Typography variant="body2">{patientDetails.abha_number}</Typography>
      <Divider className={classes.dividerVertical} orientation="vertical" />
      <Typography variant="body2">{patientDetails.dob}</Typography>
      <Divider className={classes.dividerVertical} orientation="vertical" />
      <Typography variant="body2">{patientDetails.gender}</Typography>
      <Divider className={classes.dividerVertical} orientation="vertical" />
      <Typography variant="body2">
        {patientDetails.dial_country_code + " " + patientDetails.phone}
      </Typography>
    </Box>
  );
};

export default withStyles(styles)(patientCard);
