import React, { useEffect, useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Grid, IconButton, Paper, Typography, Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import moment from "moment";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useParams } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";
import classNames from "classnames";
import AddDiagnosis from "./AddDiagnosis";
import { CustomSnackbar } from "dan-components";

const Diagnosis = (props) => {
  const { classes, encounterData } = props;
  const patientRef = useParams();
  const gridStyle = useMemo(() => ({ height: "318px", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: "add" });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });
  const [showGrid, setShowGrid] = useState(false);

  const openForm = () => setForm({ open: true, type: "add", data: null });
  const closeForm = () => setForm({ open: false, type: "add", data: null });

  const toggleGridVisibility = () => {
    // Step 2
    setShowGrid(!showGrid);
  };
  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ open, type, msg });
  };

  const fetchDiagnosisData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://hapi.fhir.org/baseR4/Condition?_lastUpdated=gt2024-02-15"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const formattedData = data.entry.map((entry) => ({
        id: entry.resource.id,
        stauts: "active",
        // status: entry.resource.clinicalStatus?.coding[0]?.display || "Unknown",
        // diagnosis: entry.resource.code?.coding[0]?.display || "Unknown",
        // onsetDateTime: entry.resource.onsetDateTime || "Unknown",
        // recorder: entry.resource.recorder?.reference || "Unknown",
      }));
      setRowData(formattedData);
    } catch (error) {
      handleSnackBar(
        true,
        "error",
        `Error fetching diagnosis data: ${error.message}`
      );
    }
  }, []);

  useEffect(() => {
    fetchDiagnosisData();
  }, [fetchDiagnosisData]);

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this data?")) {
        await apiCall("ehr/diagnosis", "delete", {
          patientRef,
          diagnosisRef: id,
        });
        handleSnackBar(true, "success", "Data deleted successfully");
        fetchDiagnosisData();
      }
    } catch (error) {
      handleSnackBar(true, "error", `Error deleting data: ${error.message}`);
    }
  };

  const handleEdit = (data) => {
    setForm({ open: true, data, type: "edit" });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "diagnosis", headerName: "Diagnosis", width: 250 },
    {
      field: "onsetDateTime",
      headerName: "Onset Date",
      width: 200,
      valueGetter: (params) =>
        moment(params.row.onsetDateTime).format("DD-MM-YYYY"),
    },
    { field: "recorder", headerName: "Recorder", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditOutlinedIcon />}
          onClick={() => handleEdit(params.row)}
          label="Edit"
          title="Edit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          onClick={() => handleDelete(params.row.id)}
          label="Delete"
          title="Delete"
        />,
      ],
    },
  ];

  return (
    <Grid item xs={12} md={12}>
      <Paper className={classNames(classes.root)} elevation={1}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <Typography variant="h6">Diagnosis</Typography>
          <IconButton color="secondary" onClick={openForm} size="large">
            <Add />
          </IconButton>
        </Box>
        <Box onClick={toggleGridVisibility} style={{ cursor: "pointer" }}>
          {" "}
          <Typography variant="body1">
            Click here to {showGrid ? "hide" : "show"} data
          </Typography>
        </Box>
        {showGrid && (
          <div style={gridStyle}>
            <DataGrid rows={rowData} columns={columns} pageSize={4} />
          </div>
        )}
      </Paper>
      {form.open && (
        <AddDiagnosis
          open={form.open}
          data={form.data}
          type={form.type}
          encounterData={encounterData}
          closeForm={closeForm}
          callBack={fetchDiagnosisData}
          setMessage={handleSnackBar}
        />
      )}
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ open: false, type: "", msg: "" })}
      />
    </Grid>
  );
};

Diagnosis.propTypes = {
  classes: PropTypes.object.isRequired,
  encounterData: PropTypes.object,
};

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
  },
});

export default withStyles(styles)(Diagnosis);
