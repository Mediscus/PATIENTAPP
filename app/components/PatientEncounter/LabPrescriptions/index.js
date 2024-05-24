import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import { Grid, IconButton, Paper, Typography, Box } from "@mui/material";
import classNames from "classnames";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import { CustomSnackbar } from "dan-components";
import AddLabPrescription from "./AddLabPrescription";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Divider from "@mui/material/Divider";

function LabPrescriptions({ classes, encounterData }) {
  const gridStyle = useMemo(() => ({ height: "350px", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: "add" });
  const [snackBar, setSnackBar] = useState({
    open: false,
    type: "",
    msg: "",
  });
  const [showGrid, setShowGrid] = useState(false); // State to control grid visibility

  const openForm = () => setForm({ ...form, open: true, type: "add" });
  const closeForm = () => setForm({ ...form, open: false });

  useEffect(() => {
    fetchLabPrescriptionData();
  }, []);

  const fetchLabPrescriptionData = async () => {
    try {
      const response = await fetch(
        "https://hapi.fhir.org/baseR4/ServiceRequest?_lastUpdated=gt2024-05-23"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Lab Prescription Data:", data);

      const formattedData = data.entry.map((entry) => ({
        id: entry.resource.id,
        status: entry.resource.status || "",
        intent: entry.resource.intent || "",
        investigation:
          entry.resource.category &&
          entry.resource.category[0].coding &&
          entry.resource.category[0].coding[0].display
            ? entry.resource.category[0].coding[0].display
            : "",
        priority: entry.resource.priority || "",
        details:
          entry.resource.code &&
          entry.resource.code.coding &&
          entry.resource.code.coding[0].display
            ? entry.resource.code.coding[0].display
            : "",
        order_date: entry.resource.authoredOn || "",
      }));
      setRowData(formattedData);
    } catch (error) {
      console.error("Error fetching lab prescription data:", error);
    }
  };

  const handleEdit = (data) => {
    setForm({ ...form, data, open: true, type: "edit" });
  };

  const handleDelete = (prescriptionRef, patientRef) => {
    // Handle delete logic
  };

  const handleMessage = (type, msg) => {
    setSnackBar({ ...snackBar, open: true, type, msg });
  };

  const toggleGridVisibility = () => {
    setShowGrid(!showGrid); // Toggle grid visibility
  };

  const columns = [
    { field: "id" },
    { field: "status" },
    { field: "intent" },
    { field: "investigation" },
    { field: "priority" },
    { field: "details" },
    {
      field: "order_date",
      headerName: "Date",
      width: 150,
      valueGetter: (params) =>
        `${moment(params.row.order_date).format("DD-MM-YYYY")}`,
    },
    { field: "instruction", headerName: "Instruction", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <React.Fragment>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleDelete(params.row.prescriptionRef, params.row.patientRef)
            }
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </React.Fragment>
      ),
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
            marginBottom: "10px",
          }}
        >
          <Typography variant="h6">Lab Prescription</Typography>
          <IconButton color="secondary" onClick={openForm} size="large">
            <Add />
          </IconButton>
        </Box>

        <Box onClick={toggleGridVisibility} style={{ cursor: "pointer" }}>
          <Typography variant="body1">
            Click here to {showGrid ? "hide" : "show"} data
          </Typography>
        </Box>
        {showGrid && (
          <div style={gridStyle}>
            <DataGrid rows={rowData} columns={columns} pageSize={5} />
          </div>
        )}
      </Paper>
      {form.open && (
        <AddLabPrescription
          open={form.open}
          data={form.data}
          type={form.type}
          closeForm={closeForm}
          setMessage={handleMessage}
          encounterData={encounterData}
        />
      )}
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, open: false })}
      />
    </Grid>
  );
}

LabPrescriptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
});

export default withStyles(styles)(LabPrescriptions);
