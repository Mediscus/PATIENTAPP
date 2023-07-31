import React, { Component, useState } from "react";
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
import FlowSheetElementForm from "./FlowSheetElementForm";
import CustomTooltip from "../../CustomTooltip";

const StyledTableContainer = withStyles((theme) => ({
  root: {
    width: "max-content",
    position: "relative",
  },
}))(TableContainer);

class FlowSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentHeader: FlowSheetData.Headers,
      assessmentCategory: FlowSheetData.Categories,
      assessmentCatData: FlowSheetData.CatData,
      addAssessment: false,
      showAssessmentCategory: [],
      newFlowSheetData: {
        Pulse: "",
        "Blood Pressure": "",
        "Respiratory Rate": "",
        "Oxygen Saturation SPO2": "",
        Temperature: "",
      },
    };
  }

  addFlowSheetData = (status) => {
    this.setState({ addAssessment: status, showAssessmentCategory: [] });
  };

  showAssessmentCategory = (CatName) => {
    const { showAssessmentCategory } = this.state;
    let filterCat = showAssessmentCategory;
    if (showAssessmentCategory && showAssessmentCategory.includes(CatName)) {
      filterCat = showAssessmentCategory.filter((itm) => itm != CatName);
    } else {
      filterCat.push(CatName);
    }
    this.setState({ showAssessmentCategory: filterCat });
  };

  renderAssessmentHeader = () => {
    const { assessmentHeader, addAssessment } = this.state;
    let OutPutData = [];
    assessmentHeader.map((head, index) => {
      let readingDate = head;
      if (readingDate) {
        readingDate = readingDate.split(",");
        readingDate = (
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
        );
      }
      OutPutData[index] = (
        <TableCell key={head + "-" + index}>{readingDate}</TableCell>
      );
    });
    const indxLen = assessmentHeader.length + 2;
    OutPutData[indxLen] = (
      <TableCell style={{ width: 20 }}>
        {!addAssessment ? (
          <IconButton onClick={() => this.addFlowSheetData(true)}>
            <AddIcon />
          </IconButton>
        ) : (
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => this.addFlowSheetData(false)}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => this.saveFlowSheetData()}
            >
              SAVE
            </Button>
          </Box>
        )}
      </TableCell>
    );
    return OutPutData;
  };

  renderAssessmentCategory = () => {
    const {
      assessmentCategory,
      assessmentHeader,
      showAssessmentCategory,
      addAssessment,
    } = this.state;
    let OutPutData = [];
    // console.log(assessmentCategory);
    assessmentCategory.map((head, index) => {
      let showChild = showAssessmentCategory.includes(head.category_name)
        ? true
        : false;
      OutPutData[index] = (
        <>
          <TableRow
            style={{ backgroundColor: "#fafafa" }}
            key={head.category_name + index}
          >
            <TableCell colSpan={assessmentHeader.length} variant="head">
              <Button
                endIcon={showChild ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => this.showAssessmentCategory(head.category_name)}
              >
                {head.category_name}
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
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
          {!showChild && this.renderAssessmentCategoryChild(head.data)}
        </>
      );
    });
    return OutPutData;
  };

  renderAssessmentCategoryChild = (child) => {
    let OutPutData = [];
    child.map((head, index) => {
      OutPutData[index] = (
        <TableRow key={head.header + index}>
          <TableCell>{head.header}</TableCell>
          {this.renderFlowSheetData(head.header)}
        </TableRow>
      );
    });
    return OutPutData;
  };

  getFlowSheetData = (data) => {
    let oldData = this.state.newFlowSheetData;
    let params = {
      reading_date: "",
      value: data.data.Common,
      detail: data.data.detail,
    };
    oldData = Object.assign({ ...oldData, [data.elementName]: params });
    this.setState({ newFlowSheetData: oldData });
  };

  saveFlowSheetData = () => {
    let { assessmentHeader, assessmentCatData, newFlowSheetData } = this.state;
    let date = new Date().toLocaleString();
    assessmentHeader.push(date);
    for (const [key, value] of Object.entries(newFlowSheetData)) {
      assessmentCatData[key].push({
        reading_date: date,
        value: value.value,
        detail: value.detail,
      });
    }
    this.setState({
      assessmentHeader: assessmentHeader,
      assessmentCatData: assessmentCatData,
      addAssessment: false,
    });
  };

  renderFlowSheetData = (ElementName) => {
    const { assessmentCatData, addAssessment } = this.state;
    console.log("ppp", assessmentCatData);
    let OutPutData = [];
    let ElementData =
      assessmentCatData && ElementName in assessmentCatData
        ? assessmentCatData[ElementName]
        : [];
    console.log("lll", ElementData);
    if (ElementData) {
      ElementData.map((head, index) => {
        OutPutData[index] = (
          <TableCell align="center" key={head.reading_date + index}>
            {head.value}
            <CustomTooltip
              title={
                <React.Fragment>
                  {Array.isArray(head.detail) &&
                    head.detail.map((dItem, indx) => {
                      let name =
                        dItem.name == "Measurement"
                          ? "Site of measurement"
                          : dItem.name;
                      return (
                        <Box key={name + indx + dItem.value}>
                          <Typography variant="body2">
                            <b>{name}</b> : {dItem.value}
                          </Typography>
                          <Typography variant="caption">
                            {dItem.description}
                          </Typography>
                        </Box>
                      );
                    })}
                </React.Fragment>
              }
            >
              <InfoOutlinedIcon style={{ marginLeft: 10 }} />
            </CustomTooltip>
          </TableCell>
        );
      });
    }
    if (addAssessment) {
      OutPutData[ElementData.length + 1] = (
        <TableCell>
          <FlowSheetElementForm
            ElementName={ElementName}
            getData={(data) => this.getFlowSheetData(data)}
          />
        </TableCell>
      );
    } else {
      OutPutData[ElementData.length + 1] = <TableCell></TableCell>;
    }
    return OutPutData;
  };

  render() {
    const { classes } = this.props;
    const { assessmentHeader, assessmentData } = this.state;

    return (
      <div>
        <StyledTableContainer>
          <TableHead style={{ margin: 0, tableLayout: "auto", width: "100vw" }}>
            <TableRow>{this.renderAssessmentHeader()}</TableRow>
          </TableHead>
          <TableBody>{this.renderAssessmentCategory()}</TableBody>
        </StyledTableContainer>
      </div>
    );
  }
}

FlowSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlowSheet);
