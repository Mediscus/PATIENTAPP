import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import classNames from "classnames";
import withStyles from "@mui/styles/withStyles";
import styles from "dan-components/Tables/tableStyle-jss";
import * as FlowSheetData from "dan-api/dummy/FlowSheet";
import VitalElementForm from "./VitalElementForm";
import CustomTooltip from "../../CustomTooltip";
import { VitalsD } from "../../../api/dummy/FlowSheet";
import BodyMeasurementForm from "./BodyMeasurementForm";

const StyledTableContainer = withStyles((theme) => ({
  root: {
    width: "max-content",
    position: "relative",
  },
}))(TableContainer);

const BodyMeasurementComp = ({ classes }) => {
  const [assessmentHeader, setAssessmentHeader] = useState(
    FlowSheetData.Headers
  );
  const [assessmentCatData, setAssessmentCatData] = useState(
    FlowSheetData.CatData
  );
  const [addAssessment, setAddAssessment] = useState(false);
  const [showAssessmentCategory, setShowAssessmentCategory] = useState([]);
  const [newFlowSheetData, setNewFlowSheetData] = useState({
    Height: "",
    Weight: "",
    BMI: "",
  });

  const addFlowSheetData = (status) => {
    setAddAssessment(status);
    setShowAssessmentCategory([]);
  };

  const toggleAssessmentCategory = (CatName) => {
    setShowAssessmentCategory((prev) =>
      prev.includes(CatName)
        ? prev.filter((itm) => itm !== CatName)
        : [...prev, CatName]
    );
  };

  const renderAssessmentHeader = () => {
    let OutPutData = [];
    assessmentHeader.map((head, index) => {
      let readingDate = head.split(",");
      OutPutData[index] = (
        <TableCell key={head + "-" + index}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{readingDate[0]}</Typography>
            <Typography variant="body1">{readingDate[1]}</Typography>
            <Typography variant="caption">Added By: {"Dr. Jay"}</Typography>
          </Box>
        </TableCell>
      );
    });

    const indxLen = assessmentHeader.length + 2;
    OutPutData[indxLen] = (
      <TableCell style={{ width: 20 }}>
        {!addAssessment ? (
          <IconButton onClick={() => addFlowSheetData(true)}>
            <AddIcon />
          </IconButton>
        ) : (
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => addFlowSheetData(false)}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => saveFlowSheetData()}
            >
              SAVE
            </Button>
          </Box>
        )}
      </TableCell>
    );
    return OutPutData;
  };

  const renderVitalDetails = () => {
    const VitalsDetails = FlowSheetData.BodyMeasurementD;
    const showChild = showAssessmentCategory.includes(
      VitalsDetails.category_name
    );
    return (
      <React.Fragment>
        <TableRow style={{ backgroundColor: "#fafafa" }}>
          <TableCell colSpan={assessmentHeader.length} variant="head">
            <Button
              endIcon={showChild ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() =>
                toggleAssessmentCategory(VitalsDetails.category_name)
              }
            >
              {VitalsDetails.category_name}
            </Button>
          </TableCell>
          <TableCell variant="head">
            {addAssessment ? (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">
                  {new Date().toLocaleString()}
                </Typography>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Box>
            ) : null}
          </TableCell>
        </TableRow>
        {!showChild && renderAssessmentCategoryChild(VitalsDetails.data)}
      </React.Fragment>
    );
  };

  const renderAssessmentCategoryChild = (child) => {
    return child.map((head, index) => (
      <TableRow key={head.header + index}>
        <TableCell>{head.header}</TableCell>
        {renderFlowSheetData(head.header)}
      </TableRow>
    ));
  };

  const getFlowSheetData = (data) => {
    console.log("data", data);
    const params = {
      reading_date: "",
      value: data.data.Common,
      detail: data.data.detail,
    };
    setNewFlowSheetData((prevData) => ({
      ...prevData,
      [data.elementName]: params,
    }));
  };

  const saveFlowSheetData = () => {
    const date = new Date().toLocaleString();
    setAssessmentHeader((prevHeader) => [...prevHeader, date]);
    Object.entries(newFlowSheetData).forEach(([key, value]) => {
      setAssessmentCatData((prevData) => ({
        ...prevData,
        [key]: [
          ...(prevData[key] || []),
          { reading_date: date, value: value.value, detail: value.detail },
        ],
      }));
    });

    setAddAssessment(false);
  };

  const renderFlowSheetData = (ElementName) => {
    const ElementData = assessmentCatData[ElementName] || [];
    let OutPutData = ElementData.map((head, index) => (
      <TableCell align="center" key={head.reading_date + index}>
        {head.value}
        <CustomTooltip
          title={
            <React.Fragment>
              {Array.isArray(head.detail) &&
                head.detail.map((dItem, indx) => (
                  <Box key={dItem.name + indx + dItem.value}>
                    <Typography variant="body2">
                      <b>
                        {dItem.name === "Measurement"
                          ? "Site of measurement"
                          : dItem.name}
                      </b>{" "}
                      : {dItem.value}
                    </Typography>
                    <Typography variant="caption">
                      {dItem.description}
                    </Typography>
                  </Box>
                ))}
            </React.Fragment>
          }
        >
          <InfoOutlinedIcon style={{ marginLeft: 10 }} />
        </CustomTooltip>
      </TableCell>
    ));

    if (addAssessment) {
      OutPutData[ElementData.length + 1] = (
        <TableCell key="new-entry">
          <BodyMeasurementForm
            ElementName={ElementName}
            getData={(data) => getFlowSheetData(data)}
          />
        </TableCell>
      );
    }

    return OutPutData;
  };

  return (
    <StyledTableContainer>
      <Table
        className={classNames(
          classes.table,
          classes.bordered,
          classes["small"]
        )}
        style={{ margin: 0, tableLayout: "auto" }}
      >
        <TableHead>
          <TableRow>{renderAssessmentHeader()}</TableRow>
        </TableHead>
        <TableBody>{renderVitalDetails()}</TableBody>
      </Table>
    </StyledTableContainer>
  );
};

BodyMeasurementComp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BodyMeasurementComp);
