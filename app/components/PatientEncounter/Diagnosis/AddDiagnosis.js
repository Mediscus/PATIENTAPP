import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import styles from "../PatientEncounter-jss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import Add from "@mui/icons-material/Add";
import AddDiagnosisHelper from "./AddDiagnosisHelper";
import { Box, Button, Typography } from "@mui/material";
import FloatingPanel from "../../Panel/FloatingPanel";
import PrevDiagnosis from "./PrevDiagnosis";
import AddDiagnosisForm from "./AddDiagnosisForm";
import themePalette from "dan-api/palette/themePalette";

function AddDiagnosis(props) {
  const { classes, encounterData, open, closeForm, data, type, callBack, setMessage } = props;
  const [openDiagnosesForm, setOpenDiagnosesForm] = useState(false);
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    if (type === 'add') {
      setApiData({});
      setOpenDiagnosesForm(false);
    } else {
      setApiData(data);
      setOpenDiagnosesForm(true);
    }
  }, [])

  const clickAdd = () => {
    setOpenDiagnosesForm(true)
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Diagnosis"
      helper={!openDiagnosesForm}
      helperComponent={<AddDiagnosisHelper />}
    >
      <Box>
        <Box
          sx={{
            px: 1,
            mt: 1,
            bgcolor: themePalette.skyBlueTheme.palette.primary.light,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Diagnosis attached to encounter</Typography>
          {openDiagnosesForm ? (
            <Button
              color="primary"
              className={classes.button}
              onClick={() => setOpenDiagnosesForm(false)}
            >
              View
            </Button>
          ) : (
            <Button
              color="primary"
              className={classes.button}
              onClick={() => clickAdd()}
            >
              <Add />
              Add
            </Button>
          )}
        </Box>
        {!openDiagnosesForm ?
          <PrevDiagnosis
            closeForm={closeForm}
          />
          :
          <AddDiagnosisForm
            data={apiData}
            type={type}
            callBack={callBack}
            setMessage={setMessage}
            closeForm={closeForm}
            encounterData={encounterData}
          />
        }
      </Box>
    </FloatingPanel >
  );
}

AddDiagnosis.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddDiagnosis);
