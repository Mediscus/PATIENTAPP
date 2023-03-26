import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import messageStyles from "dan-styles/Messages.scss";
import styles from "./widget-jss";
import PapperBlock from "../PapperBlock";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import dataContact from "../../containers/Pages/Contact/api/contactData";

/* Conversation List */
function MessagesList(props) {
  const { classes } = props;
  return (
    <PapperBlock whiteBg title="Today Activity">
      <List style={{ maxHeight: 410, overflow: "auto" }}>
        <ListItem button component={NavLink} to="/app/pages/chat">
          <Avatar
            alt={dataContact[2].name}
            src={dataContact[2].avatar}
            className={classes.avatar}
          />
          <ListItemText
            primary={dataContact[2].name}
            className={classes.messages}
            secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <ListItemSecondaryAction>
            <Typography variant="caption">10:42 PM</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component={NavLink} to="/app/pages/chat">
          <Avatar
            alt={dataContact[5].name}
            src={dataContact[5].avatar}
            className={classes.avatar}
          />
          <ListItemText
            primary={dataContact[5].name}
            className={classes.messages}
            secondary="Sed a ipsum euismod, eleifend turpis sed."
          />
          <ListItemSecondaryAction>
            <Typography variant="caption">11:17 AM</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component={NavLink} to="/app/pages/chat">
          <Avatar
            alt={dataContact[1].name}
            src={dataContact[1].avatar}
            className={classes.avatar}
          />
          <ListItemText
            primary={dataContact[1].name}
            className={classes.messages}
            secondary="Praesent viverra est et risus fringilla bibendum."
          />
          <ListItemSecondaryAction>
            <Typography variant="caption">11 Oct</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component={NavLink} to="/app/pages/chat">
          <Avatar
            alt={dataContact[0].name}
            src={dataContact[0].avatar}
            className={classes.avatar}
          />
          <ListItemText
            primary={dataContact[0].name}
            className={classes.messages}
            secondary="Praesent at ex non leo iaculis dignissim. Proin nec venenatis nulla, nec vulputate ipsum. Curabitur eu dignissim nibh, eget condimentum massa."
          />
          <ListItemSecondaryAction>
            <Typography variant="caption">12 Oct</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component={NavLink} to="/app/pages/chat">
          <Avatar
            alt={dataContact[2].name}
            src={dataContact[2].avatar}
            className={classes.avatar}
          />
          <ListItemText
            primary={dataContact[2].name}
            className={classes.messages}
            secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <ListItemSecondaryAction>
            <Typography variant="caption">10:42 PM</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component={NavLink} to="/app/pages/chat">
          <Avatar
            alt={dataContact[0].name}
            src={dataContact[0].avatar}
            className={classes.avatar}
          />
          <ListItemText
            primary={dataContact[0].name}
            className={classes.messages}
            secondary="Praesent at ex non leo iaculis dignissim. Proin nec venenatis nulla, nec vulputate ipsum. Curabitur eu dignissim nibh, eget condimentum massa."
          />
          <ListItemSecondaryAction>
            <Typography variant="caption">12 Oct</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component={NavLink} to="/app/pages/chat">
          <Avatar
            alt={dataContact[2].name}
            src={dataContact[2].avatar}
            className={classes.avatar}
          />
          <ListItemText
            primary={dataContact[2].name}
            className={classes.messages}
            secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <ListItemSecondaryAction>
            <Typography variant="caption">10:42 PM</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </PapperBlock>
  );
}

MessagesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessagesList);
