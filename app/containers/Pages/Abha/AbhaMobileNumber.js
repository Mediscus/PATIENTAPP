import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';

const AbhaMobileNumber = () => {
  const [step, setStep] = useState(1); // 1: Enter number, 2: Enter OTP
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = () => {
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const verifyOtp = () => {
    setLoading(true);
    // Simulate API call to verify OTP
    setTimeout(() => {
      setLoading(false);
      alert('OTP verified successfully!');
      // Optionally, reset the steps
      setStep(1);
      setMobileNumber('');
      setOtp('');
    }, 1000);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="gray.100">
      <Paper elevation={3} sx={{ p: 6, width: '100%', maxWidth: 400 }}>
        {step === 1 ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" align="center">Enter Mobile Number</Typography>
            <TextField
              fullWidth
              type="tel"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              placeholder="Enter your mobile number"
              variant="outlined"
              required
            />
            <Button
              onClick={sendOtp}
              disabled={loading || !mobileNumber}
              variant="contained"
              color="primary"
              fullWidth
              endIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" align="center">Enter OTP</Typography>
            <TextField
              fullWidth
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter the OTP"
              variant="outlined"
              required
            />
            <Button
              onClick={verifyOtp}
              disabled={loading || !otp}
              variant="contained"
              color="primary"
              fullWidth
              endIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? 'Verifying OTP...' : 'Submit OTP'}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AbhaMobileNumber;
