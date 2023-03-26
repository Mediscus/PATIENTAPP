import React from "react";
import { Grid, Typography } from "@mui/material";

function EncounterDetails() {
  return (
    <Grid
      container
      spacing={3}
      alignItems="flex-start"
      direction="row"
      padding="0px"
    >
      <Grid item xs={12} md={12} padding="0px">
        <Grid container spacing={0}>
          <Grid item xs={12} md={4}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  Appointment :
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">Clinic Visit</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  Date and Time :
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body2">15/09/2022</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  Age :
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2">28 Years</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4} style={{ marginTop: 10 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  Seen By :
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">Dr Drishti</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginTop: 10 }}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  At Clinic :
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body2">Clinic A</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EncounterDetails;
