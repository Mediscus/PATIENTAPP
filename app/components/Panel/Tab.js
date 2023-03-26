import React from "react";
import PropTypes from "prop-types";
import { Tab as CustomTab } from "@mui/material";

const Tab = (props) => {
  const { label, ...other } = props;
  return <CustomTab label={label} {...other} />;
};

export default Tab;
