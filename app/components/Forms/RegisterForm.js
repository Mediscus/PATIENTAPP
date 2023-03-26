import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.svg";
import useStyles from './user-jss';
import { Formik } from "formik";
import { registerFormSchema } from "dan-api/schemas";
import { ArrowForward, AllInclusive, Brightness5, People } from "@mui/icons-material";
import { Checkbox, TextField, Hidden, Icon, FormControlLabel, Paper, Tab, Typography, Tabs, FormControl, Button } from "@mui/material";

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const { classes } = useStyles();
  const { handleData, errorSms } = props;
  const values = {
    type: 2,
    firstName: "Abhi",
    middleName: "Kumar",
    lastName: "Patel",
    email: "abhi@gmail.com",
    phone: "7854120325",
    country_code: "91",
    password: "Abhi@1234",
    conPassword: "Abhi@1234",
  };
  const [tab, setTab] = useState(0);
  const deco = useSelector((state) => state.ui.decoration);

  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
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
              to="/"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              Already have account ?
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Register
        </Typography>
        <Typography
          variant="caption"
          className={classes.subtitle}
          gutterBottom
          align="center"
        >
          Lorem ipsum dolor sit amet
        </Typography>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="With Email" />
          <Tab label="With Social Media" />
        </Tabs>
        {tab === 0 && (
          <Formik
            initialValues={values}
            validationSchema={registerFormSchema}
            onSubmit={(values, { resetForm, setErrors }) => {
              handleData(values);
              if (
                errorSms.includes("Invalid Phone Number") ||
                errorSms === "Invalid Phone Number"
              ) {
                setErrors({ phone: "Invalid Phone Number" });
              }
              if (
                errorSms.includes(
                  "Email address already in use" ||
                  errorSms === "Email address already in use"
                )
              ) {
                setErrors({ email: "Email address already in use" });
              }
              if (
                errorSms.includes("Phone number already in use") ||
                errorSms === "Phone number already in use"
              ) {
                setErrors({ phone: "Phone number already in use" });
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
                      name="firstName"
                      placeholder="First Name"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.firstName ? errors.firstName : ""}
                      error={touched.firstName && Boolean(errors.firstName)}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="middleName"
                      placeholder="Middle Name"
                      label="Middle Name"
                      value={values.middleName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.middleName ? errors.middleName : ""}
                      error={touched.middleName && Boolean(errors.middleName)}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="lastName"
                      placeholder="Last Name"
                      label="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.lastName ? errors.lastName : ""}
                      error={touched.lastName && Boolean(errors.lastName)}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="email"
                      placeholder="Your Email"
                      label="Your Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.email ? errors.email : ""}
                      error={touched.email && Boolean(errors.email)}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="phone"
                      placeholder="Phone Number"
                      label="Phone Number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.phone ? errors.phone : ""}
                      error={touched.phone && Boolean(errors.phone)}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="country_code"
                      placeholder="Country Code"
                      label="Country Code"
                      value={values.country_code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.country_code ? errors.country_code : ""
                      }
                      error={
                        touched.country_code && Boolean(errors.country_code)
                      }
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      type="password"
                      name="password"
                      label="Your Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password ? errors.password : ""}
                      error={touched.password && Boolean(errors.password)}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      type="password"
                      name="conPassword"
                      label="Re-type Password"
                      value={values.conPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.conPassword ? errors.conPassword : ""
                      }
                      error={
                        touched.conPassword && Boolean(errors.conPassword)
                      }
                    />
                  </FormControl>


                  <FormControlLabel
                    className={classes.label}
                    control={<Checkbox />}
                    label="Agree with"
                    onChange={(event, value) => { }}
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
        {tab === 1 && (
          <section className={classes.socmedFull}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.redBtn}
              type="button"
            >
              <AllInclusive
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Socmed 1
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.blueBtn}
              type="button"
            >
              <Brightness5
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Socmed 2
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.cyanBtn}
              type="button"
            >
              <People
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Socmed 3
            </Button>
          </section>
        )}
      </Paper>
    </Fragment>
  );
}

export default RegisterForm;
