import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import brand from "dan-api/dummy/brand";
import { RegisterForm } from "dan-components";
import useStyles from "dan-components/Forms/user-jss";
import { userRegister } from "dan-redux/actions/loginAndRegister";
import { useDispatch, useSelector } from "react-redux";

function Register(props) {
  const { classes } = useStyles();
  const responseData = useSelector((state) => state.register);
  const dispatch = useDispatch();

  const authLogin = (values) => {
    dispatch(userRegister(values));
  };

  const submitForm = (values) => {
    authLogin(values);
  };

  useEffect(() => {
    if (responseData.data.Status == "Success") {
      setTimeout(() => {
        window.location.href = "/";
      }, 500); // simulate server latency
    }
  }, [responseData]);

  const title = brand.name + " - Register";
  const description = brand.desc;
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
          <RegisterForm
            handleData={(values) => submitForm(values)}
            errorSms={responseData.error}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
