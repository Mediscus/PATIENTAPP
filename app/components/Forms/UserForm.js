import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import UserForm from "./UserForm";
// import { useNavigate } from "react-router-dom";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [txnId, setTxnId] = useState("");
  const [token, setToken] = useState("");

  const [aadharNumber, setAadharNumber] = useState("");
  const [aadharOtp, setAadharOtp] = useState("");
  const [aadharTxnId, setAadharTxnId] = useState("");

  const [number, setNumber] = useState("");
  const [numberOtp, setNumberOtp] = useState("");
  const [numberTxnId, setNumberTxnId] = useState("");

  // const [token, setToken] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showAadharOtpInput, setShowAadharOtpInput] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isAadharLoading, setAadharIsLoading] = useState(false);

  const [isNumberLoading, setIsNumberLoading] = useState(false);
  // const navigate = useNavigate();

  //Create Health ID

  const [showNumberField, setShowNumberField] = useState(true);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleAadharNumberChange = (event) => {
    setAadharNumber(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleAadharOtpChange = (event) => {
    setAadharOtp(event.target.value);
  };

  const handleNumberOtpChange = (event) => {
    setNumber(event.target.value);
  };

  // Aadhar Otp =============================================

  const handleSendAadharOtp = async () => {
    setAadharIsLoading(true);
    // Call API to send OTP to the provided phone number
    try {
      const response = await axios.post(
        `http://localhost:4000/api/aadhaar/generateOtp`,
        {
          aadhaar: aadharNumber,
        }
      );

      setAadharTxnId(response.data.txnId);
    } catch (error) {
      console.log(error);
    }
    setShowAadharOtpInput(true);
    setAadharIsLoading(false);
  };

  const handleVerifyAadharOtp = async () => {
    setShowNumberField(false);
    setAadharIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api//aadhaar/verifyOtp`,
        {
          txnId: aadharTxnId,
          otp: aadharOtp,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setAadharIsLoading(false);
  };

  // Number Otp =============================================

  const handleSendNumberOtp = async () => {
    setIsNumberLoading(true);
    // Call API to send OTP to the provided phone number
    try {
      const response = await axios.post(
        `http://localhost:4000/api/aadhaar/checkAndGenerateMobileOTP`,
        {
          txnId: aadharTxnId,
          mobile: number,
        }
      );

      setNumberTxnId(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setShowAadharOtpInput(true);
    setIsNumberLoading(false);
  };

  // Verify Aadhaar OTP on registered mobile number to create Health ID

  const handleVerifyNumberOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/aadhaar/createHealthIdWithPreVerified`,
        {
          email,
          firstName,
          healthId,
          lastName,
          middleName,
          password,
          profilePhoto,
          txnId: aadharTxnId,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ marginTop: "25px", color: "black" }}>
      <Paper sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
        <Card>
          <UserForm aadharTxnId={aadharTxnId} />
          <CardHeader title="Login with Phone Number" />
          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={24} md={8}>
                <TextField
                  placeholder="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  sx={{ color: "black" }}
                />
              </Grid>
              {showOtpInput ? (
                <Grid item xs={12} md={4}>
                  <TextField
                    placeholder="OTP"
                    variant="outlined"
                    fullWidth
                    value={otp}
                    onChange={handleOtpChange}
                    sx={{ color: "black" }}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                {isLoading ? (
                  <CircularProgress />
                ) : showOtpInput ? (
                  <Button variant="contained" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleSendOtp}>
                    Send OTP
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>

          <Divider variant="middle" />

          {showNumberField ? (
            <CardContent>
              <CardHeader title="Login with Aadhar Number" />
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={24} md={8}>
                  <TextField
                    placeholder="Aadhar Number"
                    variant="outlined"
                    fullWidth
                    value={aadharNumber}
                    onChange={handleAadharNumberChange}
                    sx={{ color: "black" }}
                  />
                </Grid>
                {showAadharOtpInput ? (
                  <Grid item xs={12} md={4}>
                    <TextField
                      placeholder="OTP"
                      variant="outlined"
                      fullWidth
                      value={aadharOtp}
                      onChange={handleAadharOtpChange}
                      sx={{ color: "black" }}
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  {isAadharLoading ? (
                    <CircularProgress />
                  ) : showAadharOtpInput ? (
                    <Button variant="contained" onClick={handleVerifyAadharOtp}>
                      Verify OTP
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleSendAadharOtp}>
                      Send OTP
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          ) : (
            <Grid item xs={12}>
              <div>
                <CardHeader title="Create HealthID with Mobile Number" />
                <CardContent>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={24} md={8}>
                      <TextField
                        placeholder="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={number}
                        onChange={handleNumberOtpChange}
                        sx={{ color: "black" }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button variant="contained" onClick={handleSendNumberOtp}>
                        Verify
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </div>
            </Grid>
          )}
        </Card>
      </Paper>
    </div>
  );
};

export default Index;
