import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import brand from "dan-api/dummy/brand";
import { RegisterForm } from "dan-components";
import styles from "dan-components/Forms/user-jss";
import { createHealthIdRequest } from "dan-redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

function Register(props) {
  const responseData = useSelector((state) => state.otp);
  const dispatch = useDispatch();
  const authLogin = (values) => {
    dispatch(createHealthIdRequest(values));
  };

  const submitForm = (values) => {
    authLogin(values);
  };

  // useEffect(() => {
  //   if (responseData.data.Status == "Success") {
  //     setTimeout(() => {
  //       window.location.href = "/app";
  //     }, 500); // simulate server latency
  //   }
  // }, [responseData]);

  const title = brand.name + " - Register";
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          {/* <RegisterForm
            handleData={(values) => submitForm(values)}
            errorSms={responseData.error}
          /> */}
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
