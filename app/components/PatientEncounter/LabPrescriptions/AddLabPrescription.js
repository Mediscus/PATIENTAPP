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
import AddLabPrescriptionHelper from "./AddLabPrescriptionHelper";
import AddLabPrescriptionForm from "./AddLabPrescriptionForm";

function AddMedications(props) {
  const { classes, encounterData, open, closeForm, type, callBack, data, setMessage } = props;
  const [openMedicationForm, setOpenMedicationForm] = useState(true);
  const [apiData, seApiData] = useState({});

  useEffect(() => {
    if (type === 'add') {
      seApiData({});
    } else {
      seApiData(data);
      setOpenMedicationForm(false)
    }
  }, []);

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      branch="Hello"
      title="Lab Prescription"
      extraSize={false}
      helper={openMedicationForm}
      helperComponent={<AddLabPrescriptionHelper />}
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
          {!openMedicationForm ? (
            <Button
              color="primary"
              className={classes.button}
              onClick={() => setOpenMedicationForm(true)}
            >
              View
            </Button>
          ) : (
            <Button
              color="primary"
              className={classes.button}
              onClick={() => setOpenMedicationForm(false)}
            >
              <Add />
              Add
            </Button>
          )}
        </Box>
        {openMedicationForm ?
          <PrevPrescription
            closeForm={closeForm}
          />
          :
          <AddLabPrescriptionForm
            closeForm={closeForm}
            callBack={callBack}
            mode={type}
            data={apiData}
            setMessage={setMessage}
            encounterData={encounterData}
          />
        }
      </Box>
    </FloatingPanel>
  );
}

AddMedications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMedications);
