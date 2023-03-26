import React from "react";
import { Box, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AcUnitIcon from "@material-ui/icons/AcUnit";

const HeaderTitle = (props) => {
  const { classes, title, style, icon } = props;
  if (title == "") return null;
  return (
    <Box className={classes.boxStyle} style={style}>
      {icon}
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
    </Box>
  );
};

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.any,
};

HeaderTitle.defaultProps = {
  title: "",
  icon: <AcUnitIcon color="secondary" />,
};

const Styles = (theme) => ({
  boxStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  title: {
    marginLeft: 10,
    color: theme.palette.text.secondary,
  },
});

export default withStyles(Styles)(HeaderTitle);
