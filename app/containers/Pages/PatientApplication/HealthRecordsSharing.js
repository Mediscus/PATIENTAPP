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
import { Search, Link, Close, Visibility } from '@mui/icons-material';

const HealthRecordsSharing = () => {
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
  const [openConsentDialog, setOpenConsentDialog] = useState(false);
  const [consentRequest, setConsentRequest] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [selectedHIType, setSelectedHIType] = useState('');

  const HI_TYPES = [
    'DiagnosticReport-Structured',
    'DiagnosticReport-Unstructured',
    'Prescription-Structured',
    'Prescription-Unstructured',
    'DischargeSummary-Structured',
    'DischargeSummary-Unstructured',
    'ConsultingNote-Structured',
    'ConsultingNote-Unstructured',
    'ImmunizationRecord-Structured',
    'ImmunizationRecord-Unstructured',
    'WellnessRecord-Structured',
    'WellnessRecord-Unstructured',
    'HealthRecord-Structured',
    'HealthRecord-Unstructured',
  ];

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

  const handleConsentRequest = async () => {
    // Simulate fetching consent request
    setConsentRequest({
      id: 1,
      hiuName: 'Health Information User',
      requestDate: '2023-06-30',
      hiType: selectedHIType,
      status: 'Approved',
    });
    setOpenConsentDialog(true);
  };

  const handleFetchHealthData = async () => {
    setOpenConsentDialog(false);
    setFetchingRecords(true);
    // Simulate fetching health data based on consent request
    setTimeout(() => {
      setHealthData([
        {
          id: 1,
          type: selectedHIType,
          content: 'Sample Health Data Content',
          dateTime: '2023-06-30T10:00:00',
        },
      ]);
      setFetchingRecords(false);
      setOpenSnackbar(true);
    }, 1000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Health Programme Records Sharing
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

      {patientDetails && (
        <Box sx={{ mt: 4 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select HI Type</InputLabel>
            <Select value={selectedHIType} onChange={(e) => setSelectedHIType(e.target.value)}>
              {HI_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConsentRequest}
            disabled={!selectedHIType}
            startIcon={<Visibility />}
          >
            View Consent Request
          </Button>
        </Box>
      )}

      <Dialog open={openConsentDialog} onClose={() => setOpenConsentDialog(false)}>
        <DialogTitle>Consent Request</DialogTitle>
        <DialogContent>
          {consentRequest && (
            <Box>
              <Typography variant="body1">
                <strong>HIU Name:</strong> {consentRequest.hiuName}
              </Typography>
              <Typography variant="body1">
                <strong>Request Date:</strong> {consentRequest.requestDate}
              </Typography>
              <Typography variant="body1">
                <strong>HI Type:</strong> {consentRequest.hiType}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {consentRequest.status}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConsentDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFetchHealthData} color="primary">
            Fetch Health Data
          </Button>
        </DialogActions>
      </Dialog>

      {healthData.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Health Data</Typography>
          {healthData.map((data) => (
            <Card key={data.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{data.type}</Typography>
                <Typography variant="body2">
                  <strong>Content:</strong> {data.content}
                </Typography>
                <Typography variant="body2">
                  <strong>Date & Time:</strong> {new Date(data.dateTime).toLocaleString()}
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

export default HealthRecordsSharing;
