import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import FloatingPanel from "../../Panel/FloatingPanel";
import styles from "../PatientEncounter-jss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import { Box, Button, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import themePalette from "dan-api/palette/themePalette";
import AddMedicationsHelper from "./AddMedicationsHelper";
import PrevMedications from "./PrevMedications";
import AddMedicationsForm from "./AddMedicationsForm";

function AddMedications(props) {
  const { classes, encounterData, open, closeForm, type, data } = props;
  const [openMedicationForm, setOpenMedicationForm] = useState(true);
  const [apiData, setApiData] = useState({});

  const PreviewData = (reload) => {
    if (reload) {
      setOpenMedicationForm(true);
    }
  };

  useEffect(() => {
    if (type === 'add') {
      setApiData({});
    } else {
      setApiData(data);
      setOpenMedicationForm(false)
    }
  }, []);

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      branch="Hello"
      title="Medications"
      extraSize={false}
      helper={openMedicationForm}
      helperComponent={<AddMedicationsHelper encounterData={encounterData} />}
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
          <Typography>Medications</Typography>
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
          <PrevMedications
            closeForm={closeForm}
            encounterData={encounterData}
          />
          :
          <AddMedicationsForm
            closeForm={closeForm}
            data={apiData}
            type={type}
            PreviewData={PreviewData}
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
