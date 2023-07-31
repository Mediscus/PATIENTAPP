import React, { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.svg";
import useStyles from "./user-jss";
import { Formik } from "formik";
import { registerFormSchema } from "dan-api/schemas";
import {
  ArrowForward,
  AllInclusive,
  Brightness5,
  People,
} from "@mui/icons-material";
import {
  Checkbox,
  TextField,
  Hidden,
  Icon,
  FormControlLabel,
  Paper,
  Tab,
  Typography,
  Tabs,
  FormControl,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { async } from "regenerator-runtime";

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const { classes } = useStyles();
  const { handleData, errorSms } = props;
  const [tab, setTab] = useState(0);
  const [otpSent, setOtpSent] = useState(true);
  const [otp, setOtp] = useState("");
  const history = useHistory(); // Initialize useHistory hook

  const deco = useSelector((state) => state.ui.decoration);

  const [stateData, setStateData] = useState([]); // Assuming you have the complete state and district data
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/stateCode");
        setStateData(res.data); // Assuming the API response is an array of state objects
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    fetchStateData();
  }, []);

  const handleStateChange = (event) => {
    const selectedStateCode = event.target.value;
    setSelectedStateCode(selectedStateCode);

    // Set the districts based on the selected state code
    const districtsForSelectedState =
      getDistrictsByStateCode(selectedStateCode);
    setDistricts(districtsForSelectedState);
  };

  const getDistrictsByStateCode = (selectedStateCode) => {
    const selectedState = stateData.find(
      (state) => state.code === selectedStateCode
    );
    return selectedState ? selectedState.districts : [];
  };

  const handleChangeTab = (_event, value) => {
    setTab(value);
  };

  const responseData = useSelector((state) => state.otp);

  const values = {
    address: "",
    dayOfBirth: "",
    monthOfBirth: "",
    yearOfBirth: "",
    districtCode: "",
    stateCode: "",
    email: "",
    firstName: "",
    gender: "",
    healthId: "",
    lastName: "",
    middleName: "",
    name: "",
    password: "",
    pincode: "",
    profilePhoto: "",
    subdistrictCode: "",
    txnId: responseData.txnId.txnId,
    villageCode: "",
    wardCode: "",
  };

  const handleDateOfBirthChange = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // JavaScript months are 0-indexed, so add 1
    const year = dateObj.getFullYear();

    setFieldValue("dayOfBirth", day);
    setFieldValue("monthOfBirth", month);
    setFieldValue("yearOfBirth", year);

    // Also, update the full date of birth field
    setFieldValue("dateOfBirth", date);
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
          Register For Your Mediscus Account
        </Typography>
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
            // validationSchema={registerFormSchema}
            onSubmit={(values, { resetForm, setErrors }) => {
              handleData(values) &&
                setTimeout(() => {
                  history.push("/app/all-patient"); // Navigate to the next page using useHistory
                }, 500);
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
                    <Select
                      fullWidth
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      inputProps={{ "aria-label": "Gender" }}
                    >
                      <MenuItem value="" disabled>
                        Select Gender
                      </MenuItem>
                      <MenuItem value="M">Male</MenuItem>
                      <MenuItem value="F">Female</MenuItem>
                      <MenuItem value="O">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      type="date"
                      name="dateOfBirth"
                      value={
                        values.dayOfBirth
                          ? `${values.yearOfBirth}-${String(
                              values.monthOfBirth + 1
                            ).padStart(2, "0")}-${String(
                              values.dayOfBirth
                            ).padStart(2, "0")}`
                          : ""
                      }
                      onChange={(el) => {
                        const dateOfBirth = el.target.value;
                        if (dateOfBirth) {
                          const [year, month, day] = dateOfBirth.split("-");
                          setFieldValue("yearOfBirth", Number(year));
                          setFieldValue("monthOfBirth", Number(month));
                          setFieldValue("dayOfBirth", Number(day));
                        } else {
                          setFieldValue("yearOfBirth", "");
                          setFieldValue("monthOfBirth", "");
                          setFieldValue("dayOfBirth", "");
                        }
                      }}
                      onBlur={handleBlur}
                      helperText={touched.dayOfBirth ? errors.dayOfBirth : ""}
                      error={touched.dayOfBirth && Boolean(errors.dayOfBirth)}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="healthId"
                      placeholder="healthId "
                      label="healthId "
                      value={values.healthId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.healthId ? errors.healthId : ""}
                      error={touched.healthId && Boolean(errors.healthId)}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      name="stateCode"
                      select
                      label="Select State"
                      value={selectedStateCode}
                      onChange={handleStateChange}
                    >
                      {stateData.map((state) => (
                        <MenuItem key={state.code} value={state.code}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      select
                      label="Select District"
                      value={values.districtCode}
                      onChange={handleChange}
                    >
                      {districts.map((district) => (
                        <MenuItem key={district.code} value={district.code}>
                          {district.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
        {tab === 1 && (
          <Formik
            initialValues={values}
            // validationSchema={registerFormSchema}
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

                  {otpSent && (
                    <div>
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
    </Fragment>
  );
}

export default RegisterForm;
