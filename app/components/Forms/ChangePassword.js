import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import useStyles from './user-jss';
import { Formik } from 'formik';
import { Grid, TextField } from '@mui/material';
import { changePassSchema } from 'dan-api/schema';
import apiCall from "dan-redux/apiInterface";
import { CustomSnackbar } from "dan-components";

function ChangePassword(props) {
  const { classes, cx } = useStyles();
  const [snackBar, setSnackBar] = useState({ open: false, type: "", msg: "", });

  const postChangePass = async (values, setErrors, setStatus, setSubmitting) => {
    await apiCall("account/change-password", "post", values)
      .then((res) => {
        if (res && res.Status === "Success") {
          handleSnackBar(true, "success", "Password Changed successfully!");
          setStatus({ success: true });
        }
      })
      .catch((Error) => {
        let ErrorMessage = Error.ErrorMessage;
        if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
          ErrorMessage = Error.ErrorMessage.join("\n");
        }
        handleSnackBar(true, "error", ErrorMessage);
      });
  };

  const handleSnackBar = (open, type, msg) => {
    setSnackBar({ ...snackBar, ["open"]: open, ["type"]: type, ["msg"]: msg });
  };

  return (
    <Paper className={classes.fullWrap}>
      {/*   <Typography variant="h4" className={classes.title} gutterBottom>
        Change Password
      </Typography> */}
      <section className={classes.pageFormWrap}>
        <Formik
          initialValues={{
            OldPass: '',
            NewPass: '',
            ConPass: '',
          }}
          enableReinitialize={true}
          validationSchema={changePassSchema}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            postChangePass(values, setErrors, setStatus, setSubmitting);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>

              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="OldPass"
                    label="Old Password"
                    value={values.OldPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.OldPass ? errors.OldPass : ""}
                    error={touched.OldPass ? errors.OldPass : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="NewPass"
                    label="New Password"
                    value={values.NewPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.NewPass ? errors.NewPass : ""}
                    error={touched.NewPass ? errors.NewPass : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12} mb={5}>
                  <TextField
                    fullWidth
                    id="ConPass"
                    label="Confirm Password"
                    value={values.ConPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.ConPass ? errors.ConPass : ""}
                    error={touched.ConPass ? errors.ConPass : ""}
                  />
                </Grid>
              </Grid>
              <div className={classes.btnArea}>
                <Button variant="contained" fullWidth color="primary" type="submit" disabled={isSubmitting}>
                  Continue
                  <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </section>
      <CustomSnackbar
        open={snackBar.open}
        msg={snackBar.msg}
        type={snackBar.type}
        onClose={() => setSnackBar({ ...snackBar, ["open"]: false })}
      />
    </Paper>
  );
}

export default ChangePassword;
