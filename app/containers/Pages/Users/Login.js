import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { withStyles } from "@mui/styles";
import { LoginForm } from "dan-components";
import styles from "dan-components/Forms/user-jss";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "dan-redux/actions/loginAndRegister";

function Login(props) {
  const responseData = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const authLogin = (values) => {
    dispatch(userLogin(values));
  };

  const submitForm = (values) => {
    authLogin(values);
  };

  useEffect(() => {
    if (responseData.data.Status == "Success") {
      setTimeout(() => {
        //window.location.href = "/app";
      }, 500); // simulate server latency
    }
  }, [responseData]);

  const title = brand.name + " - Login";
  const description = brand.desc;
  const { classes } = props;
  return (
    <Fragment>
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
            <LoginForm
              handleData={(values) => submitForm(values)}
              errorSms={responseData && responseData.error}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
