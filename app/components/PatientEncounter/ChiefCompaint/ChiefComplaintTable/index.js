import React, { useState, useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,
  Typography,
  List,
  ListItem,
  IconButton,
  Checkbox,
  FormControlLabel,
  Paper,
  Box,
} from "@mui/material";
// import { ChiefComplaintData } from "dan-api/dummy/ChiefComplaintData";
import classNames from "classnames";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import apiCall from "dan-redux/apiInterface";
import { Add, DeleteForever, Edit } from "@mui/icons-material";
import ChiefComplaintForm from "./ChiefComplaintForm";

const useStyles = makeStyles((theme) => ({
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
  summaryRoot: {
    minHeight: "35px",
  },
  accordionRoot: {
    padding: "5px !important",
  },
  summaryExpanded: {
    minHeight: "25px !important",
  },
  summaryContent: {
    margin: "5px 0px !important",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  accordingDetails: {
    padding: "0px !important",
  },
  iconButton: {
    padding: 8,
    fontSize: 16,
  },
}));

export default function ChiefComplaintTabel(props) {
  const { setMessage, encounterData } = props;
  const classes = useStyles();
  const patientId = useParams();
  const [apiData, setApiData] = useState([]);
  const [form, setForm] = useState({
    open: false,
    data: null,
  });

  const openForm = () => {
    setForm({ ...form, ["open"]: true });
  };

  const closeForm = () => {
    setForm({ ...form, ["open"]: false, ['data']: null });
  };

  // function to convert string into html
  function createMarkup(data) {
    return { __html: data };
  }

  const getChiefCompliant = async () => {
    if (patientId) {
      await apiCall('ehr/chief-compliant', "get", patientId)
        .then((res) => {
          if (res && res.Status === "Success") {
            if (res.Data) {
              let data = res.Data;
              setApiData(data);
            }
          }
        })
        .catch((Error) => {
          console.log("Error", Error);
        });
    }
  };

  const handleEdit = (data) => {
    let oldData = form;
    if (!form.open) {
      // let newData = Object.assign(oldData, {data: data, open: true});
      setForm({ ['data']: data, ['open']: true });
    }
  };

  const handleDelete = async (id, patientId) => {
    if (id) {
      if (patientId) {
        if (confirm("Are You Sure You Want To Delete This Compliant") == true) {
          await apiCall(
            `ehr/chief-compliant?patientRef=${patientId}&compliantRef=${id}`,
            "delete"
          )
            .then((res) => {
              let data = res.Data;
              if (res && res.Status === "Success") {
                setMessage("delete_success");
                getChiefCompliant();
              }
            })
            .catch((Error) => {
              let ErrorMessage = Error.ErrorMessage;
              if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
                ErrorMessage = Error.ErrorMessage.join("\n");
              }
              setMessage(ErrorMessage);
            });
        }
      } else alert("Patient Id Not Found");
    } else alert("Compliant id Id Not Found");
  };

  useEffect(() => {
    getChiefCompliant();
  }, []);

  const renderChiefComplaintItems = (items, marginLeft) => {
    let data = [];
    if (items && items.length > 0) {
      items.map((option, ind) => {
        data[ind] = (
          <>
            <ListItem style={{ marginLeft: marginLeft }}>
              <Typography variant="body2" style={{ fontSize: 12 }}>
                {option.name}
              </Typography>
            </ListItem>
            {option.item &&
              renderChiefComplaintItems(option.item, marginLeft + 16)}
          </>
        );
      });
    }
    return data;
  };

  const callBackResponse = (refresh) => {
    closeForm()
    if (refresh) {
      getChiefCompliant();
    }
  }

  return (
    <Paper className={classNames(classes.root)} elevation={1}>
      <Typography
        variant="h6"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        Chief Complaints
        <IconButton color="secondary" onClick={() => openForm()} size="large">
          <Add />
        </IconButton>
      </Typography>
      <Grid>
        {apiData && apiData.length > 0
          ? apiData.map((option, ind) => {
            return (
              <Accordion key={option.compliant_id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  classes={{
                    root: classes.summaryRoot,
                    content: classes.summaryContent,
                    expanded: classes.summaryExpanded,
                  }}
                >
                  <Typography varient="body2">{option.category}</Typography>
                  <Box>
                    <IconButton color="secondary" onClick={() => handleEdit(option)} size="large">
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="secondary"
                      classes={{
                        root: classes.iconBtn,
                      }}
                      onClick={() =>
                        handleDelete(option.compliant_id, option.patient_ref)
                      }
                      size="large">
                      <DeleteForever />
                    </IconButton>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  classes={{
                    root: classes.accordingDetails,
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ fontSize: 12, padding: 10 }}
                  >
                    <span
                      dangerouslySetInnerHTML={createMarkup(option.detail)}
                    />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
          : null}
      </Grid>
      {form.open && (
        <ChiefComplaintForm
          open={form.open}
          data={form.data}
          callBack={callBackResponse}
          setMessage={(msg) => setMessage(msg)}
          closeForm={closeForm}
          encounterData={encounterData}
        />
      )}
    </Paper>
  );
}
