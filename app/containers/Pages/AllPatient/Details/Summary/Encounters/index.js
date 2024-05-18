import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
} from "@mui/material";
import classNames from "classnames";
import AddEncounters from "./AddEncounters";
import { addEncounter } from "../../../../../../redux/actions/encounterActions";
import { useDispatch } from "react-redux";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar, Loader } from "dan-components";
import { useParams } from "react-router-dom";
import {
  AddCircleOutlineOutlined,
  DeleteForever,
  Edit,
} from "@mui/icons-material";

function Encounters(props) {
  const { classes, add, shadow } = props;
  const dispatch = useDispatch();
  const patient = useParams();
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ open: false, data: null, type: "add" });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });
  const openForm = () => setForm({ ...form, ["open"]: true, ["type"]: "add" });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  useEffect(() => {
    getAppointment();
    return () => {
      setApiData([]);
    };
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getAppointment();
    }
  };

  async function getAppointment() {
    if (Object.keys(patient).length > 0) {
      await apiCall("appointment", "get", patient)
        .then((res) => {
          if (res && res.Status === "Success") {
            let data = res.Data;
            setApiData(data);
          }
        })
        .catch((Error) => {
          let ErrorMessage = Error.ErrorMessage;
          if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
            ErrorMessage = Error.ErrorMessage.join("\n");
          }
          handleSanackBar(true, "error", ErrorMessage);
        });
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    let prepareData = {
      appointmentRef: id,
    };
    if (prepareData) {
      if (confirm("Are You Sure You Want To Delete This Data") == true) {
        await apiCall("appointment/delete", "delete", prepareData)
          .then((res) => {
            if (res && res.Data && res.Status === "Success") {
              handleSanackBar(true, "success", "Data Deleted Successffuly");
              getAppointment();
            }
          })
          .catch((Error) => {
            let ErrorMessage = Error.ErrorMessage;
            if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
              ErrorMessage = Error.ErrorMessage.join("\n");
            }
            handleSanackBar(true, "error", ErrorMessage);
          });
      }
    } else alert("Patient Id Not Found");
  };

  const handleSanackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  const handleEdit = (data) => {
    setForm({ ...form, ["data"]: data, ["open"]: true, ["type"]: "edit" });
  };

  const handleMessage = (type, msg) => {
    handleSanackBar(true, type, msg);
  };

  return (
    <Paper className={classNames(classes.root)} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Appointment
        </Typography>
        {add && (
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <AddCircleOutlineOutlined />
          </IconButton>
        )}
      </Box>
      <Divider />
      <Box p={1}>
        {apiData &&
          apiData.length > 0 &&
          apiData.map((data, index) => {
            return (
              <List
                key={index}
                component="nav"
                aria-label="main mailbox folders"
              >
                <ListItem
                  button
                  onClick={() => dispatch(addEncounter(data))}
                  className={classes.listStyle}
                  classes={{
                    root: classes.listItemRoot,
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ fontSize: 14 }}
                    color="primary"
                  >
                    {data.department}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: 12 }}>
                    {data.diagnosis}
                  </Typography>
                </ListItem>
                {add && (
                  <ListItemSecondaryAction
                    classes={{
                      root: classes.secondaryAction,
                    }}
                  >
                    <IconButton
                      color="secondary"
                      classes={{
                        root: classes.iconBtn,
                      }}
                      onClick={() => handleEdit(data)}
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      classes={{
                        root: classes.iconBtn,
                      }}
                      onClick={() => handleDelete(data.appointment_id)}
                      size="small"
                    >
                      <DeleteForever fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </List>
            );
          })}
      </Box>
      {form.open && (
        <AddEncounters
          open={form.open}
          data={form.data}
          type={form.type}
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
    </Paper>
  );
}

Encounters.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};
Encounters.defaultProps = {
  add: true,
  shadow: 1,
};

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    padding: "5px 10px",
  },
  listStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemRoot: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "5px",
  },
});

export default withStyles(styles)(Encounters);

const EncounterData = [
  {
    id: 1,
    date: "04.01.2022",
    detaile: "Short Description",
  },
  {
    id: 2,
    date: "05.01.2022",
    detaile: "Short Description",
  },
  {
    id: 3,
    date: "06.01.2022",
    detaile: "Short Description",
  },
];
