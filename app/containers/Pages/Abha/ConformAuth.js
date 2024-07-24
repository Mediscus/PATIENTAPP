import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Divider } from '@mui/material';
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
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
}));

const ConformAuth = () => {
  const classes = useStyles();
  const [requestId, setRequestId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const payload = {
      requestId,
      timestamp,
      transactionId,
      credential: {
        authCode,
      },
    };

    try {
      const response = await fetch('https://example.com/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
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
      <Typography variant="h5" className={classes.header}>Submit Request</Typography>
      <Divider />
      <Box className={classes.form}>
        <TextField
          label="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          fullWidth
        />
        <TextField
          label="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Auth Code"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
          fullWidth
        />
        {error && (
          <Typography className={classes.error} variant="body2">
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

export default ConformAuth;
