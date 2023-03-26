import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import FloatingPanel from "../../Panel/FloatingPanel";
import styles from "../PatientEncounter-jss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import { Box, Button, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import themePalette from "dan-api/palette/themePalette";
import PrevPrescription from "./PrevPrescription";
import AssessmentHelper from "./AssessmentHelper";
import AssessmentForm from "./AssessmentForm";

function AddAssessment(props) {
  const { classes, open, closeForm, type, callBack, data, setMessage } = props;
  const [openAssessmentForm, setOpenAssessmentForm] = useState(true);
  const [apiData, seApiData] = useState({});

  const modifyData = (data) => {
    if (data) {
      seApiData(data);
      setOpenAssessmentForm(false);
    }
  };

  const PreviewData = (reload) => {
    if (reload) {
      setOpenAssessmentForm(true);
    }
  };

  useEffect(() => {
    if (type === 'add') {
      seApiData({});
    } else {
      seApiData(data);
      setOpenAssessmentForm(false)
    }
  }, []);

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      branch="Hello"
      title="Lab Prescription"
      extraSize={false}
      helper={openAssessmentForm}
      helperComponent={<AssessmentHelper />}
    >
      <Box>
        <Box
          sx={{
            px: 1,
            bgcolor: themePalette.skyBlueTheme.palette.primary.light,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Lab Prescription</Typography>
          {!openAssessmentForm ? (
            <Button
              color="primary"
              className={classes.button}
              onClick={() => setOpenAssessmentForm(true)}
            >
              View
            </Button>
          ) : (
            <Button
              color="primary"
              className={classes.button}
              onClick={() => setOpenAssessmentForm(false)}
            >
              <Add />
              Add
            </Button>
          )}
        </Box>
        {openAssessmentForm ?
          <PrevPrescription closeForm={closeForm} modifyData={modifyData} />
          :
          <AssessmentForm
            closeForm={closeForm}
            callBack={callBack}
            PreviewData={PreviewData}
            mode={type}
            data={apiData}
            setMessage={setMessage}
          />
        }
      </Box>
    </FloatingPanel>
  );
}

AddAssessment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAssessment);
