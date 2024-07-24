import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    maxWidth: '600px',
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 600,
    width: '100%',
    textAlign: 'center',
  },
  form: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
}));

const RequestForm = () => {
  const classes = useStyles();
  const [requestId, setRequestId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [id, setId] = useState('');
  const [purpose, setPurpose] = useState('');
  const [requesterType, setRequesterType] = useState('');
  const [requesterId, setRequesterId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const payload = {
      requestId,
      timestamp,
      query: {
        id,
        purpose,
        requester: {
          type: requesterType,
          id: requesterId,
        },
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
      console.log('Submission successful:', data);
      // Handle successful submission, e.g., display a success message, clear form, etc.
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Submit Request
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            label="Request ID"
            // variant="outlined"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="Timestamp"
            // variant="outlined"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="ID"
            // variant="outlined"
            value={id}
            onChange={(e) => setId(e.target.value)}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="Purpose"
            // variant="outlined"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="Requester Type"
            // variant="outlined"
            value={requesterType}
            onChange={(e) => setRequesterType(e.target.value)}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="Requester ID"
            // variant="outlined"
            value={requesterId}
            onChange={(e) => setRequesterId(e.target.value)}
            fullWidth
            className={classes.input}
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
            fullWidth
            className={classes.button}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RequestForm;
