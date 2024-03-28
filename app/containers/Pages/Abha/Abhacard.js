import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Snackbar, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import FormControl from "@mui/material/FormControl";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    maxWidth: 600,
    margin: "auto",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
    padding: 2,
  },
}));

function Abhacard() {
  const classes = useStyles();

  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [txnId, setTxnId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileOtpGenerated, setMobileOtpGenerated] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [healthIdCreated, setHealthIdCreated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAadhaarSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/aadhaar/generateOtp",
        { aadhaar: aadhaarNumber }
      );
      const { txnId } = response.data;
      setOtpGenerated(true);
      setTxnId(txnId);
      setSnackbarOpen(true);
      setSnackbarMessage("OTP generated successfully!");
    } catch (error) {
      console.error("Error generating OTP:", error);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/aadhaar/verifyOtp",
        { txnId, otp }
      );
      setVerificationResult(response.data);
      setSnackbarOpen(true);
      setSnackbarMessage("OTP verification successful!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/aadhaar/checkAndGenerateMobileOTP",
        { mobile: mobileNumber, txnId }
      );
      setMobileOtpGenerated(true);
      setSnackbarOpen(true);
      setSnackbarMessage("Mobile OTP generated successfully!");
    } catch (error) {
      console.error("Error generating Mobile OTP:", error);
    }
  };

  const handleMobileOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/aadhaar/verifyMobileOtp",
        { txnId, otp: mobileOtp }
      );
      setVerificationResult(response.data);
      setSnackbarOpen(true);
      setSnackbarMessage("Mobile OTP verification successful!");
    } catch (error) {
      console.error("Error verifying Mobile OTP:", error);
    }
  };

  const handleCreateHealthId = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/aadhaar/createHealthIdWithPreVerified",
        {
          aadhaar: aadhaarNumber,
          mobile: mobileNumber,
          txnId: txnId,
        }
      );
      const { healthId } = response.data;
      setHealthIdCreated(true);
      setSnackbarOpen(true);
      setSnackbarMessage("Health ID created successfully!");
    } catch (error) {
      console.error("Error creating Health ID:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("http://localhost:3002/api/aadhaar/resendOtp", {
        txnId,
      });
      setSnackbarOpen(true);
      setSnackbarMessage("Aadhaar OTP Resent successfully!");
    } catch (error) {
      console.error("Error resending Aadhaar OTP:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleAadhaarSubmit} className={classes.form}>
        <FormControl className={classes.formControl}>
          <TextField
            fullWidth
            name="aadhaar"
            label="Your Aadhaar Number"
            placeholder="Your Aadhaar Number"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            helperText={""}
            error={false}
            className={classes.textField}
            // Increase font size
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Generate OTP
          </Button>
          <Button
            onClick={handleResendOtp}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Resend Aadhaar OTP
          </Button>
        </FormControl>
      </form>

      {otpGenerated && (
        <div>
          <form onSubmit={handleOtpVerification} className={classes.form}>
            <FormControl className={classes.formControl}>
              <TextField
                fullWidth
                name="otp"
                label="Your OTP Number"
                placeholder="Your OTP Number"
                value={otp}
                helperText={""}
                error={false}
                onChange={(e) => setOtp(e.target.value)}
                className={classes.textField}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Verify OTP
              </Button>
            </FormControl>
          </form>
        </div>
      )}

      {/* {verificationResult && (
        <div>
          <p>{verificationResult.message}</p>
        </div>
      )} */}
      <form onSubmit={handleMobileSubmit} className={classes.form}>
        <FormControl className={classes.formControl}>
          <TextField
            fullWidth
            name="mobileNumber"
            label="Your Mobile Number"
            placeholder="Your Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Generate Mobile OTP
          </Button>
          <Button
            onClick={handleResendOtp}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Resend Mobile OTP
          </Button>
        </FormControl>
      </form>
      {mobileOtpGenerated && (
        <div>
          <form onSubmit={handleMobileOtpVerification} className={classes.form}>
            <TextField
              fullWidth
              name="Mobile OTP Number"
              label="Your Mobile OTP Number"
              placeholder="Your Mobile Number"
              value={mobileOtp}
              onChange={(e) => setMobileOtp(e.target.value)}
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Verify Mobile OTP
            </Button>
          </form>
        </div>
      )}

      <Button
        onClick={handleCreateHealthId}
        variant="contained"
        color="primary"
      >
        Create Health ID
      </Button>

      {healthIdCreated && (
        <div>
          <h3>Health ID created successfully!</h3>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
}

export default Abhacard;
