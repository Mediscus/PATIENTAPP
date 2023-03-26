import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import {
  Divider,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import InPatientData from "dan-api/dummy/ClinicPatientData";

function ThirdClinicWidget(props) {
  const { classes } = props;

  const PatientList = () => {
    const getItem = (dataArray) =>
      dataArray.map((data) => (
        <ListItem button key={data.id}>
          <Avatar
            alt={data.name}
            src={data.avatar}
            className={classes.avatar}
          />
          <ListItemText primary={data.name} secondary={data.title} />
        </ListItem>
      ));
    return (
      <List style={{ maxHeight: 465, overflow: "auto" }}>
        {getItem(InPatientData)}
      </List>
    );
  };

  return (
    <Grid>
      <Paper className={classNames(classes.root)} elevation={1}>
        <Typography
          variant="h6"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Health & Care Clinic
        </Typography>
        <Divider style={{ marginTop: 10 }} />
        <PatientList />
      </Paper>
    </Grid>
  );
}

ThirdClinicWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
  },
  avatar: {
    marginRight: theme.spacing(1),
    boxShadow: theme.glow.light,
  },
});

export default withStyles(styles)(ThirdClinicWidget);
