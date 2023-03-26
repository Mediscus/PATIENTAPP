import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { Box, IconButton, Paper, Typography } from "@mui/material";
import classNames from "classnames";
import AddReport from "./AddReport";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { CustomSnackbar } from "dan-components";
import apiCall from "dan-redux/apiInterface";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Reports(props) {
  const { classes, encounterData } = props;
  const patientRef = useParams();
  const gridStyle = useMemo(() => ({ height: "318px", width: "100%" }), []);
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getReports();
  }, []);

  const callBackResponse = (refresh) => {
    closeForm()
    if (refresh) {
      getReports();
    }
  }

  async function getReports() {
    if (Object.keys(patientRef).length > 0) {
      await apiCall('ehr/reports', "get", patientRef)
        .then((res) => {
          if (res && res.Data && res.Status === "Success") {
            let data = res.Data;
            setApiData(data);
          }
        })
        .catch((Error) => {
          let ErrorMessage = Error.ErrorMessage;
          if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
            ErrorMessage = Error.ErrorMessage.join("\n");
          }
          handleSnackBar(true, "error", ErrorMessage);
        });
    }
  };

  const handleDelete = async (id, patientRef) => {
    let prepareData = {
      patientRef: patientRef,
      reportRef: id
    }
    if (prepareData) {
      if (
        confirm("Are You Sure You Want To Delete This Data") == true
      ) {
        await apiCall(
          'ehr/reports',
          "delete", prepareData
        )
          .then((res) => {
            if (res && res.Data && res.Status === "Success") {
              let data = res.Data;
              handleSnackBar(true, "success", "Data Deleted Successffuly");
              getReports();
            }
          })
          .catch((Error) => {
            let ErrorMessage = Error.ErrorMessage;
            if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
              ErrorMessage = Error.ErrorMessage.join("\n");
            }
            handleSnackBar(true, "error", ErrorMessage);
          });
      }
    } else alert("Patient Id Not Found");

  };

  const handleEdit = (data) => {
    setForm({ ...form, ["data"]: data, ["open"]: true, ['type']: 'edit' });
  };

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleMessage = (type, msg) => {
    handleSnackBar(true, type, msg);
  };

  const [column, setColumn] = useState([
    { field: "investigation", headerName: 'Report Name', width: 250 },
    { field: "investigation_date", headerName: 'Report Date', width: 250 },
    { field: "investigation_type", headerName: 'Report Type', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 250,
      getActions: (params) => [
        <>
          {/*  <GridActionsCellItem icon={<VisibilityOutlinedIcon />} onClick={() => { }} label="View" title="View" /> */}
          <GridActionsCellItem icon={<EditOutlinedIcon />} onClick={() => handleEdit(params.row)} label="Edit" title="Edit" />
          <GridActionsCellItem icon={<DeleteOutlineOutlinedIcon />} onClick={() => handleDelete(params.row.report_id, params.row.patient_ref)} label="Delete" title="Delete" />
        </>
      ]
    }
  ]);

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Box style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}>
        <Typography variant="h6" component={"span"}>
          Reports
        </Typography>
        <IconButton color="secondary" onClick={() => openForm()} size="large">
          <Add />
        </IconButton>
      </Box>
      <div style={gridStyle}>
        <DataGrid
          rows={apiData}
          columns={column}
          getRowId={(row) => row.report_id}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
      {form.open && (
        <AddReport
          open={form.open}
          data={form.data}
          type={form.type}
          closeForm={closeForm}
          callBack={callBackResponse}
          setMessage={(type, msg) => handleMessage(type, msg)}
          encounterData={encounterData}
        />
      )}
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
    </Paper>
  );
}

Reports.propTypes = {
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

export default withStyles(styles)(Reports);
