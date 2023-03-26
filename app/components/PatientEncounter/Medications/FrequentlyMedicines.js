import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, Divider } from "@material-ui/core";
import { FrequencyMedicines } from "dan-api/dummy/getmedicationFormData";

export default function FrequentlyMedicines() {
  return (
    <Box border={1} sx={{ borderRadius: "5px", borderColor: "#E4E4E4" }}>
      {FrequencyMedicines.map((data, index) => {
        return (
          <Grid key={"content" + index} container>
            <Grid
              item
              xs={12}
              style={{
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" style={{ fontSize: 12 }}>
                {data.Form} &nbsp;
                {data.BrandName} &nbsp;
                {data.Strength} &nbsp;
                {data.Dose} &nbsp;
                {data.Duration} &nbsp;
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Divider />
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
