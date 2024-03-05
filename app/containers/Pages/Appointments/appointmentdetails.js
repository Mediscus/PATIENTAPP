import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Card,
} from "@mui/material";

export default function AppointmentDetails() {
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 4,
        // marginTop: 20,
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Your Details
          </Typography>
          <Typography variant="body2">
            ABHA Number :XX-XXXX-XXXX-XXXX
          </Typography>
          <Typography variant="body2">ABHA Address :</Typography>
          <Typography variant="body2">Name :</Typography>
          <Typography variant="body2">Gender :</Typography>
          <Typography variant="body2">DOB :</Typography>
          <Typography variant="body2">Mobile :</Typography>
          <Typography variant="body2">Address :</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">
            Cancel
          </Button>
          <Button size="small" variant="contained">
            Share
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
