import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import brand from "dan-api/dummy/brand";
import Grid from "@mui/material/Grid";
import SocialHistory from "./SocialHistory";
import PastHistory from "./PastHistory";
import PersonalHistory from "./PersonalHistory";
import FamilyHistory from "./FamilyHistory";
import Allergies from "./Allergies";
import Encounters from "./Encounters";
import Messages from "./Messages";
import ReproductiveHistory from "./ReproductiveHistory";
import MenstrualHistory from "./MenstrualHistory";
import TravelHistory from "./TravelHistory";
import VaccinationsHistory from "./VaccinationsHistory";
import ObservationBodyMeasurement from "./ObservationBodyMeasurement";
import ObservationGeneralAssessment from "./ObservationGeneralAssessment";
import ObservationLifestyle from "./ObservationLifestyle";
import ObservationPhysicalActivity from "./ObservationPhysicalActivity";
import FlowSheets from "../../../../../components/PatientEncounter/FlowSheets";
import Medications from "../../../../../components/PatientEncounter/Medications";
import AddDiagnosis from "../../../../../components/PatientEncounter/Diagnosis/AddDiagnosis";
import Diagnosis from "../../../../../components/PatientEncounter/Diagnosis";
import LabPrescriptionTable from "./../../../../../components/PatientEncounter/LabPrescriptions/LabPrescriptionTable";
import AddLabPrescription from "../../../../../components/PatientEncounter/LabPrescriptions/AddLabPrescription";
import LabPrescriptions from "../../../../../components/PatientEncounter/LabPrescriptions";

function Status(props) {
  const title = brand.name + " - Patient Summary";
  const description = brand.desc;
  const { classes, encounter, add, visible } = props;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Grid container spacing={3}>
        <Grid item md={encounter ? 12 : 4} xs={12}>
          {/* <FlowSheets add={add} shadow={visible} /> */}

          <PersonalHistory add={add} shadow={visible} />
          <ObservationLifestyle add={add} shadow={visible} />
        </Grid>

        <Grid item md={encounter ? 12 : 4} xs={12}>
          <SocialHistory add={add} shadow={visible} />
          <Allergies add={add} shadow={visible} />
          <FamilyHistory add={add} shadow={visible} />
          <Medications add={add} shadow={visible} />
          <VaccinationsHistory add={add} shadow={visible} />
          <TravelHistory add={add} shadow={visible} />
          <PastHistory add={add} shadow={visible} />
          {/*  <CheifComplaint add={add} shadow={visible} />  */}
          {/* <Assessment add={add} shadow={visible} /> */}
          <ObservationPhysicalActivity add={add} shadow={visible} />
        </Grid>

        <Grid item md={encounter ? 12 : 4} xs={12}>
          <Encounters add={add} shadow={visible} />
          <Diagnosis add={add} shadow={visible} />
          <LabPrescriptions add={add} shadow={visible} />
          <Messages add={add} shadow={visible} />
          {/* <Appointments add={add} shadow={visible} /> */}
          <MenstrualHistory add={add} shadow={visible} />
          <ReproductiveHistory add={add} shadow={visible} />
          <ObservationGeneralAssessment add={add} shadow={visible} />
          <ObservationBodyMeasurement add={add} shadow={visible} />
        </Grid>
      </Grid>
    </div>
  );
}

Status.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
});

export default withStyles(styles)(Status);
