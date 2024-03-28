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
import { ContentDivider } from "../../../components/Divider";
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
import Abhacard from "./Abhacard";

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  return <NavLink to={props.to} {...props} innerRef={ref} />;
});

function UserForm(props) {
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
          <>
            <Abhacard />
          </>
        )}
      </Paper>
    </>
  );
}

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(useStyles)(LoginForm);
export default UserForm;
