import React from "react";
import { Grid } from "@mui/material";
import MainCard from "../MainCard";
import EncounterDetails from "./EncounterDetails";
import ChiefComplaint from "./ChiefCompaint";
import Assessment from "./Assessment";
import FlowSheets from "./FlowSheets";
import Medications from "./Medications";
import Diagnosis from "./Diagnosis";
import LabPrescriptions from "./LabPrescriptions";
import Reports from "./Reports";
import Advise from "./Advise";
import FollowUp from "./FollowUp";

function Encounters(props) {
  const { encounterData } = props;
  return (
    <div>
      <Grid
        container
        spacing={0}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12} md={12}>
          <MainCard title="Encounter Details">
            <EncounterDetails encounterData={encounterData} />
          </MainCard>
        </Grid>

        <Grid item xs={12} md={12}>
          <ChiefComplaint encounterData={encounterData} />
        </Grid>

        <Grid item xs={12} md={12}>
          <Assessment encounterData={encounterData} />
        </Grid>

        <Grid item xs={12} md={12}>
          <FlowSheets encounterData={encounterData} />
        </Grid>

        <Grid item xs={12} md={12}>
          <Medications encounterData={encounterData} />
        </Grid>

        <Grid item xs={12} md={12}>
          <Diagnosis encounterData={encounterData} />
        </Grid>

        <Grid item xs={12} md={12}>
          <LabPrescriptions encounterData={encounterData} />
        </Grid>

        <Grid item xs={12} md={12}>
          <Reports encounterData={encounterData} />
        </Grid>

        <Grid item xs={12} md={12}>
          <Advise encounterData={encounterData} />
        </Grid>

        <Grid item xs={12} md={12}>
          <FollowUp encounterData={encounterData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Encounters;
