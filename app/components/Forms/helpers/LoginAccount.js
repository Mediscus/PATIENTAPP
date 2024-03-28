import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";

const LoginAccount = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleSubmit = () => {
    // Perform submit logic here
    setSelectedButton(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1000,
      }}
    >
      <Card sx={{ maxWidth: 550 }}>
        <CardContent>

          <Typography variant="h5" gutterBottom>
            Hello!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Test ABHA
          </Typography>

          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Username"
                placeholder="Enter Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Password"
                placeholder="Enter Password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Mobile Number"
                placeholder="Enter Mobile Number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Set PIN"
                placeholder="Enter 4 digit Number"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => handleButtonClick("login")}
              >
                Login
              </Button>
            </Grid>
            <Typography
              variant="body1"
              style={{ marginTop: "2px", textAlign: "center" }}
            >
              OR
            </Typography>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => handleButtonClick("abhaAddress")}
              >
                Login with ABHA Address
              </Button>
            </Grid>
            {selectedButton === "abhaAddress" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Enter Abha Address"
                    placeholder="Enter Abha Address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => handleButtonClick("abhaNumber")}
              >
                Login with ABHA Number
              </Button>
            </Grid>
            {selectedButton === "abhaNumber" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Enter Abha Number"
                    placeholder="Enter Abha Number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => handleButtonClick("emailid")}
              >
                Login with Email Id
              </Button>
            </Grid>
            {selectedButton === "emailid" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Enter Email Id"
                    placeholder="Enter Email Id"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </>
            )}
          </Grid>

          <Typography variant="body1" style={{ marginTop: "10px" }}>
            Don't Have An Account?
          </Typography>
          <Button variant="text" color="primary">
            Register
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginAccount;
