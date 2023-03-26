import { Formik } from "formik";
import React, { useState } from "react";
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
import useStyles from './user-jss';
import { ContentDivider } from "../Divider";
import { Checkbox, FormHelperText, TextField } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AllInclusive,
  Brightness5,
  ArrowForward,
  People,
} from "@mui/icons-material";

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function LoginForm(props) {
  const { classes } = useStyles();
  const { handleData, errorSms } = props;
  const [showPassword, setShowPassword] = useState(false);
  const values = { loginID: "doctor@mailinator.com", password: "Info9179@", remember: false };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              to="/register"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              Create new account
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Sign In
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
              Socmed 1
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
              Socmed 2
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
          <ContentDivider content="Or sign in with email" />
        </section>
        <section className={classes.formWrap}>
          <Formik
            initialValues={values}
            validationSchema={loginFormSchema}
            onSubmit={(values, { resetForm, setErrors }) => {
              handleData(values);
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
              <form onSubmit={handleSubmit}>
                <div>
                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="loginID"
                      label="Your Email"
                      placeholder="Your Email"
                      value={values.loginID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.loginID ? errors.loginID : ""}
                      error={touched.loginID && Boolean(errors.loginID)}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      placeholder="Enter Password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password ? errors.password : ""}
                      error={touched.password && Boolean(errors.password)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              size="large"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormHelperText error>
                      {errorSms}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className={classes.optArea}>
                  <FormControlLabel
                    className={classes.label}
                    value={values.remember}
                    control={<Checkbox />}
                    label="Remember"
                    name="remember"
                    onChange={(event, value) => {
                      setFieldValue("remember", value);
                    }}
                  />
                  <Button
                    size="small"
                    component={LinkBtn}
                    to="/reset-password"
                    className={classes.buttonLink}
                  >
                    Forgot Password
                  </Button>
                </div>
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
            )}
          </Formik>
        </section>
      </Paper>
    </>
  );
}

export default LoginForm;
