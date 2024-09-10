import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  AddCircleOutlineOutlined,
  DeleteForever,
  Edit,
} from "@mui/icons-material";
import styles from "../List-jss";
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar, Loader } from "dan-components";
import { withStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import AllergiesForm from "./AllergiesForm";
import {
  SET_ALLERGY_LIST,
  SET_NO_KNOWN_ALLERGY,
} from "../../../../../../redux/constants/AllergyActionType";
import { useDispatch, useSelector } from "react-redux";
import { getNoKnownAllergyList } from "./AllergyAction";

function Allergies(props) {
  const patient = useParams();
  const dispatch = useDispatch();
  const { classes, add, shadow } = props;
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ open: false, data: null, type: "add" });
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "" });
  const openForm = () => setForm({ ...form, ["open"]: true, ["type"]: "add" });
  const closeForm = () => {
    setForm({ ...form, ["open"]: false });
    dispatch({
      type: SET_NO_KNOWN_ALLERGY,
      payload: false,
    });
  };
  const { isNoKnownAllergy } = useSelector((state) => state.allergy);
  useEffect(() => {
    getAllergies();
    return () => {
      setApiData([]);
    };
  }, []);

  const callBackResponse = (refresh) => {
    closeForm();
    if (refresh) {
      getAllergies();
    }
  };

  async function getAllergies() {
    if (Object.keys(patient).length > 0) {
      await apiCall("ehr/allergies", "get", patient)
        .then((res) => {
          let data = res.Data;
          if (res && res.Status === "Success") {
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

  const handleDelete = async (id, patientRef) => {
    let prepareData = {
      patientRef: patientRef,
      allergiesRef: id,
    };
    if (prepareData) {
      if (confirm("Are You Sure You Want To Delete This Data") == true) {
        await apiCall("ehr/allergies", "delete", prepareData)
          .then((res) => {
            if (res && res.Data && res.Status === "Success") {
              handleSanackBar(true, "success", "Data Deleted Successffuly");
              getAllergies();
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
  const handleIsNoKnownAllergy = () => {
    openForm();
    getNoKnownAllergyList(dispatch);
    dispatch({
      type: SET_NO_KNOWN_ALLERGY,
      payload: !isNoKnownAllergy,
    });
  };

  return (
    <Paper className={classes.root} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" component={"span"} className={classes.title}>
          Allergies
        </Typography>
        {add && (
          <IconButton color="secondary" onClick={() => openForm()} size="large">
            <AddCircleOutlineOutlined />
          </IconButton>
        )}
      </Box>
      <Divider />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        No known allergy or intolerance.
        {/* <IconButton
          color="secondary"
          onClick={() => handleIsNoKnownAllergy()}
          size="large"
        >
          <AddCircleOutlineOutlined />
        </IconButton> */}
      </Box>
      <Box p={1}>
        <Loader isLoading={isLoading} />
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
                    {data.allergy_type}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: 12 }}>
                    {data.allergy_name}
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
                      onClick={() =>
                        handleDelete(data.allergies_id, data.patient_ref)
                      }
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
        <AllergiesForm
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

Allergies.propTypes = {
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};

Allergies.defaultProps = {
  add: true,
  shadow: 1,
};

export default withStyles(styles)(Allergies);
