import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { bgcolor } from "@mui/system";

export default function UserForm() {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    healthId: "",
    lastName: "",
    middleName: "",
    password: "",
    profilePhoto: "",
  });

  const location = useLocation();

  const [data, setData] = useState("");

  useEffect(() => {
    if (location.state && location.state.state) {
      setData(location.state.state.txnId);
      console.log(location.state.state.txnId);
    }
  }, [location]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // Verify Aadhaar OTP on registered mobile number to create Health ID

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/aadhaar/createHealthId`,
        {
          ...user,
          txnId: data,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} sx={{ maxWidth: 100, my: 20 }}>
      <TextField
        name="email"
        label="Email"
        value={user.email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="firstName"
        label="First Name"
        value={user.firstName}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="middleName"
        label="Middle Name"
        value={user.middleName}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={user.lastName}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        name="password"
        label="Password"
        value={user.password}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="profilePhoto"
        label="Profile Photo"
        value={user.profilePhoto}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        name="healthId"
        label="Health ID"
        // variant="outlined"
        value={user.healthId}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mb: 2 }}>
        Submit
      </Button>
    </form>
  );
}
