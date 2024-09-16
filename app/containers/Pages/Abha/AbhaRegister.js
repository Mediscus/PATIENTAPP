import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AbhaMobileNumber from './AbhaMobileNumber'; // Import the component for mobile number registration

const AbhaRegister = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [step, setStep] = useState(1); // Step 1: Select method, Step 2: Mobile number or ABHA number component

  const handleRadioChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleNextClick = () => {
    if (selectedMethod) {
      setStep(2); // Move to the next step
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      {step === 1 && (
        <Paper elevation={3} style={{ padding: '20px', width: '80%' }}>
          <Typography variant="h6" align="center" gutterBottom>
            User Method Select Any One
          </Typography>
        </Paper>
      )}
      <Paper elevation={3} style={{ padding: '20px', width: '80%', marginTop: '20px' }}>
        {step === 1 ? (
          <Box display="flex" flexDirection="column" gap={4}>
            <Typography variant="h4" gutterBottom>
              Create User Account
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Method</FormLabel>
              <RadioGroup value={selectedMethod} onChange={handleRadioChange}>
                <FormControlLabel value="MOBILE NUMBER" control={<Radio />} label="Mobile Number" />
                <FormControlLabel value="ABHA Number" control={<Radio />} label="ABHA Number" />
              </RadioGroup>
            </FormControl>
            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button variant="contained" color="primary" onClick={handleNextClick} disabled={!selectedMethod}>
                Next
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            {selectedMethod === 'MOBILE NUMBER' ? (
              <AbhaMobileNumber />
            ) : (
              <Typography variant="h5" align="center">ABHA Number Registration Component</Typography>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AbhaRegister;
