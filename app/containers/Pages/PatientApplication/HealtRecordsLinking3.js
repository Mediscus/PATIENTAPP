import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Search, Link, Close } from '@mui/icons-material';

const HealthRecordsLinking3 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState('');
  const [abhaAddress, setAbhaAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [fetchingRecords, setFetchingRecords] = useState(false);
  const [linkedRecords, setLinkedRecords] = useState([]);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // Simulate API call to fetch health programmes
    setTimeout(() => {
      setProgrammes([
        { id: 'cowin', name: 'CoWIN' },
        { id: 'ab-pmjay', name: 'AB-PMJAY' },
        { id: 'e-sanjeevani-opd', name: 'e-Sanjeevani OPD' },
        { id: 'e-sanjeevani-hwc', name: 'e-Sanjeevani HWC' },
        { id: 'rch-programme', name: 'RCH Programme' },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleSelectProgramme = (event) => {
    setSelectedProgramme(event.target.value);
    setOpenOtpDialog(true);
  };

  const handleOtpSubmit = () => {
    setOpenOtpDialog(false);
    // Simulate verifying OTP and fetching patient details
    setTimeout(() => {
      setPatientDetails({
        verifiedMobile: '123-456-7890',
        abhaAddress: abhaAddress,
        abhaNumber: 'ABHA123456',
        programmeSpecificField: 'Custom Value',
        fullName: 'John Doe',
        yearOfBirth: 1990,
        gender: 'Male',
      });
    }, 500);
  };

  const handleFetchRecords = async () => {
    setFetchingRecords(true);
    // Simulate fetching records
    setTimeout(() => {
      setLinkedRecords([
        {
          id: 1,
          facilityName: selectedProgramme,
          visitType: 'Consultation',
          prescribedBy: 'Dr. Smith',
          dateTime: '2023-06-30T10:00:00',
        },
      ]);
      setFetchingRecords(false);
      setOpenSnackbar(true);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Health Programme Records Linking
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Search Health Programme"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} /> : <Search />}
        >
          Search
        </Button>
      </Box>

      {programmes.length > 0 && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Health Programme</InputLabel>
          <Select value={selectedProgramme} onChange={handleSelectProgramme}>
            {programmes.map((programme) => (
              <MenuItem key={programme.id} value={programme.id}>
                {programme.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Dialog open={openOtpDialog} onClose={() => setOpenOtpDialog(false)}>
        <DialogTitle>Validate ABHA Address</DialogTitle>
        <DialogContent>
          <TextField
            label="ABHA Address"
            fullWidth
            variant="outlined"
            value={abhaAddress}
            onChange={(e) => setAbhaAddress(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="OTP"
            fullWidth
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOtpDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOtpSubmit} color="primary">
            Validate
          </Button>
        </DialogActions>
      </Dialog>

      {selectedProgramme && patientDetails && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Patient Details</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <strong>Verified Mobile:</strong> {patientDetails.verifiedMobile}
            </Typography>
            <Typography variant="body1">
              <strong>ABHA Address:</strong> {patientDetails.abhaAddress}
            </Typography>
            <Typography variant="body1">
              <strong>ABHA Number:</strong> {patientDetails.abhaNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Programme Specific Field:</strong> {patientDetails.programmeSpecificField}
            </Typography>
            <Typography variant="body1">
              <strong>Full Name:</strong> {patientDetails.fullName}
            </Typography>
            <Typography variant="body1">
              <strong>Year of Birth:</strong> {patientDetails.yearOfBirth}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {patientDetails.gender}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFetchRecords}
              disabled={fetchingRecords}
              startIcon={fetchingRecords ? <CircularProgress size={24} /> : <Link />}
              sx={{ mt: 2 }}
            >
              Pull Records
            </Button>
          </Box>
        </Box>
      )}

      {linkedRecords.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Linked Records</Typography>
          {linkedRecords.map((record) => (
            <Card key={record.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{record.facilityName}</Typography>
                <Typography variant="body2">
                  <strong>Visit Type:</strong> {record.visitType}
                </Typography>
                <Typography variant="body2">
                  <strong>Prescribed By:</strong> {record.prescribedBy}
                </Typography>
                <Typography variant="body2">
                  <strong>Date & Time:</strong> {new Date(record.dateTime).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Records successfully linked"
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <Close fontSize="small" />
          </IconButton>
        }
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default HealthRecordsLinking3
