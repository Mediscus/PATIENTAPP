import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Snackbar, CircularProgress, Collapse } from '@mui/material';

const ConsentPin = () => {
  const [otp, setOtp] = useState('');
  const [oldPin, setOldPin] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Static values for OTP and current pin
  const staticOtp = '1234';
  const staticCurrentPin = '1111';

  const handleSetPin = async () => {
    setLoading(true);
    try {
      if (otp !== staticOtp) {
        throw new Error('Invalid OTP');
      }
      // Simulate pin setting
      setMessage('Congratulations! Your consent pin is successfully set.');
      setOpenSnackbar(true);
      setTimeout(() => {
        setStep(1);
        resetFields();
      }, 5000);
    } catch (error) {
      setMessage('Error: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPin = async () => {
    setLoading(true);
    try {
      if (oldPin !== staticCurrentPin) {
        throw new Error('Invalid old consent pin');
      }
      // Simulate pin resetting
      setMessage('Congratulations! Your consent pin is successfully reset.');
      setOpenSnackbar(true);
      setTimeout(() => {
        setStep(1);
        resetFields();
      }, 5000);
    } catch (error) {
      setMessage('Error: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPin = async () => {
    setLoading(true);
    try {
      if (otp !== staticOtp) {
        throw new Error('Invalid OTP');
      }
      // Simulate pin updating
      setMessage('Congratulations! Your consent pin is successfully updated.');
      setOpenSnackbar(true);
      setTimeout(() => {
        setStep(1);
        resetFields();
      }, 5000);
    } catch (error) {
      setMessage('Error: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      // Simulate OTP resend
      setMessage('OTP resent successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Error: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSetPin = () => {
    if (pin !== confirmPin) {
      setMessage('Pins do not match.');
      setOpenSnackbar(true);
      return;
    }
    handleSetPin();
  };

  const handleSubmitResetPin = () => {
    if (pin !== confirmPin) {
      setMessage('Pins do not match.');
      setOpenSnackbar(true);
      return;
    }
    handleResetPin();
  };

  const handleSubmitForgetPin = () => {
    if (pin !== confirmPin) {
      setMessage('Pins do not match.');
      setOpenSnackbar(true);
      return;
    }
    handleForgetPin();
  };

  const resetFields = () => {
    setOtp('');
    setOldPin('');
    setPin('');
    setConfirmPin('');
  };

  const renderSetPin = () => (
    <Container>
      <Typography variant="h5">Set Consent Pin</Typography>
      <TextField
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleResendOtp} disabled={loading}>
        Resend OTP
      </Button>
      <TextField
        label="Enter 4 digit consent pin"
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm Consent Pin"
        type="password"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmitSetPin} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Set Pin'}
      </Button>
    </Container>
  );

  const renderResetPin = () => (
    <Container>
      <Typography variant="h5">Reset Consent Pin</Typography>
      <TextField
        label="Enter old consent pin"
        type="password"
        value={oldPin}
        onChange={(e) => setOldPin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Enter 4 digit new consent pin"
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm new consent pin"
        type="password"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmitResetPin} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Reset Pin'}
      </Button>
    </Container>
  );

  const renderForgetPin = () => (
    <Container>
      <Typography variant="h5">Forget Consent Pin</Typography>
      <TextField
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleResendOtp} disabled={loading}>
        Resend OTP
      </Button>
      <TextField
        label="Enter 4 digit new consent pin"
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm new consent pin"
        type="password"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmitForgetPin} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Forget Pin'}
      </Button>
    </Container>
  );

  const renderContent = () => {
    switch (step) {
      case 1:
        return renderSetPin();
      case 2:
        return renderResetPin();
      case 3:
        return renderForgetPin();
      default:
        return renderSetPin();
    }
  };

  const handleChangeStep = (newStep) => {
    resetFields();
    setStep(newStep);
  };

  return (
    <Container>
      <Button onClick={() => handleChangeStep(1)}>Set Consent Pin</Button>
      <Button onClick={() => handleChangeStep(2)}>Reset Consent Pin</Button>
      <Button onClick={() => handleChangeStep(3)}>Forget Consent Pin</Button>
      {renderContent()}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </Container>
  );
};

export default ConsentPin;
