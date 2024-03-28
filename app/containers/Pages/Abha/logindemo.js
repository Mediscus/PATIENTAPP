import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Email } from "@mui/icons-material";
import QRScanner from "./QRScanner";

const LoginDemo = () => {



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <CardContent>
          <h1>QR Code Scanner</h1>
          <QRScanner />
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginDemo;
