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

function Register(props) {
  const { classes } = useStyles();
  const responseData = useSelector((state) => state.otp);
  const dispatch = useDispatch();
  const history = useHistory(); // Initialize useHistory hook
  // const [show, setShow] = useState(false);
  const authLogin = (values) => {
    dispatch(createHealthIdRequest(values));
    // setShow(true);
  };

  const submitForm = (values) => {
    authLogin(values);
  };

  console.log(responseData, "-------------------------");

  // useEffect(() => {
  //   if () {
  //     // Assuming responseData contains the success data after health ID creation
  //     setTimeout(() => {
  //       history.push("/app/all-patient"); // Navigate to the next page using useHistory
  //     }, 500); // simulate server latency
  //   }
  // }, [responseData, history]); // Include history in the dependency array

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
