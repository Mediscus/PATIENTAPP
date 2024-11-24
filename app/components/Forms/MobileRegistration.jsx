import React, { useState } from "react";
import useStyles from "./user-jss";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  TextField as MuiTextField,
} from "@mui/material";
import axios from "axios";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const MobileRegistration = () => {
  const initialState = {
    first_name: "",
    last_name: "",
    dob: "",
    mobile: "",
  };

  const { classes } = useStyles();
  const [formData, setFormData] = useState({ ...initialState });
  const [formErr, setFormErr] = useState({ ...initialState });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({ ...formData, [name]: value });
    setFormErr({ ...formErr, [name]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = { ...formErr };
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      let name = key === "dob" ? "date of birth" : key.replace(/_/g, " ");

      if (formData[key].length === 0) {
        isValid = false;
        err[key] = `Please enter ${name}.`;
      }
    });
    setFormErr(err);
    if (isValid) {
      const response = await axios.post(
        `${process.env.API_ENDPOINT}/api/users`,
        {
          ...formData,
        }
      );

      console.log("user create resp ", response);
    }
  };
  console.log(formData);
  return (
    <section className={classes.formWrap} style={{ padding: "0px 50px" }}>
      <form onSubmit={handleSubmit}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <TextField
            fullWidth
            name="first_name"
            placeholder="First Name"
            label={
              <>
                First Name<sup style={{ color: "red" }}>*</sup>
              </>
            }
            value={formData.first_name}
            onChange={handleChange}
            helperText={formErr.first_name}
            error={formErr.first_name.length > 0}
          />

          <TextField
            fullWidth
            name="last_name"
            placeholder="Last Name"
            label={
              <>
                Last Name<sup style={{ color: "red" }}>*</sup>
              </>
            }
            value={formData.last_name}
            onChange={handleChange}
            helperText={formErr.last_name}
            error={formErr.last_name.length > 0}
          />
        </Box>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* <TextField
            fullWidth
            name="dob"
            label={
              <> Date of birth<sup style={{ color: "red" }}>*</sup></>
            }
            type="date"
            value={formData.dob}
            onChange={handleChange}
            helperText={formErr.dob}
            error={formErr.dob.length > 0}
          /> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoContainer components={["DatePicker"]}> */}
            <DatePicker
              label={
                <>
                  Date of birth<sup style={{ color: "red" }}>*</sup>
                </>
              }
              value={formData.dob}
              onChange={(value) => {
                console.log(value);
                const date = moment(value).format("YYYY-MM-DD");
                console.log(date);
                setFormData({ ...formData, dob: date });
              }}
              renderInput={(params) => (
                <MuiTextField {...params} fullWidth name="dob" />
              )}
              helperText={formErr.dob}
              error={formErr.dob.length > 0}
            />
            {console.log(formErr)}
            {/* </DemoContainer> */}
          </LocalizationProvider>

          <TextField
            fullWidth
            name="mobile"
            placeholder="Mobile number "
            label={
              <>
                Mobile number<sup style={{ color: "red" }}>*</sup>
              </>
            }
            type="number"
            value={formData.mobile}
            onChange={handleChange}
            helperText={formErr.mobile}
            error={formErr.mobile.length > 0}
          />
        </Box>

        <FormControlLabel
          className={classes.label}
          control={<Checkbox />}
          label="Agree with"
          onChange={(_event, _value) => {}}
        />
        <a href="#" className={classes.link}>
          Terms &amp; Condition
        </a>

        <div className={classes.btnArea}>
          <Button variant="contained" color="primary" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
};

export default MobileRegistration;
