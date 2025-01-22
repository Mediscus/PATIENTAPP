import * as React from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  CircularProgress,
  TextField,
  Typography,
  TextField as MuiTextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  SET_ADD_FAMILY_MEMBER_LOADER,
  UPDATE_SNACKBAR_ALERT_STATE,
} from "../../../redux/constants/reduxFormConstants";
import "./style.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import { getCookieData } from "../../../components/Common/storageFun";
import { changeLoggedInUser, getFamilyMemberList } from "./FamilyMemberAction";

const FamilyMemberForm = () => {
  const dispatch = useDispatch();
  const authToken = getCookieData("authToken");
  const userDetails = getCookieData("userDetails");
  const relationType = [
    { name: "Spouse", value: "spouse" },
    { name: "Child", value: "child" },
    { name: "Parent", value: "parent" },
    { name: "Sibling", value: "sibling" },
    { name: "Grand Parent", value: "grandparent" },
    { name: "Grand Child", value: "grandchild" },
    { name: "Uncle / Aunt", value: "uncle_aunt" },
    { name: "Niece / Nephew", value: "niece_nephew" },
    { name: "Cousin", value: "cousin" },
    { name: "Other", value: "other" },
  ];
  const initialState = {
    first_name: "",
    last_name: "",
    dob: moment().format("YYYY-MM-DD"),
    mobile: "",
    relation_type: "",
  };
  const errInitialState = {
    first_name: "",
    last_name: "",
    dob: "",
    mobile: "",
    relation_type: "",
  };
  const [formData, setFormData] = useState({ ...initialState });
  const [formErr, setFormErr] = useState({ ...errInitialState });
  const { addFamilyMemberLoader, familyMembersList, familyMemberListLoader } =
    useSelector((state) => state.familyMembers);
  const { loggedInUser } = useSelector((state) => state.login);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({ ...formData, [name]: value });
    setFormErr({ ...formErr, [name]: "" });
  };

  const resetState = () => {
    setFormData({ ...initialState });
    setFormErr({ ...errInitialState });
  };

  const handleAddFamMember = async (e) => {
    e.preventDefault();
    dispatch({ type: SET_ADD_FAMILY_MEMBER_LOADER, payload: true });
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
      //create family member
      await axios
        .post(
          `${process.env.INTERNAL_API_ENDPOINT}/api/users/family`,
          {
            ...formData,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken.access_token}`,
            },
          }
        )
        .then(async (response) => {
          console.log("user create resp ", response);
          if (response.status === 200 && response.data.success) {
            //verify user otp request

            getFamilyMemberList(authToken, dispatch);
            resetState();
            dispatch({
              type: UPDATE_SNACKBAR_ALERT_STATE,
              payload: {
                open: true,
                type: "success",
                msg: "Family member added successfully!",
              },
            });
            dispatch({ type: SET_ADD_FAMILY_MEMBER_LOADER, payload: false });
          } else {
            dispatch({ type: SET_ADD_FAMILY_MEMBER_LOADER, payload: false });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: SET_ADD_FAMILY_MEMBER_LOADER,
            payload: false,
          });

          if (err.response) {
            // Server responded with a status code outside the 2xx range
            console.log("Error response data:", err.response.data); // The response payload
            dispatch({
              type: UPDATE_SNACKBAR_ALERT_STATE,
              payload: {
                open: true,
                type: "error",
                msg: err.response.data.message,
              },
            });
          } else {
          }
        });
    } else {
      dispatch({ type: SET_ADD_FAMILY_MEMBER_LOADER, payload: false });
    }
  };
  return (
    <>
      <Box className="select-member-container">
        <Typography
          style={{ fontWeight: 600, textAlign: "center", fontSize: 18 }}
        >
          Select Family Member
        </Typography>
        {familyMemberListLoader ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress style={{ color: "#fff" }} />
          </Box>
        ) : (
          <Box className="family-member-wrapper">
            <Box
              className="family-member-container"
              onClick={() => changeLoggedInUser(userDetails, dispatch)}
            >
              <Avatar
                alt="Anushree"
                sx={{
                  width: 56,
                  height: 56,
                  border:
                    loggedInUser.user_id === userDetails.user_id &&
                    "2px solid #013F72",
                }}
              >
                {userDetails.first_name[0]}
              </Avatar>
              You
            </Box>
            {familyMembersList.map((familyMember) => (
              <Box
                className="family-member-container"
                onClick={() => changeLoggedInUser(familyMember, dispatch)}
              >
                <Avatar
                  alt="Anushree"
                  sx={{
                    width: 56,
                    height: 56,
                    border:
                      loggedInUser.user_id === familyMember.id &&
                      "2px solid #013F72",
                  }}
                >
                  {familyMember.first_name[0]}
                </Avatar>
                <Typography className="family-member-name">
                  {familyMember.first_name + " " + familyMember.last_name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box>
        <form onSubmit={handleAddFamMember}>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={
                  <>
                    Date of birth<sup style={{ color: "red" }}>*</sup>
                  </>
                }
                value={formData.dob}
                onChange={(value) => {
                  const date = moment(new Date(value)).format("YYYY-MM-DD");
                  setFormData({
                    ...formData,
                    dob: date,
                  });
                }}
                renderInput={(params) => (
                  <MuiTextField {...params} fullWidth name="dob" />
                )}
                helperText={formErr.dob}
                error={formErr.dob.length > 0}
              />
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
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="relation-dropdown" error={formErr.relation_type}>
                Select Relation<sup style={{ color: "red" }}>*</sup>
              </InputLabel>
              <Select
                fullWidth
                name="relation_type"
                placeholder="Relation"
                label={
                  <>
                    Relation<sup style={{ color: "red" }}>*</sup>
                  </>
                }
                select
                value={formData.relation_type}
                onChange={handleChange}
                helperText={formErr.relation_type}
                error={formErr.relation_type.length > 0}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 150,
                    },
                  },
                }}
              >
                {relationType.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText style={{ color: "red" }}>
                {formErr.relation_type}
              </FormHelperText>
            </FormControl>
          </Box>

          <Typography color="error" style={{ fontSize: 12, marginBottom: 10 }}>
            {/* {formErr.err} */}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" type="submit">
              {addFamilyMemberLoader ? (
                <CircularProgress size={25} style={{ color: "#fff" }} />
              ) : (
                "Add Family Member"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default FamilyMemberForm;
