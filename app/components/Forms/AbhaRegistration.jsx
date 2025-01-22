import React, { useState } from "react";
import useStyles from "./user-jss";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  TextField as MuiTextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  SET_CREATE_MOBILE_USER_LOADER,
  SET_MOBILE_REGISTRATION_VERIFY_OTP_LOADER,
  SET_SHOW_ACCOUNT_STATUS,
  UPDATE_LOGGED_IN_USER,
} from "../../redux/constants/reduxFormConstants";
import { setCookieData } from "../Common/storageFun";
import { useHistory } from "react-router-dom";

const AbhaRegistration = () => {
  const initialState = {
    first_name: "",
    last_name: "",
    dob: moment().format("YYYY-MM-DD"),
    mobile: "",
  };
  const errInitialState = {
    first_name: "",
    last_name: "",
    dob: "",
    mobile: "",
    err: "",
  };
  const [otp, setOtp] = useState("");
  const [errOtp, setErrOtp] = useState("");

  const { classes } = useStyles();
  const [moRegistrationData, setMoRegistrationData] = useState({
    ...initialState,
  });
  const [formErr, setFormErr] = useState({ ...errInitialState });
  const [step, setStep] = useState(1);
  const { createMobileUserLoader, mobileRegVerifyOtpLoader } = useSelector(
    (state) => state.registration
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setMoRegistrationData({ ...moRegistrationData, [name]: value });
    setFormErr({ ...formErr, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: SET_CREATE_MOBILE_USER_LOADER, payload: true });
    let err = { ...formErr };
    let isValid = true;
    Object.keys(moRegistrationData).forEach((key) => {
      let name = key === "dob" ? "date of birth" : key.replace(/_/g, " ");

      if (moRegistrationData[key].length === 0) {
        isValid = false;
        err[key] = `Please enter ${name}.`;
      }
    });

    setFormErr(err);

    if (isValid) {
      //user create
      await axios
        .post(`${process.env.INTERNAL_API_ENDPOINT}/api/users`, {
          ...moRegistrationData,
        })
        .then(async (response) => {
          console.log("user create resp ", response);
          if (response.status === 200 && response.data.success) {
            //verify user otp request
            const reqOTPresp = await axios.post(
              `${process.env.INTERNAL_API_ENDPOINT}/api/users/otp/request`,
              {
                mobile: moRegistrationData.mobile,
              }
            );
            console.log("req OTP resp ", reqOTPresp);
            if (reqOTPresp.status === 200 && reqOTPresp.data.success) {
              setStep(2);
              setOtp(reqOTPresp.data.data.otp);
            }
            dispatch({ type: SET_CREATE_MOBILE_USER_LOADER, payload: false });
          } else {
            dispatch({ type: SET_CREATE_MOBILE_USER_LOADER, payload: false });
          }
          setFormErr({ ...formErr, err: "" });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: SET_CREATE_MOBILE_USER_LOADER,
            payload: false,
          });

          if (err.response) {
            // Server responded with a status code outside the 2xx range
            console.log("Error response data:", err.response.data); // The response payload
            setFormErr({ ...formErr, err: err.response.data.message });
            if (err.response.data.message === "User already exists") {
              dispatch({
                type: SET_SHOW_ACCOUNT_STATUS,
                payload: {
                  isShow: true,
                  status: "",
                },
              });
            }
          } else {
            setFormErr({ ...formErr, err: "Something went wrong!" });
          }
        });
    } else {
      dispatch({ type: SET_CREATE_MOBILE_USER_LOADER, payload: false });
    }
  };

  const handleChangeOTP = (e) => {
    setErrOtp("");
    setOtp(e.target.value);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    dispatch({
      type: SET_MOBILE_REGISTRATION_VERIFY_OTP_LOADER,
      payload: true,
    });

    if (otp.length === 0) {
      setErrOtp("Please enter valid OTP.");
      dispatch({
        type: SET_MOBILE_REGISTRATION_VERIFY_OTP_LOADER,
        payload: false,
      });
    } else {
      //mobile otp verification
      await axios
        .post(`${process.env.INTERNAL_API_ENDPOINT}/api/users/otp/verify`, {
          mobile: moRegistrationData.mobile,
          otp: otp,
        })
        .then((verOtpResp) => {
          console.log("Otp verify resp ", verOtpResp);
          if (verOtpResp.status === 200 && verOtpResp.data.success) {
            /**set login cookies */
            let expiresOn1 = new Date(moment().add(24, "hours")).toUTCString();
            let expiresOn2 = new Date(moment().add(5, "days")).toUTCString();
            setCookieData(
              "authToken",
              JSON.stringify({
                access_token: verOtpResp.data.data.access_token,
              }),
              expiresOn1
            );
            const userD = {
              dob: verOtpResp.data.data.dob,
              first_name: verOtpResp.data.data.first_name,
              last_name: verOtpResp.data.data.last_name,
              user_id: verOtpResp.data.data.user_id,
              mobile: moRegistrationData.mobile,
            };
            setCookieData("userDetails", JSON.stringify(userD), expiresOn1);
            setCookieData("loggedInUser", JSON.stringify(userD), expiresOn1);
            dispatch({ type: UPDATE_LOGGED_IN_USER, payload: userD });
            setCookieData(
              "refreshToken",
              JSON.stringify({
                refresh_token: verOtpResp.data.data.refresh_token,
              }),
              expiresOn2
            );
            history.push("/app/all-patient");
          }
          dispatch({
            type: SET_MOBILE_REGISTRATION_VERIFY_OTP_LOADER,
            payload: false,
          });
          setFormErr({ ...formErr, err: "" });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: SET_MOBILE_REGISTRATION_VERIFY_OTP_LOADER,
            payload: false,
          });

          if (err.response) {
            // Server responded with a status code outside the 2xx range
            console.log("Error response data:", err.response.data); // The response payload
            setFormErr({ ...formErr, err: err.response.data.message });
          } else {
            setFormErr({ ...formErr, err: "Something went wrong!" });
          }
        });
    }
  };

  return (
    <section className={classes.formWrap} style={{ padding: "0px 50px" }}>
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TextField
              fullWidth
              name="aadhar_number"
              placeholder="Enter Aadhar Number"
              label={
                <>
                  Enter Aadhar Number<sup style={{ color: "red" }}>*</sup>
                </>
              }
              value={moRegistrationData.last_name}
              onChange={handleChange}
              helperText={formErr.last_name}
              error={formErr.last_name.length > 0}
            />
          </Box>

          <FormControlLabel
            className={classes.label}
            control={<Checkbox />}
            label="Agree with"
            onChange={(_event, _value) => {}}
          />
          <a href="#" className={classes.link}>
            Terms &amp; Condition
          </a>

          <Typography color="error" style={{ fontSize: 12, marginBottom: 10 }}>
            {formErr.err}
          </Typography>
          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="submit">
              {createMobileUserLoader ? (
                <CircularProgress size={25} style={{ color: "#fff" }} />
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP}>
          <TextField
            style={{ width: "80%" }}
            name="otp"
            placeholder="Enter OTP"
            label={
              <>
                Enter OTP<sup style={{ color: "red" }}>*</sup>
              </>
            }
            value={otp}
            onChange={(e) => handleChangeOTP(e)}
            helperText={errOtp}
            error={errOtp.length > 0}
          />

          <Typography color="error" style={{ fontSize: 12, marginBottom: 10 }}>
            {formErr.err}
          </Typography>

          <div className={classes.btnArea} style={{ marginTop: "10px" }}>
            <Button variant="contained" color="primary" type="submit">
              {mobileRegVerifyOtpLoader ? (
                <CircularProgress size={25} style={{ color: "#fff" }} />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AbhaRegistration;
