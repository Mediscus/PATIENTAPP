import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import classNames from "classnames";
import AddMedications from "./AddMedications";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar } from "dan-components";
import { useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function Medications(props) {
  const patient = useParams();
  const { classes, encounterData } = props;
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: "add" });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });
  const openForm = () => setForm({ ...form, ["open"]: true, ["type"]: "add" });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  const [column, setColumn] = useState([
    { field: "form", headerName: "Form", width: 170 },
    { field: "brandName", headerName: "Brand Name", width: 170 },
    { field: "frequency", headerName: "Frequency", width: 170 },
    { field: "duration", headerName: "Duration", width: 170 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <>
          {/*  <GridActionsCellItem icon={<VisibilityOutlinedIcon />} onClick={() => { }} label="View" title="View" /> */}
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            onClick={() => handleEdit(params.row)}
            label="Edit"
            title="Edit"
          />
          <GridActionsCellItem
            icon={<DeleteOutlineOutlinedIcon />}
            onClick={() =>
              handleDelete(params.row.medicationRef, params.row.patientRef)
            }
            label="Delete"
            title="Delete"
          />
        </>,
      ],
    },
  ]);

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h6">Medications</Typography>
        <IconButton color="secondary" onClick={() => openForm()} size="large">
          <Add />
        </IconButton>
      </Box>

      <div style={{ height: "318px", width: "100%" }}>
        <DataGrid
          rows={apiData}
          columns={column}
          getRowId={(row) => row.medicationRef}
          pageSize={5}
          showCellRightBorder={true}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      {form.open && (
        <AddMedications
          open={form.open}
          data={form.data}
          type={form.type}
          closeForm={closeForm}
        />
      )}
    </Paper>
  );
}

Medications.propTypes = {
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

export default withStyles(styles)(Medications);
