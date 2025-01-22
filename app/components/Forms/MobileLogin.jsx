import React, { useState } from "react";
import useStyles from "./user-jss";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { setCookieData } from "../Common/storageFun";
import moment from "moment";
import {
  SET_MOBILE_LOGIN_LOADER,
  UPDATE_LOGGED_IN_USER,
} from "../../redux/constants/reduxFormConstants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import classNames from "classnames";

const MobileLogin = () => {
  const { classes } = useStyles();
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [formErr, setFormErr] = useState({
    mobile: "",
    otp: "",
    err: "",
  });
  const { mobileLoginLoader } = useSelector((state) => state.login);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: SET_MOBILE_LOGIN_LOADER,
      payload: true,
    });

    let isValid = true;
    let formErrCpy = { ...formErr };
    if (mobileNumber.length === 0) {
      isValid = false;
      formErrCpy.mobile = "Please enter mobile number.";
    } else if (mobileOtpSent && otp.length === 0) {
      isValid = false;
      formErrCpy.otp = "Please enter valid otp.";
    }
    setFormErr({ ...formErrCpy });

    if (isValid) {
      if (mobileOtpSent) {
        //mobile otp verification
        await axios
          .post(`${process.env.INTERNAL_API_ENDPOINT}/api/users/otp/verify`, {
            mobile: mobileNumber,
            otp: otp,
          })
          .then((verOtpResp) => {
            console.log("Otp verify resp ", verOtpResp);
            if (verOtpResp.status === 200 && verOtpResp.data.success) {
              /**set login cookies */
              let expiresOn1 = new Date(
                moment().add(24, "hours")
              ).toUTCString();
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
                mobile: mobileNumber,
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
              type: SET_MOBILE_LOGIN_LOADER,
              payload: false,
            });
            setFormErr({ ...formErr, err: "" });
          })
          .catch((err) => {
            console.log(err);
            dispatch({ type: SET_MOBILE_LOGIN_LOADER, payload: false });

            if (err.response) {
              // Server responded with a status code outside the 2xx range
              console.log("Error response data:", err.response.data); // The response payload
              setFormErr({ ...formErr, err: err.response.data.message });
            } else {
              setFormErr({ ...formErr, err: "Something went wrong!" });
            }
          });
      } else {
        await axios
          .post(`${process.env.INTERNAL_API_ENDPOINT}/api/users/otp/request`, {
            mobile: mobileNumber,
          })
          .then((resp) => {
            console.log(resp);
            if (resp.status === 200 && resp.data.success) {
              setMobileOtpSent(true);
              setOtp(resp.data.data.otp);
            }
            dispatch({ type: SET_MOBILE_LOGIN_LOADER, payload: false });
            setFormErr({ ...formErr, err: "" });
          })
          .catch((err) => {
            console.log(err);
            dispatch({ type: SET_MOBILE_LOGIN_LOADER, payload: false });

            if (err.response) {
              // Server responded with a status code outside the 2xx range
              console.log("Error response data:", err.response.data); // The response payload
              setFormErr({ ...formErr, err: err.response.data.message });
            } else {
              setFormErr({ ...formErr, err: "Something went wrong!" });
            }
          });
      }
    } else {
      dispatch({
        type: SET_MOBILE_LOGIN_LOADER,
        payload: false,
      });
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "mobile") {
      setMobileNumber(value);
    } else if (name === "otp") {
      setOtp(value);
    }
    setFormErr({ ...formErr, [name]: "" });
  };

  return (
    <section className={classes.formWrap}>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: 10 }}>
          <FormControl className={classes.formControl}>
            <TextField
              fullWidth
              name="mobile"
              label="Your Mobile Number"
              placeholder="Your Mobile Number"
              value={mobileNumber}
              onChange={handleChange}
              helperText={formErr.mobile}
              error={formErr.mobile.length > 0}
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
                helperText={formErr.otp}
                error={formErr.otp.length > 0}
              />
            </FormControl>
          </div>
        )}

        <Typography color="error" style={{ fontSize: 12, marginBottom: 10 }}>
          {formErr.err}
        </Typography>
        <div className={classes.btnArea}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            {mobileLoginLoader ? (
              <CircularProgress size={25} style={{ color: "#fff" }} />
            ) : (
              <>
                Continue
                {mobileOtpSent && (
                  <ArrowForward
                    className={classNames(classes.rightIcon, classes.iconSmall)}
                  />
                )}
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default MobileLogin;
