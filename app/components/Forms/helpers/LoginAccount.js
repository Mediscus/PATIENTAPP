import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    maxWidth: '600px',
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 400,
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
    marginTop: theme.spacing(3),
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    history.push("/app/pages/abha");
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://dev.abdm.gov.in/gateway/v0.5/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, clientSecret }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      
      // Handle successful login, e.g., save token, redirect, etc.
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
          Login
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            label="Client ID"
            // variant="outlined"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="Client Secret"
            // variant="outlined"
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
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
            onClick={handleLogin}
            disabled={loading}
            fullWidth
            className={classes.button}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
