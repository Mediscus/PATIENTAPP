import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import brand from "dan-api/dummy/brand";
import { RegisterForm } from "dan-components";
import useStyles from "dan-components/Forms/user-jss";
import { createHealthIdRequest } from "dan-redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FlashAuto } from "@mui/icons-material";
import AccountStatus from "../../../components/Forms/AccountStatus";

function Register(props) {
  const { classes } = useStyles();
  const responseData = useSelector((state) => state.otp);
  const dispatch = useDispatch();
  const history = useHistory(); // Initialize useHistory hook
  const { showAccountStatus } = useSelector((state) => state.registration);
  // const [show, setShow] = useState(false);
  const authLogin = (values) => {
    dispatch(createHealthIdRequest(values));
    // setShow(true);
  };

  const submitForm = (values) => {
    authLogin(values);
  };

  useEffect(() => {
    if (responseData.state) {
      setTimeout(() => {
        history.push("/app/all-patient");
      }, 500);
    }
  }, [responseData, history]);

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
          {showAccountStatus.isShow ? (
            <AccountStatus />
          ) : (
            <RegisterForm
              handleData={(values) => submitForm(values)}
              errorSms={responseData.error}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
