import React, { useState } from 'react';
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
} from '@mui/material';
import { Search, Link, Close } from '@mui/icons-material';

const HealthRecordsLinking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [fetchingRecords, setFetchingRecords] = useState(false);
  const [linkedRecords, setLinkedRecords] = useState([]);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [otp, setOtp] = useState('');
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFacilities([
        { id: 1, name: 'City Hospital', address: '123 Main St' },
        { id: 2, name: 'Health Clinic', address: '456 Elm St' },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleLink = (facility) => {
    setSelectedFacility(facility);
    // Simulate fetching patient details
    setTimeout(() => {
      setPatientDetails({
        verifiedMobile: '123-456-7890',
        abhaAddress: 'example@abha',
        abhaNumber: 'ABHA123456',
        patientId: 'P12345',
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
      setOpenOtpDialog(true);
      setFetchingRecords(false);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    setFetchingRecords(true);
    // Simulate verifying OTP and fetching records
    setTimeout(() => {
      setLinkedRecords([
        {
          id: 1,
          facilityName: selectedFacility.name,
          visitType: 'Consultation',
          prescribedBy: 'Dr. Smith',
          dateTime: '2023-06-30T10:00:00',
        },
      ]);
      setFetchingRecords(false);
      setOpenOtpDialog(false);
      setOpenSnackbar(true);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Health Facility Hospital and patient link
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Search Health Facility"
        //   variant="outlined"
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

      {facilities.map((facility) => (
        <Card key={facility.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{facility.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {facility.address}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleLink(facility)}
              startIcon={<Link />}
              sx={{ mt: 2 }}
            >
              Link Facility
            </Button>
          </CardContent>
        </Card>
      ))}

      {selectedFacility && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Patient Details</Typography>
          {patientDetails ? (
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
                <strong>Patient ID:</strong> {patientDetails.patientId}
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
                Fetch Records
              </Button>
            </Box>
          ) : (
            <CircularProgress />
          )}
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

      <Dialog open={openOtpDialog} onClose={() => setOpenOtpDialog(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOtpDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleVerifyOtp}
            color="primary"
            variant="contained"
            disabled={fetchingRecords}
            startIcon={fetchingRecords ? <CircularProgress size={24} /> : <Link />}
          >
            Verify & Fetch Records
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HealthRecordsLinking;
