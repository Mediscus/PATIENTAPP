import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import brand from "dan-api/dummy/brand";
import { Grid } from "@mui/material";
import styles from "../settings-jss";
import BasicInfo from "./BasicInfo";
import Address from "./Address";
import Guarantor from "./Guarantor";
import Insurance from "./Insurance";
import Contact from "./EmergencyContact";
import SocialServiceInfo from "./SocialServiceInfo";

function PatientProfile(props) {
  const { classes } = props;
  const title = brand.name + " - Widgets";
  const description = brand.desc;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Grid item xs={12} md={12}>
        <BasicInfo />
        <Address />
        <Guarantor />
        <Insurance />
        <Contact />
        <SocialServiceInfo />
      </Grid>
    </div>
  );
}

PatientProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientProfile);
