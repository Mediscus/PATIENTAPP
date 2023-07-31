import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import apiCall from "dan-redux/apiInterface";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import { CustomSnackbar } from "dan-components";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPatient } from "../../../redux/actions/patientsActions";
import MainCard from "../../../components/MainCard";
import AddPatientForm from "../AllPatient/AddPatientForm";

const AllPatient = ({ setMessage }) => {
  const dispatch = useDispatch();
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ open: false, data: null, type: "add" });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });
  const openForm = () => setForm({ ...form, ["open"]: true, ["type"]: "add" });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getPatients();
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getPatients();
    }
  };

  const handleEdit = (data) => {
    setForm({ ...form, ["data"]: data, ["open"]: true, ["type"]: "edit" });
  };

  async function getPatients() {
    await apiCall(`patient`, "get")
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
        setMessage(ErrorMessage);
      });
    setIsLoading(false);
  }

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleMessage = (msg) => {
    handleSnackBar(true, "success", msg);
  };

  const [params, setParams] = useState({
    Limit: 5,
    Page: 0,
    Search: [],
    OBy: "",
    OMode: "",
  });

  function ExtraToolBarButton() {
    return (
      <Box sx={{ marginLeft: "auto" }}>
        <Button onClick={() => openForm()} color="primary" variant="outlined">
          <Add /> Add Family Member
        </Button>
      </Box>
    );
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {/* <GridToolbarColumnsButton
          variant="outlined"
          size="medium"
          color="primary"
        />
        <GridToolbarFilterButton
          variant="outlined"
          size="large"
          color="primary"
          sx={{ p: 0.7, mx: 1 }}
        />
        <GridToolbarDensitySelector
          variant="outlined"
          color="primary"
          size="medium"
        /> */}
        <ExtraToolBarButton />
      </GridToolbarContainer>
    );
  }

  const handleOnSortingChange = (sorting) => {
    if (sorting && sorting.length == 1) {
      let field = sorting[0].field;
      let sort = sorting[0].sort;
      setParams((prevParams) => ({
        ...prevParams,
        ["OBy"]: field,
        ["OMode"]: sort,
      }));
    }
  };

  const handleOnPageChange = (pageNumber) => {
    setParams((prevParams) => ({ ...prevParams, ["Page"]: pageNumber }));
  };

  const handleOnPerPageLimitChange = (pageLimit) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...{ Limit: pageLimit, Page: 0 },
    }));
  };

  const handleOnFilterChange = (filter) => {
    if (filter && filter.items && filter.items.length > 0) {
      var items = filter.items[0];
      items = JSON.stringify(items);
      setParams((prevParams) => ({ ...prevParams, ...{ q: items, Page: 0 } }));
    } else {
      setParams((prevParams) => ({ ...prevParams, ...{ q: [], Page: 0 } }));
    }
  };

  function getFullName(params) {
    if (params.row && params.row.first_name) {
      return `${params.row.first_name} ${params.row.last_name}`;
    }
  }

  function getMobileNumber(params) {
    if (params.row && params.row.dial_country_code) {
      return `${params.row.dial_country_code}-${params.row.phone}`;
    }
  }

  const columns = [
    {
      headerName: "Patient Name",
      field: "name",
      width: "240",
      valueGetter: getFullName,
    },
    // { headerName: "Gender", field: "gender", width: "150" },
    // { headerName: "Dob", field: "dob", width: "150" },
    // { headerName: "Dob", field: "dob", width: "150" },
    { headerName: "Relation", field: "Relation", width: "150" },
    { headerName: "ABHA Number", field: "ABHA Number", width: "250" },
    {
      headerName: "Mobile Number",
      field: "mobileNumber",
      width: "150",
      valueGetter: getMobileNumber,
    },
    { headerName: "Marriage Status", field: "marriage_status", width: "150" },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <>
          {/* <GridActionsCellItem icon={<VisibilityOutlinedIcon />} onClick={() => { }} label="View" title="View" />
          <GridActionsCellItem icon={<EditOutlinedIcon />} onClick={() => handleEdit(params.row)} label="Edit" title="Edit" />
          <GridActionsCellItem icon={<DeleteOutlineOutlinedIcon />} onClick={() => { }} label="View" title="View" /> */}
          <Link to={`/app/all-patient/details/${params.row.patient_id}`}>
            <GridActionsCellItem
              icon={<VisibilityOutlinedIcon />}
              label="Details"
              title="Details"
              onClick={() => dispatch(setPatient(params.row))}
            />
          </Link>
        </>,
      ],
    },
  ];

  return (
    <MainCard>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={apiData}
          getRowId={(row) => row.patient_id}
          loading={isLoading}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20, 50]}
          showCellRightBorder={true}
          pagination={true}
          page={params.Page}
          pageSize={params.Limit}
          /* sortingMode="server"
          filterMode="server"
          paginationMode="server" */
          onSortModelChange={(sData) => handleOnSortingChange(sData)}
          onPageChange={(newPage) => handleOnPageChange(newPage)}
          onPageSizeChange={(newPageSize) =>
            handleOnPerPageLimitChange(newPageSize)
          }
          onFilterModelChange={(newFilter) => handleOnFilterChange(newFilter)}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
      {snackBar.open && (
        <CustomSnackbar
          open={snackBar.open}
          msg={snackBar.msg}
          type={snackBar.type}
          onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
        />
      )}
      {form.open && (
        <AddPatientForm
          open={form.open}
          data={form.data}
          type={form.type}
          callBack={callBackResponse}
          setMessage={(msg) => handleMessage(msg)}
          closeForm={closeForm}
        />
      )}
    </MainCard>
  );
};

export default AllPatient;
