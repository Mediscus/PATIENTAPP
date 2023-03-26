import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { Grid, IconButton, Paper, Typography, Box } from "@mui/material";
import classNames from "classnames";
import apiCall from "dan-redux/apiInterface";
import AddDiagnosis from "./AddDiagnosis";
import { useParams } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import moment from "moment";
import { Add } from "@mui/icons-material";
import { CustomSnackbar } from "dan-components";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Diagnosis(props) {
  const { classes, encounterData } = props;
  const patientRef = useParams();
  const gridStyle = useMemo(() => ({ height: "318px", width: "100%" }), []);
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getDiagnosis();
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getDiagnosis();
    }
  }

  async function getDiagnosis() {
    if (Object.keys(patientRef).length > 0) {
      await apiCall('ehr/diagnosis', "get", patientRef)
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
      diagnosisRef: id
    }
    if (prepareData) {
      if (
        confirm("Are You Sure You Want To Delete This Data") == true
      ) {
        await apiCall(
          'ehr/diagnosis',
          "delete", prepareData
        )
          .then((res) => {
            if (res && res.Data && res.Status === "Success") {
              let data = res.Data;
              handleSnackBar(true, "success", "Data Deleted Successffuly");
              getDiagnosis();
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

  const columns = [
    {
      field: 'diagnosisName',
      headerName: 'Diagnosis Name',
      width: 250,
    },
    {
      field: 'sequence',
      headerName: 'Sequence',
      width: 250,
    },
    {
      field: 'fromDate',
      headerName: 'From Date',
      width: 200,
      valueGetter: (params) =>
        `${moment(params.row.from_date).format('DD-MM-YYYY')}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <>
          {/*  <GridActionsCellItem icon={<VisibilityOutlinedIcon />} onClick={() => { }} label="View" title="View" /> */}
          <GridActionsCellItem icon={<EditOutlinedIcon />} onClick={() => handleEdit(params.row)} label="Edit" title="Edit" />
          <GridActionsCellItem icon={<DeleteOutlineOutlinedIcon />} onClick={() => handleDelete(params.row.diagnosisRef, params.row.patientRef)} label="Delete" title="Delete" />
        </>
      ]
    }
  ];

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleMessage = (type, msg) => {
    handleSnackBar(true, type, msg);
  };

  return (
    <Grid item xs={12} md={12}>
      <Paper className={classNames(classes.root)} elevation={1}>
        <Box style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}>
          <Typography variant="h6" component={"span"}>
            Diagnosis
          </Typography>
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <Add />
          </IconButton>
        </Box>
        <div style={gridStyle} >
          <DataGrid
            rows={apiData}
            getRowId={(row) => row.diagnosisRef}
            columns={columns}
            pageSize={5}
            showCellRightBorder={true}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Paper>
      {form.open && (
        <AddDiagnosis
          open={form.open}
          data={form.data}
          type={form.type}
          encounterData={encounterData}
          closeForm={closeForm}
          callBack={callBackResponse}
          setMessage={(type, msg) => handleMessage(type, msg)}
        />
      )}
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
    </Grid>
  );
}

Diagnosis.propTypes = {
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

export default withStyles(styles)(Diagnosis);
