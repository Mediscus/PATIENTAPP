import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import classNames from "classnames";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import Hidden from "@mui/material/Hidden";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.svg";
import { loginFormSchema } from "dan-api/schemas";
import useStyles from "./user-jss";
import { ContentDivider } from "../Divider";
import { Checkbox, FormHelperText, TextField, Tabs, Tab } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AllInclusive,
  Brightness5,
  ArrowForward,
  People,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  generateOtpRequest,
  resendOtpRequest,
  resendMobileOtpRequest,
  verifyOtpRequest,
  createHealthIdRequest,
} from "dan-redux/actions/index";
import {
  generateAadharOtpRequest,
  verifyAadharOtpRequest,
} from "dan-redux/actions/aadharReg";
import { useHistory } from "react-router-dom";
import { bottom } from "@popperjs/core";
import { Formik } from "formik";
import { create } from "jss";

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  return <NavLink to={props.to} {...props} innerRef={ref} />;
});

function LoginForm(props) {
  const { classes } = useStyles();

  const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);

  const [otp, setOtp] = useState("");
  const [aadhaarOtp, setAadhaarOtp] = useState("");
  const [isMobileOtpSending, setMobileOtpSending] = useState(false);
  const [isAadhaarOtpSending, setAadhaarOtpSending] = useState(false);

  const history = useHistory();
  const [tab, setTab] = useState(0);

  const handleChangeTab = (_event, value) => {
    setTab(value);
  };

  const values = {
    mobile: "",
  };
  const value = {
    aadhaar: "",
  };

  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.otp);

  const handleOtpSubmit = (values, setMobileOtpSent) => {
    if (!isMobileOtpSending) {
      setMobileOtpSent(true);
      dispatch(generateOtpRequest(values));
    }
  };

  const handleAadharOtpSubmit = (value, setAadhaarOtpSent) => {
    if (!isAadhaarOtpSending) {
      setAadhaarOtpSent(true);
      dispatch(generateAadharOtpRequest(value));
    }
  };

  const handleOtpVerify = () => {
    dispatch(verifyOtpRequest(otp, responseData.txnId));
  };

  const handleAadharOtpVerify = () => {
    dispatch(verifyAadharOtpRequest(aadhaarOtp, responseData.txnId));
  };

  return (
    <>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, classes.petal)}>
        <Hidden mdDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button
              size="small"
              className={classes.buttonLink}
              component={LinkBtn}
              to="/loginaccount"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              Login
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Create ABHA Number
        </Typography>
        <Button
          size="small"
          className={classes.buttonLink}
          component={LinkBtn}
          to="/app/pages/abha"
        >
          create ABHA Number
        </Button>
        <section className={classes.socmedLogin}>
          <div className={classes.btnArea}>
            <Button
              variant="outlined"
              size="small"
              className={classes.redBtn}
              type="button"
            >
              <AllInclusive
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Mobile Verification
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.blueBtn}
              type="button"
            >
              <Brightness5
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Aadhar Verification
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.cyanBtn}
              type="button"
            >
              <People
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Socmed 3
            </Button>
          </div>
          <ContentDivider content="sign in with Mobile Number" />
        </section>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="Mobile Number" />
          <Tab label="Aadhar Card" />
        </Tabs>
        {tab === 0 && (
          <Formik
            initialValues={values}
            // validationSchema={loginFormSchema}
            onSubmit={(values, { resetForm, setErrors }) => {
              if (mobileOtpSent) {
                handleOtpVerify();
                setTimeout(() => {
                  history.push("/register");
                }, 500); // simulate server latency
              } else {
                handleOtpSubmit(values, setMobileOtpSent);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              /* and other goodies */
            }) => (
              <section className={classes.formWrap}>
                <form onSubmit={handleSubmit}>
                  <div style={{ margin: 10 }}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        fullWidth
                        name="mobile"
                        label="Your Mobile Number"
                        placeholder="Your Mobile Number"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.mobile ? errors.mobile : ""}
                        error={touched.mobile && Boolean(errors.mobile)}
                      />
                    </FormControl>
                  </div>

                  {mobileOtpSent && (
                    <div style={{ margin: 10 }}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          fullWidth
                          name="otp"
                          label="Your OTP number"
                          placeholder="Your OTP Number"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)} // Update the otp state
                          onBlur={handleBlur}
                          helperText={touched.otp ? errors.otp : ""}
                          error={touched.otp && Boolean(errors.otp)}
                        />
                      </FormControl>
                    </div>
                  )}

                  <div className={classes.btnArea}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                    >
                      Continue
                      <ArrowForward
                        className={classNames(
                          classes.rightIcon,
                          classes.iconSmall
                        )}
                      />
                    </Button>
                  </div>
                </form>
              </section>
            )}
          </Formik>
        )}
        {tab === 1 && (
          <Formik
            initialValues={value}
            // validationSchema={registerFormSchema}
            onSubmit={(value, { resetForm, setErrors }) => {
              if (aadhaarOtpSent) {
                handleAadharOtpVerify();
                setTimeout(() => {
                  history.push("/register");
                }, 500); // simulate server latency
              } else {
                handleAadharOtpSubmit(value, setAadhaarOtpSent);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              /* and other goodies */
            }) => (
              <section className={classes.formWrap}>
                <form onSubmit={handleSubmit}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="aadhaar"
                      placeholder="Enter Your Aadhar Number"
                      label="Enter Your Aadhar Number"
                      value={values.aadhaar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.aadhaar ? errors.aadhaar : ""}
                      error={touched.aadhaar && Boolean(errors.aadhaar)}
                    />
                  </FormControl>

                  {aadhaarOtpSent && (
                    <div style={{ margin: 10 }}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          fullWidth
                          name="aadharOtp"
                          label="Your Aadhar OTP number"
                          placeholder="Your Aadhar OTP Number"
                          value={aadhaarOtp}
                          onChange={(e) => setAadhaarOtp(e.target.value)} // Update the aadhaarOtp state
                          onBlur={handleBlur}
                          helperText={touched.aadharOtp ? errors.aadharOtp : ""}
                          error={touched.aadharOtp && Boolean(errors.aadharOtp)}
                        />
                      </FormControl>
                    </div>
                  )}

                  <div className={classes.btnArea}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => handleResendAadharOtp(values.aadhaar)}
                    >
                      Resend Aadhar OTP
                    </Button>
                  </div>
                  {aadhaarOtpSent && (
                    <div style={{ margin: 10 }}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          fullWidth
                          name="mobile"
                          label="Your Mobile Number"
                          placeholder="Your Mobile Number"
                          value={values.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.mobile ? errors.mobile : ""}
                          error={touched.mobile && Boolean(errors.mobile)}
                        />
                      </FormControl>
                    </div>
                  )}

                  {aadhaarOtpSent && (
                    <div style={{ margin: 10 }}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          fullWidth
                          name="mobileOtp"
                          label="Your Mobile OTP number"
                          placeholder="Your Mobile OTP Number"
                          value={values.mobileOtp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.mobileOtp ? errors.mobileOtp : ""}
                          error={touched.mobileOtp && Boolean(errors.mobileOtp)}
                        />
                      </FormControl>
                    </div>
                  )}
                  {aadhaarOtpSent && (
                    <div className={classes.btnArea}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => handleResendMobileOtp(values.mobile)}
                      >
                        Resend Mobile OTP
                      </Button>
                    </div>
                  )}

                  {aadhaarOtpSent && (
                    <div style={{ margin: 10 }}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          fullWidth
                          name="healthcareId"
                          label="Your Healthcare ID"
                          placeholder="Your Healthcare ID"
                          value={values.healthcareId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.healthcareId ? errors.healthcareId : ""
                          }
                          error={
                            touched.healthcareId && Boolean(errors.healthcareId)
                          }
                        />
                      </FormControl>
                    </div>
                  )}

                  <FormControlLabel
                    className={classes.label}
                    control={<Checkbox />}
                    label="Agree with"
                    onChange={(_event, _value) => {}}
                  />
                  <a href="#" className={classes.link}>
                    Terms &amp; Condition
                  </a>
                  <div className={classes.btnArea}>
                    <Button variant="contained" color="primary" type="submit">
                      Continue
                      <ArrowForward
                        className={classNames(
                          classes.rightIcon,
                          classes.iconSmall
                        )}
                      />
                    </Button>
                  </div>
                </form>
              </section>
            )}
          </Formik>
        )}
      </Paper>
    </>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(useStyles)(LoginForm);
export default LoginForm;
