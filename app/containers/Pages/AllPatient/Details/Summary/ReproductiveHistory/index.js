import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { Box, Divider, Grid, Paper, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import classNames from "classnames";
import ReproductiveHistoryForm from "./ReproductiveHistoryForm";

function ReproductiveHistory(props) {
  const { classes, add, shadow } = props;
  const [value, setValue] = useState("No");
  const [form, setForm] = useState({ open: false, data: null, type: 'add' });
  const openForm = () => setForm({ ...form, ["open"]: true, ['type']: 'add' });
  const closeForm = () => [setForm({ ...form, ["open"]: false })];

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };

  return (
    <Paper className={classNames(classes.root)} elevation={shadow}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Reproductive History
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <Typography variant="body2">Cycle Profile Information</Typography>
        <Typography variant="body2" style={{ fontSize: 12, marginTop: 5 }}>
          Are you an adult and do you have ever menstrual?
        </Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          value={value}
          onChange={handleChangeRadio}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio />}
            label="Yes"
            onClick={() => openForm()}
          />
          <FormControlLabel
            value="No"
            control={<Radio />}
            label="No"
            onClick={() => closeForm()}
          />
        </RadioGroup>
        {form.open && (
          <ReproductiveHistoryForm
            open={form.open}
            data={form.data}
            type={form.type}
            closeForm={closeForm}
          />
        )}
      </Box>
    </Paper>
  );
}

ReproductiveHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.bool.isRequired,
  shadow: PropTypes.number.isRequired,
};
ReproductiveHistory.defaultProps = {
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
});

export default withStyles(styles)(ReproductiveHistory);
