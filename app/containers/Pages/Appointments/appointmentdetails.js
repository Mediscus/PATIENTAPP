import React from "react";
import {
  Box,
  Button,
  Typography,
  CardActions,
  CardContent,
  Card,
  Divider,
} from "@mui/material";

export default function AppointmentDetails() {
  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        // marginTop: 20,
      }}
    >
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6">Share Yours Details with</Typography>
          <Typography variant="body2" gutterBottom>
            "Lady Hardinge Medical College and smt Sucheta Kriplani
            Hospital(LHMC and SSKH")
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Your Details
          </Typography>
          <Box mb={1}>
            <Typography variant="body2">
              ABHA Number :XX-XXXX-XXXX-XXXX
            </Typography>
          </Box>
          <Divider />
          <Box mb={1}>
            <Typography variant="body2">ABHA Address :</Typography>
          </Box>
          <Divider />
          <Box mb={1}>
            <Typography variant="body2">Name :</Typography>
          </Box>
          <Divider />
          <Box mb={1}>
            <Typography variant="body2">Gender :</Typography>
          </Box>
          <Divider />
          <Box mb={1}>
            <Typography variant="body2">DOB :</Typography>
          </Box>
          <Divider />
          <Box mb={1}>
            <Typography variant="body2">Mobile :</Typography>
          </Box>
          <Divider />
          <Box mb={1}>
            <Typography variant="body2">Address :</Typography>
          </Box>
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
