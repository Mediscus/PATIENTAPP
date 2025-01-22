import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.svg";
import useStyles from "./user-jss";
import {
  Hidden,
  Paper,
  Tab,
  Typography,
  Icon,
  Tabs,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import MobileRegistration from "./MobileRegistration";
import AbhaRegistration from "./AbhaRegistration";

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  return <NavLink to={props.to} {...props} innerRef={ref} />;
});

function RegisterForm(props) {
  const { classes } = useStyles();
  // const { handleData, errorSms } = props;
  const [tab, setTab] = useState(0);

  const deco = useSelector((state) => state.ui.decoration);

  const handleChangeTab = (_event, value) => {
    setTab(value);
  };

  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden mdDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button
              size="small"
              className={classes.buttonLink}
              component={LinkBtn}
              to="/"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              Already have account ?
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Register
        </Typography>
        <Typography
          variant="caption"
          className={classes.subtitle}
          gutterBottom
          align="center"
        >
          Register For Your Mediscus Account
        </Typography>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="Mobile Number" />
          <Tab label="Aadhar Card" />
        </Tabs>
        {tab === 0 && <MobileRegistration />}
        {tab === 1 && <AbhaRegistration />}
      </Paper>
    </Fragment>
  );
}

export default RegisterForm;
