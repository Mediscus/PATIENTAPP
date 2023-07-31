import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import {
  Diagnosis,
  Reports,
  FlowSheet,
  Medications,
  Investigations,
  AdviceComment,
  FollowUp,
  Referral,
  MultiLineContent,
  InitialAssessment,
} from "./Components/Common";
import DocDiagnosis from "./Components/DocDiagnosis";
import ChiefComplaints from "./Components/ChiefComplaints";

function TimelineContent(props) {
  const { data, type } = props;

  const getContent = (name, cData) => {
    switch (name) {
      case "symptom":
      case "diagnosis":
        return <Diagnosis data={cData} />;
        break;
      case "comment":
        return (
          <Typography component={"span"} variant="caption">
            {cData}
          </Typography>
        );
        break;
      case "reports":
        return <Reports data={cData} />;
        break;
      case "doc_diagnosis":
        return <DocDiagnosis data={cData} />;
        break;
      case "chief_complaints":
        return <ChiefComplaints data={cData} />;
        break;
      case "flow_sheets":
        return <FlowSheet />;
        break;
      case "medications":
        return <Medications data={cData} />;
        break;
      case "investigations":
        return <Investigations data={cData} />;
        break;
      case "advice_comment":
        return <AdviceComment />;
        break;
      case "follow_up":
        return <FollowUp data={cData} />;
        break;
      case "referral":
        return <Referral data={cData} />;
        break;
      case "ward_shift":
        return <MultiLineContent data={cData} title="Patient Ward Shifting" />;
        break;
      case "patient_complaints":
        return <MultiLineContent data={cData} title="Patient Complaints" />;
        break;
      case "follow_treatment_chart":
        return <MultiLineContent data={cData} title="Medications" />;
        break;
      case "send_investigation":
        return <Investigations data={cData} title="Send Investigation" />;
        break;
      case "initial_assessment":
        return <InitialAssessment data={cData} title="Initial Assessment" />;
        break;
      case "follow_patient_diet":
        return <ChiefComplaints data={cData} title="Patient Diet" />;
        break;
      case "follow_patient_exercise":
        return <ChiefComplaints data={cData} title="Patient Exercise" />;
        break;
      case "follow_patient_activity":
        return <MultiLineContent data={cData} title="Patient Activity" />;
        break;
      case "sample_request":
        return <MultiLineContent data={cData} title="Sample Request" />;
        break;
      case "patient_admission":
        return <MultiLineContent data={cData} title="Patient Admission" />;
        break;
      case "patient_discharge":
        return <MultiLineContent data={cData} title="Patient Discharge" />;
        break;
      case "doctors_notes":
        return <MultiLineContent data={cData} title="Doctor Notes" />;
        break;
      case "modify_treatment_chart":
        return <Medications data={cData} title="Modify Treatment Chart" />;
        break;
      case "request_investigations":
        return <MultiLineContent data={cData} title="Request Investigations" />;
        break;
      case "request_ward_shifting":
        return <MultiLineContent data={cData} title="Request Ward Shifting" />;
        break;
      case "add_report_manually":
        return <Reports title="Add Report Manually" />;
        break;
      case "procedure_notes":
        return <MultiLineContent data={cData} title="Procedure Notes" />;
        break;
      case "taking_consent":
        return <MultiLineContent data={cData} title="Taking Consent" />;
        break;
      case "nursing_chart":
        return <MultiLineContent data={cData} title="Nursing Chart" />;
        break;
      default:
        return null;
        break;
    }
  };

  const renderContent = () => {
    let keyArray = Object.keys(data);
    let output = [];
    if (keyArray && keyArray.length > 0) {
      keyArray.map((itm, index) => {
        output[index] = <div key={index}>{getContent(itm, data[itm])}</div>;
      });
    }
    return output;
  };

  return <Box>{renderContent()}</Box>;
}

export default TimelineContent;
