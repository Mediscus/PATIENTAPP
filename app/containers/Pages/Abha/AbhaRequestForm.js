import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Divider, CircularProgress, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    maxWidth: '500px',
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const AbhaRequestForm = () => {
  const classes = useStyles();
  const [requestId, setRequestId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [queryId, setQueryId] = useState('');
  const [purpose, setPurpose] = useState('');
  const [authMode, setAuthMode] = useState('MOBILE_OTP');
  const [requesterType, setRequesterType] = useState('');
  const [requesterId, setRequesterId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://your.api.endpoint/here', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId,
          timestamp,
          query: {
            id: queryId,
            purpose,
            authMode,
            requester: {
              type: requesterType,
              id: requesterId,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h5" className={classes.header}>ABHA Request Form</Typography>
      <Divider />
      <Box className={classes.form}>
        <TextField
          label="Request ID"
          // variant="outlined"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Timestamp"
          // variant="outlined"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          fullWidth
        />
        <TextField
          label="Query ID"
          // variant="outlined"
          value={queryId}
          onChange={(e) => setQueryId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Purpose"
          // variant="outlined"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Auth Mode"
          // variant="outlined"
          value={authMode}
          onChange={(e) => setAuthMode(e.target.value)}
          fullWidth
        >
          <MenuItem value="MOBILE_OTP">MOBILE_OTP</MenuItem>
          <MenuItem value="DEMOGRAPHIC">DEMOGRAPHIC</MenuItem>
        </TextField>
        <TextField
          label="Requester Type"
          // variant="outlined"
          value={requesterType}
          onChange={(e) => setRequesterType(e.target.value)}
          fullWidth
        />
        <TextField
          label="Requester ID"
          // variant="outlined"
          value={requesterId}
          onChange={(e) => setRequesterId(e.target.value)}
          fullWidth
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          className={classes.submitButton}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
        {response && (
          <Typography color="primary" variant="body2">
            {JSON.stringify(response, null, 2)}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AbhaRequestForm;
